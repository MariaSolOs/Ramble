const express = require('express'),
      router = express.Router(),
      stripe = require('stripe')(process.env.STRIPE_SECRET_KEY),
      helpers = require('../middleware/stripe');

router.get('/api/stripe/oauth', helpers.matchStripeState, (req, res) => {
    const {state, code} = req.query;
    //Verify that the token was authenticated
    if(!req.match) {
        return res.status(403).json({error: `Incorrect state parameter: ${state}`});
    }
    // Send the authorization code to Stripe's API
    stripe.oauth.token({grant_type: 'authorization_code', code})
    .then(async (response) => {
        //User is now a creator
        await helpers.updateUserToCreator(response.stripe_user_id, req.user);
        //TODO: Redirect to creator platform here
        return res.status(200).redirect(`${process.env.CLIENT_URL}`);
        }, (err) => {
            if (err.type === 'StripeInvalidGrantError') {
                return res.status(400).json({error: `Invalid authorization code: ${code}`});
            } else {
                return res.status(500).json({error: 'An unknown error occurred.'});
            }
        }
    );
});

router.post('/api/stripe/payment-intent', async (req, res) => {
    console.log('RECEIVED', req.body)
    const {expId, bookType, numGuests, transferId} = req.body;
    const payInfo = await helpers.calculatePaymentAmount(expId, bookType, +numGuests);
    console.log('PAYINFO', payInfo)
    await stripe.paymentIntents.create({
        amount: payInfo.amount,
        currency: payInfo.currency,
        application_fee_amount: payInfo.rambleFee,
        transfer_data: {
            destination: transferId
        }
    }).then((payIntent) => {
        try {
            return res.send({ clientSecret: payIntent.client_secret })
        } catch(err) {
            return res.status(500).send({ err })
        }
    });
});

//const webhook_secret = process.env.STRIPE_WEBHOOK_SECRET;
const webhook_secret = 'whsec_gRQ8130PrfZSaGEp9BPXgTXzjBwoeLOx';
router.post('/stripe/webhook', (req, res) => {
    const sign = req.headers['stripe-signature'];
    let event;

    try {
        event = stripe.webhooks.constructEvent(req.rawBody, sign, webhook_secret);
    } catch (err) {
        return res.status(400).send(`Webhook Error: ${err.message}`);
    }

    if(event.type === 'payment_intent.succeeded') {
        const paymentIntent = event.data.object;
        handleSuccessfulPaymentIntent(paymentIntent);
    }
    res.json({received: true});
});

const handleSuccessfulPaymentIntent = (paymentIntent) => {
    //TODO: Add occurrence to booking here
    console.log('SUCESS PAYMENT', JSON.stringify(paymentIntent));
}

module.exports = router;

