const express = require('express'),
      router  = express.Router(),
      {authenticateToken} = require('../middleware/JWTMiddleware'),
      {identifyUser} = require('../middleware/profileMiddleware'),
      controllers = require('../controllers/experienceController');

//Fetch cities stored in database
router.get('/locations', controllers.getLocations); 

//For admins to approve/disapprove experiences
router.get('/unapproved', 
            authenticateToken, 
            identifyUser,
            controllers.getUnapprovedExps);
router.post('/:id/approve', 
             authenticateToken, 
             identifyUser,
             controllers.approveExp);

//Show experience page
router.get('/:id', controllers.getExp);

//Show occurrences for a certain experience
router.get('/:id/occ', controllers.getExpOcurrences);

//For adding a booking to an existing/new occurrence
router.post('/:id/occ', authenticateToken, controllers.addBookingToOcurrence);

//Get experiences based on location and number of people
router.get('/', controllers.getExps);

module.exports = router;