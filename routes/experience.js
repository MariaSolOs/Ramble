const express = require('express'),
      router  = express.Router(),
      {authenticateToken} = require('../middleware/JWTMiddleware'),
      {findUser} = require('../middleware/profileMiddleware'),
      controllers = require('../controllers/experienceController');

//Fetch cities stored in database
router.get('/cities', controllers.getCities); 

//For admins to approve/disapprove experiences
router.get('/unapproved', 
            authenticateToken, 
            findUser,
            controllers.getUnapprovedExps);
router.put('/:id', 
            authenticateToken, 
            findUser,
            controllers.approveExp);

//Show experience page
router.get('/:id', controllers.getExp);

//Show occurrences for a certain experience
router.get('/:id/occ', controllers.getExpOcurrences);

//For adding a booking to an existing/new occurrence
router.post('/:id/occ', controllers.addBookingToOcurrence);

//Get experiences based on location and number of people
router.get('/', controllers.getExps);

module.exports = router;