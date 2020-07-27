const express = require('express'),
      router  = express.Router(),
      passport = require('passport'),
      {generateAccessToken} = require('../../middleware/JWTMiddleware'),
      User = require('../../models/user');

router.post('/api/register/email', (req, res, next) => {
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
                const token = generateAccessToken(user._id, false, '12h');
                res.status(201).send({ token });
            }
        });
    }).catch(err => { next(err); });
});

//Login with email
router.post('/api/login/email', passport.authenticate('local', {
    failureRedirect: '/'
}), (req, res, next) => {
    if(req.user) {
        const token = generateAccessToken(req.user._id, false, '12h');
        res.status(200).send({ token });
    }
});

module.exports = router;