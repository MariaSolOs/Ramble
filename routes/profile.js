const express = require('express'),
      router  = express.Router(),
      {authenticateToken} = require('../middleware/JWTMiddleware'),
      {findUser} = require('../middleware/profileMiddleware'),
      controllers = require('../controllers/profileController'); 

//For fetching profile information
router.get('/', 
            authenticateToken, 
            findUser, 
            controllers.getProfile);

//Editing user info
router.put('/edit', 
            authenticateToken, 
            findUser, 
            controllers.editProfile);

//For saving/unsaving an experience
router.post('/exps', 
             authenticateToken, 
             findUser,
             controllers.saveExperience);
router.delete('/exps', 
               authenticateToken, 
               findUser,
               controllers.unsaveExperience);

module.exports = router;