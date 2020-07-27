const express = require('express'),
      router  = express.Router(),
      passport = require('passport'),
      controllers = require('../controllers/adminController');

//Auth routes
router.get('/register', controllers.registerAdmin);
router.get('/login', 
            passport.authenticate('local', {failureRedirect: process.env.CLIENT_URL}), 
            controllers.loginAdmin);

//Logout route
//router.get('/logout', controllers.logoutAdmin);

module.exports = router;