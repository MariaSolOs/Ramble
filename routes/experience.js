const express = require('express'),
      router  = express.Router(),
      {authenticateToken} = require('../middleware/authMiddleware'),
      {identifyUser} = require('../middleware/userMiddleware'),
      controllers = require('../controllers/experienceController');

//Fetch cities stored in database
router.get('/locations', controllers.getLocations); 

//For admins to approve/disapprove experiences
router.get('/unapproved', 
            authenticateToken, 
            identifyUser,
            controllers.getUnapprovedExps);
router.post('/:expId/approve', 
             authenticateToken, 
             identifyUser,
             controllers.approveExp);
//To delete rejected experiences
router.delete('/rejected',
              authenticateToken,
              identifyUser,
              controllers.deleteRejectedExps);

//Review an experience
router.post('/review/:expId',
             authenticateToken,
             controllers.reviewExperience);
//Get all reviews (for admins)
router.get('/reviews',
           authenticateToken,
           identifyUser,
           controllers.getReviews);

//For creators to create an experience
router.post('/', authenticateToken, controllers.createExperience);

//Change availability schedule for an experience
router.patch('/:expId/schedule', 
             authenticateToken,
             controllers.updateSchedule);

//Get experience info
router.get('/:expId', controllers.getExp);

//Get experiences based on location and number of people
router.get('/', controllers.getExps);

module.exports = router;