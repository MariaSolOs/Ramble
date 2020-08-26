const cloudinary = require('cloudinary').v2,
      fs = require('fs'),
      path = require('path'),
      {compile} = require('handlebars'),
      mjml2html = require('mjml'),
      nodemailer = require('nodemailer');

//Models
const Experience = require('../models/experience'),
      User = require('../models/user'),
      Creator = require('../models/creator'),
      Notification = require('../models/notification');

//Fetch cities stored in database
exports.getLocations = (req, res) => {
    Experience.find({status: 'approved'}).distinct('location.displayLocation', 
    (err, locations) => {
        if(err) {
            res.status(409).send({err: "Couldn't fetch locations."});
        } else { res.status(200).send({ locations }); }
    });
}

//Get experiences based on location and number of people
exports.getExps = async (req, res) => {
    try {
        //We only need this for the gallery card
        const displayFields = 'title location.displayLocation images price ' +
                              'rating.value creator';
        //Get experiences with updated availabilites and approved status
        let exps = await Experience.find({
                            status: 'approved',
                            'location.displayLocation': req.query.location, 
                            capacity: {$gte: req.query.numPeople},
                            'avail.to': {$gte: new Date()
                        }}, displayFields).populate('creator', 'stripe');
        //Make sure only creators that have a Stripe account are showed
        exps = exps.filter(exp => exp.creator.stripe.accountId);
        res.status(200).send({ exps });
    } catch(err) {
        res.status(404).send({err: "Couldn't fetch experiences."});
    }
}

//For all the approving/dissapproving drama
exports.getUnapprovedExps = (req, res) => {
    if(!req.isAdmin || !req.user.permissions.includes('approveExp')) { 
        return res.status(401).send({err: 'Unauthorized.'});
    }
    const displayFields = 'title location.displayLocation images price rating';
    Experience.find({ status: 'pending' }, displayFields,
    (err, exps) => {
        if(err) { 
            res.status(404).send({err: "Couldn't fetch experiences."});
        } else { res.status(200).send({ exps }); }
    });
}
exports.approveExp = (req, res) => {
    if(!req.isAdmin || !req.user.permissions.includes('approveExp')) { 
        return res.status(401).send({err: 'Unauthorized.'});
    }
    Experience.findByIdAndUpdate(req.params.expId, {status: req.body.decision},
    async (err, exp) => {
        if(err || !exp) {
            return res.status(500).send({err: 'Failed to approve/disapprove experience.'});
        } 
        if(req.body.decision === 'rejected') {
            //Just create notification
            const creator = await User.findOne({creator: exp.creator._id}, 'email');
            const message = `Your experience ${exp.title} is not ready to go live yet. ` + 
            'Please check your email for our feedback.';
            const notif = new Notification({
                message,
                user: creator._id,
                category: 'Creator-ExperienceRejected'
            });
            await notif.save();
            res.status(200).send({
                message: `Experience successfully ${req.body.decision}.`,
                creatorEmail: creator.email
            });
        } else if(req.body.decision === 'approved') {
            //Send notification
            const creator = await User.findOne({creator: exp.creator._id}, 
                            'email stripe creator').populate('creator', 'stripe');
            const message = `Your experience "${exp.title}" has been approved. ` +
            "You're now ready to host your first guests!";
            const notif = new Notification({
                message,
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
                to: creator.email,
                subject: 'Your experience was approved', 
                text: `Congrats! Your experience "${exp.title}" was approved and ` +
                "is ready to go live. Make sure you've completed your Stripe profile!", 
                html: mjml2html(mjml).html
            });
            res.status(200).send({message: 'Experience successfully approved.'});
        } else {
            res.status(400).send({err: 'Invalid decision.'});
        }
    });
}
exports.deleteRejectedExps = async (req, res) => {
    if(!req.isAdmin || !req.user.permissions.includes('maintenance')) {
        return res.status(401).send({err: 'Unauthorized.'});
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
        res.status(409).send(err);
    }
}

//Edit an experience 
exports.reviewExperience = async (req, res) => {
    try {
        const exp = await Experience.findById(req.params.expId, 'rating');
        const newRating = ((exp.rating.value * exp.rating.numRatings) + req.body.rating) /
                          (exp.rating.numRatings + 1);
        exp.rating.value = newRating;
        exp.rating.numRatings = exp.rating.numRatings + 1;
        await exp.save();
        res.status(201).send({message: 'Review successfully submitted.'});
    } catch(err) {
        res.status(409).send({error: "Couldn't submit review."});
    }
}

//Create an experience (unapproved status)
exports.createExperience = async (req, res) => {
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
        res.status(409).send({err: "Couldn't create experience."});
    }
}

//Show experience page
exports.getExp = (req, res) => {
    Experience.findById(req.params.expId).populate({
        path: 'creator',
        populate: {
            path: 'user',
            select: 'fstName photo phoneNumber'
        }
    }).exec((err, exp) => {
        if(err || !exp) { 
            res.status(404).send({err: "Couldn't find experience."});
        } else { res.status(200).send({ exp }); }
    });
}