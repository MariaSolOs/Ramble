const express = require('express'),
      router  = express.Router(),
      passport = require('passport'),
      {identifyUser} = require('../middleware/userMiddleware'),
      {authenticateToken, sendToken, redirectUserWithCookie} = require('../middleware/authMiddleware'),
      controller = require('../controllers/authController');

//In case email login fails
router.get('/email-login-fail', (req, res) => {
    res.status(401).send({message: 'Incorrect email/password'});
});

router.post('/email-register', 
            controller.emailRegister, 
            sendToken);
router.post('/email-login', 
            passport.authenticate('local', { 
                failureRedirect: '/api/auth/email-login-fail' 
            }), 
            controller.emailLogin, 
            sendToken);
                 
router.get('/facebook', 
           controller.facebookAuth, 
           redirectUserWithCookie);

router.get('/google', 
            controller.googleAuth);
router.get('/google/callback', 
            passport.authenticate('google'),
            (req, res, next) => {
                if(req.newUser) {
                    res.cookie('userCreatedDate', new Date().toISOString());
                }
                next();
            },
            redirectUserWithCookie);  

router.post('/admin-login',
            passport.authenticate('local-admin', {
                failureRedirect: '/api/auth/email-login-fail'
            }), 
            controller.loginAdmin, 
            sendToken);
//Only users with respective permissions can register new admins
router.post('/admin-register', 
            authenticateToken,
            identifyUser,
            controller.registerAdmin);
            
router.get('/logout', controller.logout);
       
module.exports = router;