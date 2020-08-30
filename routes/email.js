const express = require('express'),
      router  = express.Router(),
      {cookieFromEmailLink} = require('../middleware/authMiddleware'),
      controller = require('../controllers/emailController');

//Link to update experience's availabilities
router.get('/cal-update/:expId/:userId',
            cookieFromEmailLink,
            controller.updateCreatorCalendar);

//Redirect to Stripe's onboarding
router.get('/connect-stripe/:userId',
           cookieFromEmailLink,
           controller.connectWithStripe);

//Verify user's email address
router.get('/verify-email-address/:userId',
           cookieFromEmailLink,
           controller.verifyEmailAddress);

module.exports = router;