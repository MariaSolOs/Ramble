const express = require('express'),
      router  = express.Router(),
      {authenticateToken} = require('../middleware/authMiddleware'),
      {identifyUser} = require('../middleware/userMiddleware'),
      controllers = require('../controllers/profileController'); 

//For fetching profile information
router.get('/', 
            authenticateToken, 
            identifyUser, 
            controllers.getUserProfile);

//Editing user info
router.put('/edit', 
            authenticateToken, 
            identifyUser, 
            controllers.editProfile);

//For getting and saving/unsaving an experience
router.get('/exps', 
            authenticateToken, 
            identifyUser, 
            controllers.getUserExperiences);
router.post('/exps', 
             authenticateToken, 
             controllers.saveExperience);
router.delete('/exps/:expId', 
               authenticateToken, 
               controllers.unsaveExperience);

//To delete user notifications
router.delete('/notifs/:notifId',
              authenticateToken,
              controllers.deleteNotification);

//Get saved cards
router.get('/payMethods',
           authenticateToken,
           controllers.getPaymentMethods);     
           
//Reset password
router.post('/reset-password', 
            controllers.resetPassword);

module.exports = router;