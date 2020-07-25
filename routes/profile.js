const express = require('express'),
      router  = express.Router(),
      {authenticateToken} = require('../middleware/JWTMiddleware'),
      {findUser} = require('../middleware/profileMiddleware'),
      controllers = require('../controllers/profileController'); 

//For fetching profile information
router.get('/api/profile', 
            authenticateToken, 
            findUser, 
            controllers.getProfile);

//Editing user info
router.put('/api/profile/edit', 
            authenticateToken, 
            findUser, 
            controllers.editProfile);

//For saving/unsaving an experience
router.post('/api/profile/exps', 
             authenticateToken, 
             findUser,
             controllers.saveExperience);
router.delete('/api/profile/exps', 
               authenticateToken, 
               findUser,
               controllers.unsaveExperience);

//Logout route
router.get('/api/profile/logout', controllers.logout);

module.exports = router;