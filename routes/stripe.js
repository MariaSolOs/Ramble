const express = require('express'),
      router = express.Router(),
      {validateStripeState, authenticateToken} = require('../middleware/JWTMiddleware'),
      {identifyUser} = require('../middleware/profileMiddleware'),
      controllers = require('../controllers/stripeController');

//After creator signs up with stripe they get redirected here
router.get('/creator-oauth', 
            validateStripeState, 
            identifyUser,
            controllers.connectCreatorToStripe);

//Server routes called once bookings are (tried to be) saved to DB
router.post('/payment-intent/capture', controllers.capturePaymentIntent);
router.post('/payment-intent/cancel', controllers.cancelPaymentIntent);

router.post('/payment-intent', authenticateToken, controllers.createPaymentIntent);

//Webhook
router.post('/webhook', controllers.stripeWebhook);

module.exports = router;

