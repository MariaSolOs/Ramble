const express = require('express'),
      router  = express.Router(),
      {authenticateToken} = require('../middleware/JWTMiddleware'),
      {identifyUser} = require('../middleware/profileMiddleware'),
      controllers = require('../controllers/profileController'); 

//For fetching profile information
router.get('/', 
            authenticateToken, 
            identifyUser, 
            controllers.getProfile);

//Editing user info
router.put('/edit', 
            authenticateToken, 
            identifyUser, 
            controllers.editProfile);

//For saving/unsaving an experience
router.post('/exps', 
             authenticateToken, 
             identifyUser,
             controllers.saveExperience);
router.delete('/exps', 
               authenticateToken, 
               identifyUser,
               controllers.unsaveExperience);

module.exports = router;