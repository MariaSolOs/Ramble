const cloudinary = require('cloudinary').v2;

//Models
const Experience = require('../models/experience'),
      Occurrence = require('../models/occurrence'),
      Booking = require('../models/booking'),
      User = require('../models/user'), 
      Creator = require('../models/creator'),
      Notification = require('../models/notification');

//To deal with Mongoose dates
const extractDayFrame = (date) => {
    const dayStart = new Date(date);
    const day = (60 * 60 * 24 * 1000) - 1;
    const dayEnd = new Date(dayStart.getTime() + day);
    return [dayStart, dayEnd];
}

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
exports.getExps = (req, res) => {
    //We only need this for the gallery card
    const displayFields = 'title location.displayLocation images price rating';
    Experience.find({ status: 'approved',
                      'location.displayLocation': req.query.location, 
                      capacity: {$gte: req.query.numPeople}},
    displayFields, (err, exps) => {
        if(err) { 
            res.status(404).send({err: "Couldn't fetch experiences."});
        } else { res.status(200).send({ exps }); }
    });
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
    Experience.findByIdAndUpdate(req.params.id, {status: req.body.decision},
    async (err, exp) => {
        if(err || !exp) {
            res.status(500).send({err: 'Failed to update experience request.'});
        } else {
            const creator = await Creator.findById(exp.creator._id, 
                            'email notifications user');
            const notif = new Notification({
                message: `Your experience "${exp.title}" has been ${
                req.body.decision}.`,
                user: creator.user,
                category: 'Creator-ExperienceDecision'
            });
            await notif.save();
            creator.notifications.push(notif);
            await creator.save();
            res.status(200).send({
                message: `Experience successfully ${req.body.decision}.`,
                creatorEmail: creator.email
            });
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
        res.status(409).send({ err });
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
            title: createdExp.title
        });
    } catch(err) {
        res.status(409).send({err: "Couldn't create experience."});
    }
}

//Show experience page
exports.getExp = (req, res) => {
    Experience.findById(req.params.id).populate({
        path: 'creator',
        populate: {
            path: 'user',
            select: 'fstName photo'
        }
    }).exec((err, exp) => {
        if(err || !exp) { 
            res.status(404).send({err: "Couldn't find experience."});
        } else { res.status(200).send({ exp }); }
    });
}

//Show occurrences for a certain experience
exports.getExpOcurrences = (req, res) => {
    const [dayStart, dayEnd] = extractDayFrame(req.query.date);
    Occurrence.find({experience: req.params.id, 
                     date: {$gte: dayStart, $lt: dayEnd}}, 
    'timeslot spotsLeft', (err, occ) => {
        if(err || !occ) {
            res.status(404).send({err: "Couldn't find occurrences."});
        } else {
            res.status(200).send({ occ });
        }
    });
}

//For adding a booking to an existing/new occurrence
exports.addBookingToOcurrence = async (req, res) => {
    try {
        const experience = await Experience.findById(req.params.id, 'capacity creator')
                                 .populate('creator');
        const [dayStart, dayEnd] = extractDayFrame(req.body.date);

        //Find or create the occurrence
        let occ = await Occurrence.findOne({
                            experience: req.params.id,
                            date: {$gte: dayStart, $lt: dayEnd},
                            timeslot: req.body.timeslot
                        });
        if(!occ) {
            occ = new Occurrence({
                experience: req.params.id,
                date: dayStart,
                timeslot: req.body.timeslot,
                spotsLeft: experience.capacity,
                creatorProfit: 0
            });
        }
        await occ.save();

        //Create booking
        const booking = new Booking({
            experience: experience._id,
            occurrence: occ._id,
            client: req.userId,
            numPeople: req.body.numGuests,
            stripe: {
                id: req.body.stripeId,
                paymentCaptured: false,
                creatorProfit: req.body.creatorProfit
            }
        });
        await booking.save();

        //Add booking to occurrence and update
        occ.spotsLeft -= booking.numPeople;
        occ.bookings.push(booking);
        await occ.save();

        //Add booking to creator's requests
        experience.creator.bookingRequests.push(booking);
        await experience.creator.save();

        res.status(201).send({ message: 'Successfully added booking to occurrence.' });
    }
    catch(err) {
        //If something goes wrong, cancel the intent
        res.redirect(307, '/api/stripe/payment-intent/cancel');
    }
}