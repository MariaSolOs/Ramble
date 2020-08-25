const express = require('express'),
      router = express.Router(),
      {validateStripeState, authenticateToken} = require('../middleware/JWTMiddleware'),
      controllers = require('../controllers/stripeController');

//Stripe onboarding for creators
router.get('/creator/oauth-return', 
            validateStripeState, 
            controllers.completeCreatorOnboarding);

//Add a new Stripe customer
router.post('/customer',
            authenticateToken,
            controllers.addCustomer);

//Check if the given promo code is valid
router.post('/promo', 
            authenticateToken,
            controllers.applyPromo);

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

