const express = require('express'),
      router = express.Router(),
      {validateStripeState} = require('../middleware/JWTMiddleware'),
      controllers = require('../controllers/stripeController');

//After creator signs up with stripe they get redirected here
router.get('/api/stripe/oauth', 
            validateStripeState, 
            controllers.upgradeToCreator);

//Server routes called once bookings are (tried to be) saved to DB
router.post('/stripe/payment-intent/capture', controllers.capturePaymentIntent);
router.post('/stripe/payment-intent/cancel', controllers.cancelPaymentIntent);

router.post('/api/stripe/payment-intent', controllers.createPaymentIntent);

//Webhook
router.post('/stripe/webhook', controllers.stripeWebhook);

module.exports = router;

