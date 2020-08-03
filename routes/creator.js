const express = require('express'),
      router  = express.Router(),
      {authenticateToken} = require('../middleware/JWTMiddleware'),
      {identifyUser} = require('../middleware/profileMiddleware'),
      controllers = require('../controllers/creatorController'); 

//For fetching profile information
router.get('/', 
            authenticateToken, 
            identifyUser, 
            controllers.getCreatorProfile);

//Update user to creator
router.post('/', 
            authenticateToken, 
            identifyUser,
            controllers.updateUserToCreator);

module.exports = router;