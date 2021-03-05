const express = require('express'),
      router  = express.Router(),
      {authenticateToken} = require('../middleware/authMiddleware'),
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
router.get('/:date/upcomingBookings',
            authenticateToken,
            identifyUser,
            controllers.getUpcomingBookings);

//Update user to creator
router.post('/', 
            authenticateToken, 
            identifyUser,
            controllers.upgradeUserToCreator);

//Edit creator info
router.patch('/:creatorId',
             authenticateToken,
             controllers.editCreatorProfile);

//Get created experiences and upcoming bookings
router.get('/experiences',
           authenticateToken,
           identifyUser,
           controllers.getExpsInfos);

//To delete bookings where no payment intent has been created
router.delete('/bookingRequests/:bookId',
              authenticateToken,
              controllers.deleteBookingRequest);

module.exports = router;