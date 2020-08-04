const express = require('express'),
      router  = express.Router(),
      passport = require('passport'),
      {authenticateToken} = require('../middleware/JWTMiddleware'),
      {identifyUser} = require('../middleware/userMiddleware'),
      {sendToken, redirectUserWithCookie} = require('../middleware/authMiddleware'),
      controller = require('../controllers/authController');

router.post('/email-register', 
            controller.registerUserWithEmail, 
            sendToken);
router.post('/email-login', 
            passport.authenticate('local', { failureRedirect: '/' }),
            (req, res, next) => {
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
            passport.authenticate('local-admin', {failureRedirect: '/'}), 
            (req, res, next) => {
                req.isAdmin = true;
                next();
            }, 
            sendToken);
//Only users with respective permissions can register new admins
router.post('/admin-register', 
            authenticateToken,
            identifyUser,
            controller.registerAdmin);
            
router.get('/logout', controller.logout);
       
module.exports = router;