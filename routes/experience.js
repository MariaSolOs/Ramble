const express = require('express'),
      router  = express.Router(),
      controllers = require('../controllers/experienceController');

//Fetch cities stored in database
router.get('/api/cities', controllers.getCities); 

//Get experiences based on location and number of people
router.get('/api/exps', controllers.getExps);

//Show experience page
router.get('/api/exp/:id', controllers.getExp);

//Show occurrences for a certain date 
router.get('/api/exp/:id/occ', controllers.getExpOcurrences);

//For adding a booking to an existing/new occurrence
router.post('/api/exp/:id/occ', controllers.addBookingToOcurrence);

module.exports = router;