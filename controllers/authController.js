const User = require('../models/user'), 
      Admin = require('../models/admin');
const e = require('express');

exports.registerUserWithEmail = (req, res, next) => {
    User.find({email: req.body.email,
               membershipProvider: 'email'}, 
    (err, users) => {
        if(err) {
            return next(err);
        } else if(users.length > 0) {
            return res.status(409).send({error: 'Email is already used.'}); 
        } else {
            User.create({ 
                fstName: req.body.fstName, 
                lstName: req.body.lstName,
                birthday: req.body.birthday, 
                email: req.body.email, 
                password: req.body.password, 
                membershipProvider: 'email'
            }).then(user => {
                req.login(user, err => {
                    if(err) { 
                        res.status(404).send({error: 'Registration error'}); 
                    } else { 
                        req.userId = user._id;
                        req.isAdmin = false;
                        next();
                    }
                });
            }).catch(err => { next(err); });
        }
    });
}

exports.googleAuth = (req, res, next) => {
    passport.authenticate('google', {
        scope: ['profile', 'email'],
        prompt: 'consent',
        session: false
    })(req, res, next);
}

exports.registerAdmin = (req, res, next) => {
    Admin.create({ 
        username: req.body.username,
        password: req.body.password
    }).then(admin => {
        req.login(admin, err => {
            if(err) { 
                res.status(404).send({error: 'Admin registration error'}); 
            } else { 
                req.userId = req.user._id;
                req.isAdmin = true;
                next();
            }
        });
    }).catch(err => { next(err); });
}

//Logout route
exports.logout = (req, res) => {
    req.logout();
    res.clearCookie('token'); //Delete auto login cookie
    res.redirect(`${process.env.CLIENT_URL}`);
}