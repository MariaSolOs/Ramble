const express = require('express'),
      router  = express.Router(),
      controllers = require('../controllers/experienceController');

//Fetch cities stored in database
router.get('/cities', controllers.getCities); 

//Get experiences based on location and number of people
router.get('/', controllers.getExps);

//Show experience page
router.get('/:id', controllers.getExp);

//Show occurrences for a certain experience
router.get('/:id/occ', controllers.getExpOcurrences);

//For adding a booking to an existing/new occurrence
router.post('/:id/occ', controllers.addBookingToOcurrence);

module.exports = router;