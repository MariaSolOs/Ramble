const express = require('express'),
      router  = express.Router(),
      {authenticateToken} = require('../middleware/JWTMiddleware'),
      controllers = require('../controllers/occurrenceController');


//Show occurrences for a certain experience
router.get('/:expId', controllers.getExpOcurrences);

//For adding a booking to an existing/new occurrence
router.post('/:expId/bookings', 
            authenticateToken, 
            controllers.addBookingToOcurrence);

module.exports = router;