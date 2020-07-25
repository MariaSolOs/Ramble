const express = require('express'),
      router  = express.Router(),
      {authenticateToken} = require('../middleware/JWT'),
      controllers = require('../controllers/profileController'); 

//For fetching profile information
router.get('/api/profile', authenticateToken, controllers.getProfile);

//Editing user info
router.put('/api/profile/edit', authenticateToken, controllers.editProfile);

//For saving/unsaving an experience
router.post('/api/profile/exps', authenticateToken, controllers.saveExperience);
router.delete('/api/profile/exps', authenticateToken, controllers.unsaveExperience);

//Logout route
router.get('/api/profile/logout', controllers.logout);

module.exports = router;