const cloudinary = require('cloudinary').v2,
      fs = require('fs'),
      path = require('path'),
      {compile} = require('handlebars'),
      mjml2html = require('mjml'),
      nodemailer = require('nodemailer'),
      {createExpOccurrences} = require('../helpers/experienceHelpers'),
      {ErrorHandler} = require('../helpers/errorHandler');

//Models
const Experience = require('../models/experience'),
      User = require('../models/user'),
      Notification = require('../models/notification'),
      Review = require('../models/review');

//Fetch cities stored in database
exports.getLocations = (req, res, next) => {
    Experience.find({status: 'approved'}).distinct('location.displayLocation', 
    (err, locations) => {
        if(err || !locations) {
            return next(new ErrorHandler(409, err.message));
        } else { res.status(200).send({ locations }); }
    });
}

//Get experiences based on location and number of people
exports.getExps = async (req, res, next) => {
    try {
        //We only need this for the gallery card
        const displayFields = 'title images price rating.value creator';

        //Get experiences with updated availabilites and approved status
        let exps;
        if(req.query.location === 'Online') {
            //Handle virtual experiences
            exps = await Experience.find({
                status: 'approved',
                zoomInfo: {$exists: true}, 
                capacity: {$gte: req.query.numPeople},
                'avail.to': {$gte: new Date()}}
            , displayFields).populate('creator', 'stripe');
        } else {
            exps = await Experience.find({
                        status: 'approved',
                        'location.displayLocation': req.query.location, 
                        capacity: {$gte: req.query.numPeople},
                        'avail.to': {$gte: new Date()}
                    }, displayFields + 'location.displayLocation')
                    .populate('creator', 'stripe');
        }
        //Make sure only creators that have a Stripe account are showed
        exps = exps.filter(exp => exp.creator.stripe.accountId);
        res.status(200).send({ exps });
    } catch(err) {
        next(new ErrorHandler(500, err.message));
    }
}

//For all the approving/dissapproving drama
exports.getUnapprovedExps = (req, res, next) => {
    if(!req.isAdmin || !req.user.permissions.includes('approveExp')) { 
        return next(new ErrorHandler(401, 'Unauthorized.'));
    }
    const displayFields = 'title location.displayLocation images price rating.value';
    Experience.find({ status: 'pending' }, displayFields,
    (err, exps) => {
        if(err || !exps) { 
            return next(new ErrorHandler(500, "Couldn't fetch experiences."));
        } else { res.status(200).send({ exps }); }
    });
}
exports.approveExp = (req, res, next) => {
    if(!req.isAdmin || !req.user.permissions.includes('approveExp')) { 
        return next(new ErrorHandler(401, 'Unauthorized.'));
    }
    Experience.findByIdAndUpdate(req.params.expId, {status: req.body.decision},
    async (err, exp) => {
        try {
            if(err || !exp) {
                return next(new ErrorHandler(500, 
                'Failed to approve/disapprove experience.'));
            } 
            if(req.body.decision === 'rejected') {
                //Just create notification
                const creator = await User.findOne({creator: exp.creator._id}, 
                                'email');
                const notif = new Notification({
                    message: `Your experience ${exp.title} is not ready ` + 
                    'to go live yet. Please check your email for our feedback.',
                    user: creator._id,
                    category: 'Creator-ExperienceRejected'
                });
                await notif.save();
                res.status(200).send({
                    message: `Experience successfully ${req.body.decision}.`,
                    creatorEmail: creator.email.address
                });
            } else if(req.body.decision === 'approved') {
                //Send notification
                const creator = await User.findOne({creator: exp.creator._id}, 
                                'email stripe creator').populate('creator', 'stripe');
                const notif = new Notification({
                    message: `Your experience "${exp.title}" has been approved. ` +
                    "You're now ready to host your first guests!",
                    user: creator._id,
                    category: 'Creator-ExperienceApproved'
                });
                await notif.save();
    
                //Create mjml
                const source = fs.readFileSync(path.resolve(__dirname, 
                               '../emailTemplates/experienceApproved.mjml'), 'utf-8');              
                const template = compile(source);
                const mjml = template({
                    expTitle: exp.title,
                    shareUrl: `${process.env.CLIENT_URL}/experience/view/${exp._id}`,
                    showStripe: !creator.creator.stripe.accountId,
                    stripeRedirectUrl: `${process.env.SERVER_URL}/api/email/connect-stripe/${
                                        creator._id}`
                });
                //Send email
                const transporter = nodemailer.createTransport({
                    host: 'smtp.zoho.com',
                    port: 465,
                    secure: true, 
                    auth: {
                        user: process.env.ZOHO_EMAIL, 
                        pass: process.env.ZOHO_PASSWORD
                    }
                });
    
                await transporter.sendMail({
                    from: {
                        name: 'ramble',
                        address: process.env.ZOHO_EMAIL
                    }, 
                    to: creator.email.address,
                    subject: 'Your experience was approved', 
                    text: `Congrats! Your experience "${exp.title}" was approved and ` +
                    "is ready to go live. Make sure you've completed your " +
                    'Stripe profile!', 
                    html: mjml2html(mjml, {
                        filePath: path.resolve(__dirname, 
                        '../emailTemplates/experienceApproved.mjml'),
                    }).html
                });
    
                //Create all occurrences
                await createExpOccurrences(exp);
    
                res.status(200).send({message: 'Experience successfully approved.'});
            } else {
                next(new ErrorHandler(400, 'Invalid decision.'));
            }
        } catch(error) {
            next(new ErrorHandler(500, error.message));
        }
    });
}
exports.deleteRejectedExps = async (req, res, next) => {
    if(!req.isAdmin || !req.user.permissions.includes('maintenance')) {
        return next(new ErrorHandler(401, 'Unauthorized.'));
    }
    //Delete images from Cloudinary
    try {
        const delImages = [];
        const exps = await Experience.find({status: 'rejected'}); 
        for(exp of exps) {
            for(img of exp.images) {
                const publicId = img.split('/').slice(-1)[0].split('.')[0];
                delImages.push(`Ramble/Experiences/${publicId}`);
            }
        }
        cloudinary.api.delete_resources(delImages);
        const delResult = await Experience.deleteMany({status: 'rejected'});
        res.status(200).send({ delCount: delResult.deletedCount });
    } catch(err) {
        next(new ErrorHandler(409, err.message));
    }
}

//Review an experience 
exports.reviewExperience = async (req, res, next) => {
    try {
        //Update experience rating
        const exp = await Experience.findById(req.params.expId, 'rating');
        const newRating = ((exp.rating.value * exp.rating.numRatings) + req.body.rating) /
                          (exp.rating.numRatings + 1);
        exp.rating.value = newRating;
        exp.rating.numRatings = exp.rating.numRatings + 1;

        //If applicable, create a review
        if(req.body.review.length > 0) {
            const review = new Review({
                body: req.body.review,
                about: req.params.expId,
                onModel: 'Experience'
            });
            await review.save();
        }

        await exp.save();
        res.status(201).send({message: 'Review successfully submitted.'});
    } catch(err) {
        next(new ErrorHandler(409, err.message));
    }
}
exports.getReviews = (req, res, next) => {
    Review.find({onModel: 'Experience'}).populate('about', 'title images')
    .exec((err, reviews) => {
        if(err || !reviews) {
            return next(new ErrorHandler(409, "Couldn't get reviews."));
        } else {
            res.status(200).send({ reviews });
        }
    });
}

//Create an experience (unapproved status)
exports.createExperience = async (req, res, next) => {
    try {
        //Upload images to Cloudinary
        const expImages = [];
        for(img of req.body.images) {
            const upload = await cloudinary.uploader.upload(img, {
                folder: 'Ramble/Experiences',
                eager: [
                    { format: 'jpeg', height: 400, quality: 'auto', 
                    crop: 'fill', dpr: 'auto' }
                ]
            });
            expImages.push(upload.eager[0].secure_url);
        }
        //Create experience
        const createdExp = new Experience({
            ...req.body.form,
            images: expImages
        });
        await createdExp.save();

        res.status(201).send({
            message: 'Experience successfully created.',
            exp: {
                _id: createdExp._id,
                title: createdExp.title
            }
        });
    } catch(err) {
        next(new ErrorHandler(409, err.message));
    }
}

//Edit an experience
exports.editExperience = async (req, res, next) => {
    try {
        //Upload new images
        const expImages = [];
        for(img of req.body.images) {
            if(img.includes('Ramble/Experiences')) {
                expImages.push(img);
            } else {
                const upload = await cloudinary.uploader.upload(img, {
                    folder: 'Ramble/Experiences',
                    eager: [
                        { format: 'jpeg', height: 400, quality: 'auto', 
                          crop: 'fill', dpr: 'auto' }
                    ]
                });
                expImages.push(upload.eager[0].secure_url);
            }
        }
        exp.images = expImages;
        delete req.body.images;

        //Update experience fields
        const exp = await Experience.findById(req.params.expId);
        for(field in req.body) {
            exp[field] = req.body[field];
        }
        await exp.save();

        res.status(201).send({
            message: 'Experience successfully updated.',
            exp: {
                _id: exp._id,
                title: exp.title
            }
        });
    } catch(error) {
        next(new ErrorHandler(409, err.message));
    }
}

//Change availability schedule for an experience
exports.updateSchedule = (req, res, next) => {
    Experience.findByIdAndUpdate(req.params.expId, 
    {avail: {
        from: new Date(),
        to: new Date().setMonth(new Date().getMonth() + 1),
        schedule: req.body.schedule
    }},
    (err, exp) => {
        if(err || !exp) {
            return next(new ErrorHandler(409, "Couldn't update schedule"));
        }
        res.status(201).send({message: 'Schedule successfully updated.'});
    });
}

//Show experience page
exports.getExp = (req, res, next) => {
    Experience.findById(req.params.expId).populate({
        path: 'creator',
        populate: {
            path: 'user',
            select: 'fstName photo phoneNumber'
        }
    }).exec((err, exp) => {
        if(err || !exp) { 
            return next(new ErrorHandler(404, 'Experience not found in database.'));
        } else { res.status(200).send({ exp }); }
    });
}