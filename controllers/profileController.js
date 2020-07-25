//Models
const Experience = require('../models/experience');

const helpers = require('../helpers/profileHelpers');

//For fetching profile information
exports.getProfile = (req, res) => {
    req.user.populate('savedExperiences pastExperiences').execPopulate()
    .then(user => {
        res.status(200).send({
            userData: helpers.getUserData(user),
            ...helpers.getUserExps(user)
        });
    });
}

//Editing user info
exports.editProfile = async (req, res) => {
    try {
        req.user.fstName = req.body.fstName;
        req.user.lstName = req.body.lstName;
        req.user.city = req.body.city;
        req.user.email = req.body.email;
        req.user.phoneNumber = req.body.phoneNumber;
        req.user.birthday = req.body.birthday;
        await req.user.save();
        return res.status(200).send({ userData: helpers.getUserData(req.user) });
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
            res.status(200).send({ ...helpers.getUserExps(user) });
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
    .then(user => { res.status(200).send({ ...helpers.getUserExps(user) }); });
}

//Logout route
exports.logout = (req, res) => {
    req.logout();
    res.clearCookie('token'); //Delete auto login cookie
    res.redirect(`${process.env.CLIENT_URL}`);
}