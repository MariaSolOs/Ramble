//Models
const Experience = require('../models/experience'),
      Occurrence = require('../models/occurrence');

const helpers = require('../helpers/profileHelpers');

//For fetching profile information
exports.getProfile = (req, res) => {
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
        req.user.populate('savedExperiences pastExperiences creator')
        .execPopulate().then(user => {
            console.log(user);
            // const createdExps = await Experience.find({
            //     creator: user.creator._id
            // }).distinct('_id');
            res.status(200).send({
                isAdmin: false,
                token:  req.token,
                userData: helpers.getUserData(user),
                pastExps: user.pastExperiences,
                savedExps: user.savedExperiences
            });
        });
    }
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
        const exp = await Experience.findById(req.body.expId);
        if(!req.user.savedExperiences.includes(exp._id)){
            req.user.savedExperiences.push(exp._id);
            await req.user.save();
        }
        req.user.populate('pastExperiences savedExperiences').execPopulate()
        .then(user => {
            res.status(200).send({ 
                pastExps: user.pastExperiences,
                savedExps: user.savedExperiences
            });
        });
    }catch (err) {
        res.status(409).send({err: `Couldn't save experience: ${err}`});
    }
}
exports.unsaveExperience = async (req, res) => {
    const newExps = req.user.savedExperiences.filter(id => 
                        !id.equals(req.body.expId)
                    );
    req.user.savedExperiences = newExps;
    await req.user.save();
    req.user.populate('pastExperiences savedExperiences').execPopulate()
    .then(user => { 
        res.status(200).send({ 
            pastExps: user.pastExperiences,
            savedExps: user.savedExperiences
        }); 
    });
}
