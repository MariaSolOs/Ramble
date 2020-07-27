const express = require('express'),
      router  = express.Router(),
      passport = require('passport'),
      {redirectWithCookie} = require('../../middleware/profileMiddleware');

router.get('/api/auth/facebook', (req, res, next) => {
    passport.authenticate('facebook', { session: false }, (err, user, info) => {
        if(err || !user) { return next(err); }
        req.logIn(user, (err) => {
            if(err) { return next(err); }
            req.userId = user._id;
            next();
        });
    })(req, res, next);
}, redirectWithCookie);

module.exports = router;