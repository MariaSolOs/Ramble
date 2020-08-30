const {generatePromoCode} = require('../helpers/profileHelpers');

const User = require('../models/user'), 
      Admin = require('../models/admin');

exports.registerUserWithEmail = (req, res, next) => {
    User.find({'email.address': req.body.email,
                membershipProvider: 'email'}, 
    async (err, users) => {
        if(err) {
            return res.status(404).send({error: 'Registration error'});
        } else if(users.length > 0) {
            return res.status(409).send({
                error: 'Email is already used.'
            }); 
        } else {
            User.create({ 
                fstName: req.body.fstName, 
                lstName: req.body.lstName,
                birthday: req.body.birthday, 
                email: {
                    address: req.body.email,
                    verified: false
                }, 
                password: req.body.password, 
                membershipProvider: 'email',
                promoCode: {
                    code: await generatePromoCode(req.body.fstName),
                }
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
            }).catch(err => { 
                return res.status(404).send({error: 'Registration error'}); 
            });
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
    if(!req.isAdmin || !req.user.permissions.includes('addAdmin')) {
        return res.status(401).send({err: 'Unauthorized.'});
    }
    Admin.create({ 
        username: req.body.username,
        password: req.body.password,
        permissions: req.body.permissions
    }).then(admin => {
        if(admin) {
            return res.status(201).send({message: 'Successfully added admin'});
        }
    }).catch(err => { next(err); });
}

//Logout route
exports.logout = (req, res) => {
    req.logout();
    res.clearCookie('token'); //Delete auto login cookie
    res.redirect(`${process.env.CLIENT_URL}`);
}