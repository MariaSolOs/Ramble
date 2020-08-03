//Models
const User = require('../models/user'),
      Experience = require('../models/experience');

//Helpers
const getUserData = (user) => ({
    fstName: user.fstName,
    lstName: user.lstName,
    photo: user.photo,
    city: user.city,
    email: user.email,
    phoneNumber: user.phoneNumber,
    birthday: user.birthday
});

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
            userData: getUserData(req.user)
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
        res.status(201).send({ 
            token: req.token,
            isAdmin: false,
            isCreator: Boolean(req.user.creator),
            userData: getUserData(req.user) 
        });
    } catch(err) {
        res.status(409).send({error: "Couldn't update user."});
    }
}

//For getting and saving/unsaving an experience
exports.getUserExperiences = async (req, res) => {
    //We only need this for experience cards
    const expFields = 'title location.displayLocation images price rating';
    const {pastExperiences, savedExperiences} = 
        await req.user.populate('pastExperiences', expFields)
                  .populate('savedExperiences', expFields)
                  .execPopulate();
    res.status(200).send({
        pastExperiences, 
        savedExperiences
    });
}
exports.saveExperience = async (req, res) => {
    try {
        const savedExp = await Experience.findById(req.body.expId, 
                         'title location.displayLocation images price rating');
        await User.findByIdAndUpdate(req.userId, 
              {$addToSet: { savedExperiences: savedExp._id }});
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
        await User.findByIdAndUpdate(req.userId, 
              {$pull: {savedExperiences: req.body.expId }});
        res.status(200).send({
            token: req.token,
            message: 'Experience succesfully unsaved.'
        });
    } catch(err) {
        res.status(409).send({err: `Couldn't unsave experience: ${err}`});
    }
}
