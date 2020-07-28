const express = require('express'),
      router  = express.Router(),
      passport = require('passport'),
      {sendToken, redirectUserWithCookie} = require('../middleware/authMiddleware'),
      controller = require('../controllers/authController');

router.post('/email-register', 
            controller.registerUserWithEmail, 
            sendToken);
router.post('/email-login', 
            passport.authenticate('local', {failureRedirect: '/'}), 
            (req, res, next) => {
                req.userId = req.user._id;
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
                        req.userId = user._id;
                        next();
                    });
                })(req, res, next); 
            }, 
            redirectUserWithCookie);

router.get('/google', 
            (req, res, next) => {
                passport.authenticate('google', {
                    scope: ['profile', 'email'],
                    prompt: 'consent',
                    session: false
                })(req, res, next)
            });
router.get('/google/callback', 
            passport.authenticate('google'),
            (req, res, next) => {
                req.userId = req.user._id;
                next();
            },
            redirectUserWithCookie);  

router.post('/admin-register', 
            controller.registerAdmin,
            sendToken);
router.post('/admin-login',
            passport.authenticate('local-admin', {failureRedirect: '/'}), 
            (req, res, next) => {
                req.userId = req.user._id;
                req.isAdmin = true;
                next();
            }, 
            sendToken);
            
router.get('/logout', controller.logout);
       
module.exports = router;