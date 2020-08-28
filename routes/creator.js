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
            controllers.getBookingRequests);

//Update user to creator
router.post('/', 
            authenticateToken, 
            identifyUser,
            controllers.upgradeUserToCreator);

//Edit creator info
router.patch('/:creatorId',
             authenticateToken,
             controllers.editCreatorProfile);

//Get created experiences 
router.get('/:creatorId/experiences',
           authenticateToken,
           identifyUser,
           controllers.getCreatedExperiences);

//To delete bookings where no payment intent has been created
router.delete('/bookingRequests/:bookId',
              authenticateToken,
              controllers.deleteBookingRequest);

module.exports = router;