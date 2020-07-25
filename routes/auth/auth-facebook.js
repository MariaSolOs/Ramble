const express = require('express'),
      router  = express.Router(),
      passport = require('passport'),
      {generateAccessToken} = require('../../middleware/JWTMiddleware');

router.get('/api/auth/facebook', (req, res, next) => {
    passport.authenticate('facebook', { session: false }, (err, user, info) => {
        if(err || !user) { return next(err); }
        req.logIn(user, (err) => {
            if(err) { return next(err); }
            const token = generateAccessToken(user._id);
            res.cookie('token', token);
            return res.redirect(`${process.env.CLIENT_URL}`);
        });
    })(req, res, next);
});

module.exports = router;