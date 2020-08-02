const helpers = require('../helpers/profileHelpers'),
      cloudinary = require('cloudinary').v2;

//Models
const User = require('../models/user'),
      Experience = require('../models/experience'),
      Creator = require('../models/creator');

//For fetching profile information
exports.getUserProfile = (req, res) => {
    if(req.isAdmin) {
        res.status(200).send({ 
            isAdmin: true,
            token: req.token,
            userData: {
                username: req.user.username,
                permissions: req.user.permissions
            }
        });
    } else {
        res.status(200).send({
            isAdmin: false,
            isCreator: Boolean(req.user.creator),
            token:  req.token,
            userData: helpers.getUserData(req.user)
        });
    }
}
exports.getCreatorProfile = (req, res) => {
    req.user.populate('creator')
    .execPopulate().then(async user => {
        res.status(200).send({
            creatorData: {...await helpers.getCreatorData(user.creator)}
        });
    });
}

//Editing user info
exports.editProfile = async (req, res) => {
    try {
        for(const field in req.body) {
            req.user[field] = req.body[field];
        }
        await req.user.save();
        res.status(201).send({ 
            token: req.token,
            isAdmin: false,
            isCreator: Boolean(req.user.creator),
            userData: helpers.getUserData(req.user) 
        });
    } catch(err) {
        res.status(409).send({error: "Couldn't update user."});
    }
}

//Upgrade an user to a creator
exports.updateUserToCreator = async (req, res) => {
    try {
        //Upload ID to Cloudinary
        const governmentIds = [];
        for(idImg of req.body.id) {
            const upload = await cloudinary.uploader.upload(idImg, {
                folder: 'Ramble/Creators',
                eager: [
                    { format: 'jpeg', height: 300, quality: 30, crop: 'fit' }
                ]
            });
            governmentIds.push(upload.eager[0].secure_url);
        }
        //Make a new creator
        const creator = new Creator({
            user: req.userId,
            bio: req.body.bio,
            verified: false,
            governmentIds
        });
        await creator.save();
        //Update user's info
        req.user.phoneNumber = req.body.phoneNumber;
        req.user.creator = creator._id;
        await req.user.save();
        res.status(201).send({
            isAdmin: false,
            isCreator: true,
            token:  req.token,
            userData: helpers.getUserData(req.user)
        });
    } catch(err) {
        res.status(409).send({err: "Couldn't update user to creator."});
    }
}

//For getting and saving/unsaving an experience
exports.getUserExperiences = async (req, res) => {
    res.status(200).send({
        ...await helpers.getUserExperiences(req.user)
    });
}
exports.saveExperience = async (req, res) => {
    try {
        let savedExp = null;
        const exp = await Experience.findById(req.body.expId, 
                          'title location.displayLocation images price rating');
        if(!req.user.savedExperiences.includes(exp._id)){
            req.user.savedExperiences.push(exp._id);
            savedExp = exp;
            await req.user.save();
        }
        res.status(200).send({ 
            token: req.token,
            savedExp 
        });
    } catch(err) {
        res.status(409).send({err: `Couldn't save experience: ${err}`});
    }
}
exports.unsaveExperience = async (req, res) => {
    try {
        const newExps = req.user.savedExperiences.filter(id => 
            !id.equals(req.body.expId)
        );
        req.user.savedExperiences = newExps;
        await req.user.save();
        res.status(200).send({
            token: req.token,
            message: 'Experience succesfully unsaved.'
        });
    } catch(err) {
        res.status(409).send({err: `Couldn't unsave experience: ${err}`});
    }
}
