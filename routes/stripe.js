const express = require('express'),
      router = express.Router(),
      {validateStripeState, authenticateToken} = require('../middleware/JWTMiddleware'),
      {identifyUser} = require('../middleware/userMiddleware'),
      controllers = require('../controllers/stripeController');

//After creator signs up with stripe they get redirected here
router.get('/creator-oauth', 
            validateStripeState, 
            identifyUser,
            controllers.connectCreatorToStripe);

router.post('/payment-intent', 
            authenticateToken, 
            controllers.createPaymentIntent);
router.post('/payment-intent/capture', 
            authenticateToken, 
            controllers.capturePaymentIntent);
router.post('/payment-intent/cancel',
            authenticateToken,
            controllers.cancelPaymentIntent);

//Webhook
router.post('/webhook', controllers.stripeWebhook);

module.exports = router;

