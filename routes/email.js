const express = require('express'),
      router  = express.Router(),
      {cookieFromEmailLink} = require('../middleware/authMiddleware'),
      controller = require('../controllers/emailController');

//Link to update experience's availabilities
router.get('/:userId/cal-update',
            cookieFromEmailLink,
            controller.updateCreatorCalendar);

//Link to review booking request
router.get('/:userId/creator-dashboard',
           cookieFromEmailLink,
           controller.reviewBookingRequest);

//Redirect to Stripe's onboarding
router.get('/connect-stripe/:userId',
           cookieFromEmailLink,
           controller.connectWithStripe);

//Verify user's email address
router.get('/verify-email-address/:userId',
           cookieFromEmailLink,
           controller.verifyEmailAddress);

module.exports = router;