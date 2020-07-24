const express = require('express'),
      router  = express.Router(),
      {authenticateToken} = require('../middleware/JWT');

//Models
const Experience = require('../models/experience'),
      User = require('../models/user');   

//For fetching profile information
router.get('/api/profile', authenticateToken, (req, res) => {
    if(req.userId) {
        User.findById(req.userId).populate('savedExperiences pastExperiences')
        .exec((err, user) => {
            if(err || !user) { 
                return res.status(404).send({error: "Couldn't find user."}) ;
            }
            res.status(200).send({
                userData: {
                    id: user._id,
                    fstName: user.fstName,
                    lstName: user.lstName,
                    photo: user.photo,
                    city: user.city,
                    email: user.email,
                    phoneNumber: user.phoneNumber,
                    birthday: user.birthday
                },
                pastExps: user.pastExperiences,
                savedExps: user.savedExperiences
            });
        });
    } else { res.status(401).send({error: 'Invalid token.'}); }
});

//Editing user info
router.put('/api/profile/edit', authenticateToken, (req, res) => {
    if(req.userId) {
        User.findByIdAndUpdate(req.userId, 
            {'fstName': req.body.fstName, 
             'lstName': req.body.lstName,
             'city': req.body.city,
             'email': req.body.email,
             'phoneNumber': req.body.phoneNumber,
             'birthday': req.body.birthday,
            }, {new: true}, (err, user) => {
                if(err || !user){
                    res.status(409).send({error: "Couldn't update user"});
                } else {
                    res.status(200).send({
                        userData: {
                            id: user._id,
                            fstName: user.fstName,
                            lstName: user.lstName,
                            photo: user.photo,
                            city: user.city,
                            email: user.email,
                            phoneNumber: user.phoneNumber,
                            birthday: user.birthday
                        }
                    });
                }
        });
    } else { res.status(401).send({error: 'Invalid token.'}); }
});

//For saving/unsaving an experience
router.post('/api/profile/exps', authenticateToken, (req, res) => {
    if(req.userId) {
        Experience.findById(req.body.expId, (err, exp) => {
            if(err) { 
                return res.status(409).send({error: "Couldn't find experience"}); 
            }
            User.findById(req.userId, (err, user) => {
                if(err){ return res.status(404).send({error: "Couldn't find user"}); }
                if(!user.savedExperiences.includes(exp._id)){
                    user.savedExperiences.push(exp._id);
                    user.save();
                }
                user.populate('pastExperiences savedExperiences').execPopulate()
                .then(user => {
                    res.status(200).send({
                        pastExps: user.pastExperiences,
                        savedExps: user.savedExperiences
                    });
                });
            });
        });
    } else { res.status(401).send({error: 'Invalid token.'}); }
});
router.delete('/api/profile/exps', authenticateToken, (req, res) => {
    if(req.userId) {
        User.findById(req.userId, (err, user) => {
            if(err){ 
                return res.status(404).send({error: "Couldn't find user"}); 
            }
            const newExps = user.savedExperiences.filter(id => !id.equals(req.body.expId));
            user.savedExperiences = newExps;
            user.save();
            user.populate('pastExperiences savedExperiences').execPopulate()
            .then(user => {
                res.status(200).send({
                    pastExps: user.pastExperiences,
                    savedExps: user.savedExperiences
                });
            });
        });
    }
});

//Logout route
router.get('/api/profile/logout', (req, res) => {
    req.logout();
    res.clearCookie('token'); //Delete auto login cookie
    res.redirect(`${process.env.CLIENT_URL}`);
});

module.exports = router;