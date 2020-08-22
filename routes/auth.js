const express = require('express'),
      router  = express.Router(),
      passport = require('passport'),
      {authenticateToken} = require('../middleware/JWTMiddleware'),
      {identifyUser} = require('../middleware/userMiddleware'),
      {sendToken, redirectUserWithCookie} = require('../middleware/authMiddleware'),
      controller = require('../controllers/authController');

//In case email login fails
router.get('/email-login-fail', (req, res) => {
    res.status(401).send({message: 'Incorrect email/password'});
});

router.post('/email-register', 
            controller.registerUserWithEmail, 
            sendToken);
router.post('/email-login', 
            passport.authenticate('local', { 
                failureRedirect: '/api/auth/email-login-fail' 
            }), (req, res, next) => {
                req.isAdmin = false;
                next();
            }, 
            sendToken);
                 
router.get('/facebook', 
            (req, res, next) => {
                passport.authenticate('facebook', { session: false }, (err, user, info) => {
                    if(err || !user) { return next(err); }
                    req.logIn(user, (err) => {
                        if(err) { return next(err); }
                        next();
                    });
                })(req, res, next); 
            }, 
            redirectUserWithCookie);

router.get('/google', 
            passport.authenticate('google', {
                scope: ['profile', 'email'],
                prompt: 'consent',
                session: false
            }));
router.get('/google/callback', 
            passport.authenticate('google'),
            redirectUserWithCookie);  

router.post('/admin-login',
            passport.authenticate('local-admin', {
                failureRedirect: '/api/auth/email-login-fail'
            }), (req, res, next) => {
                req.isAdmin = true;
                next();
            }, 
            sendToken);
//Only users with respective permissions can register new admins
router.post('/admin-register', 
            authenticateToken,
            identifyUser,
            controller.registerAdmin);

//For users that authenticate with email link
router.get('/email-link/:emailType/:userId',
            controller.authenticateUserFromEmail);
            
router.get('/logout', controller.logout);
       
module.exports = router;