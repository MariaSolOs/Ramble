const express = require('express'),
      router = express.Router(),
      {validateStripeState} = require('../middleware/JWTMiddleware'),
      {findUser} = require('../middleware/profileMiddleware'),
      controllers = require('../controllers/stripeController');

//After creator signs up with stripe they get redirected here
router.get('/oauth', 
            validateStripeState, 
            findUser,
            controllers.upgradeToCreator);

//Server routes called once bookings are (tried to be) saved to DB
router.post('/payment-intent/capture', controllers.capturePaymentIntent);
router.post('/payment-intent/cancel', controllers.cancelPaymentIntent);

router.post('/payment-intent', controllers.createPaymentIntent);

//Webhook
router.post('/webhook', controllers.stripeWebhook);

module.exports = router;

