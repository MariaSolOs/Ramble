const express = require('express'),
      router  = express.Router(),
      {cookieFromEmailLink} = require('../middleware/authMiddleware'),
      controller = require('../controllers/emailController');

//For users that authenticate with email link
router.get('/calendar-update/:userId',
            cookieFromEmailLink,
            controller.updateCreatorCalendar);

router.get('/connect-stripe/:userId',
           cookieFromEmailLink,
           controller.connectWithStripe);

module.exports = router;