//Models
const Experience = require('../models/experience');

const helpers = require('../helpers/profileHelpers');

//For fetching profile information
exports.getUserProfile = async (req, res) => {
    if(req.isAdmin) {
        return res.status(200).send({ 
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
            userData: helpers.getUserData(req.user),
            ...await helpers.getUserExperiences(req.user)
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
        return res.status(201).send({ 
            token: req.token,
            userData: helpers.getUserData(req.user) 
        });
    } catch(err) {
        return res.status(409).send({error: "Couldn't update user"});
    }
}

//For saving/unsaving an experience
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
        res.status(200).send({ savedExp });
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
        res.status(200).send({message: 'Experience succesfully unsaved.'});
    } catch(err) {
        res.status(409).send({err: `Couldn't unsave experience: ${err}`});
    }
}
