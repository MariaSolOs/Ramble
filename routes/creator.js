const express = require('express'),
      router  = express.Router(),
      {authenticateToken} = require('../middleware/JWTMiddleware'),
      {identifyUser} = require('../middleware/userMiddleware'),
      controllers = require('../controllers/creatorController'); 

//For fetching profile information
router.get('/', 
            authenticateToken, 
            identifyUser,
            controllers.getCreatorProfile);
router.get('/bookingRequests', 
           authenticateToken, 
           identifyUser,
           controllers.getBookingRequests);

//Update user to creator
router.post('/', 
            authenticateToken, 
            identifyUser,
            controllers.upgradeUserToCreator);

module.exports = router;