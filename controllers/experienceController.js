const cloudinary = require('cloudinary').v2;

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
    Experience.findByIdAndUpdate(req.params.expId, {status: req.body.decision},
    async (err, exp) => {
        if(err || !exp) {
            res.status(500).send({err: 'Failed to approve/disapprove experience.'});
        } else {
            const creator = await User.findOne({creator: exp.creator._id}, 'email');
            const notif = new Notification({
                message: `Your experience "${exp.title}" has been ${
                req.body.decision}.`,
                user: creator._id,
                category: 'Creator-ExperienceDecision'
            });
            await notif.save();
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
        res.status(409).send(err);
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
    Experience.findById(req.params.expId).populate({
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