const express = require('express'),
      router  = express.Router(),
      passport = require('passport'),
      {generateAccessToken} = require('../../middleware/JWTMiddleware');
      
router.get('/api/auth/google', (req, res, next) => {
    passport.authenticate('google', {
        scope: ['profile', 'email'],
        prompt: 'consent',
        session: false
    })(req, res, next)
});

router.get('/auth/google/callback', passport.authenticate('google'), (req, res) => {
    const token = generateAccessToken(req.user._id);
    res.cookie('token', token);
    return res.redirect(`${process.env.CLIENT_URL}`);
});

module.exports = router;

