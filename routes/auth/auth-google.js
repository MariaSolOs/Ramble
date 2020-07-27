const express = require('express'),
      router  = express.Router(),
      passport = require('passport'),
      {redirectWithCookie} = require('../../middleware/profileMiddleware');
      
router.get('/api/auth/google', (req, res, next) => {
    passport.authenticate('google', {
        scope: ['profile', 'email'],
        prompt: 'consent',
        session: false
    })(req, res, next)
});

router.get('/auth/google/callback', passport.authenticate('google'), (req, res, next) => {
    req.userId = req.user._id;
    next();
}, redirectWithCookie);

module.exports = router;

