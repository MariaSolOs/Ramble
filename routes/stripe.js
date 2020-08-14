const express = require('express'),
      router = express.Router(),
      {validateStripeState, authenticateToken} = require('../middleware/JWTMiddleware'),
      controllers = require('../controllers/stripeController');

//After creator signs up with stripe they get redirected here
router.get('/creator-oauth', 
            validateStripeState, 
            controllers.connectCreatorToStripe);

//Add a new Stripe customer
router.post('/customer',
            authenticateToken,
            controllers.addCustomer);

//Manage user's payment methods
router.post('/payment-method',
            authenticateToken,
            controllers.attachPaymentMethod);
router.delete('/payment-method',
             authenticateToken,
             controllers.detachPaymentMethod);

//Deal with payment intents
router.post('/payment-intent', 
            authenticateToken, 
            controllers.createPaymentIntent);
router.post('/payment-intent/capture', 
            authenticateToken, 
            controllers.capturePaymentIntent);
router.post('/payment-intent/cancel',
            authenticateToken,
            controllers.cancelPaymentIntent);
router.post('/payment-intent/saved-card',
            authenticateToken,
            controllers.payWithSavedCard);

//Webhook
router.post('/webhook', controllers.stripeWebhook);

module.exports = router;

