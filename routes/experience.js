const express = require('express'),
      router  = express.Router(),
      {authenticateToken} = require('../middleware/JWTMiddleware'),
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

//For creators to create an experience
router.post('/', authenticateToken, controllers.createExperience);

//Show experience page
router.get('/:expId', controllers.getExp);

//Get experiences based on location and number of people
router.get('/', controllers.getExps);

module.exports = router;