const stripe = require('stripe')(process.env.STRIPE_SECRET_KEY);
      
const helpers = require('../helpers/stripeHelpers');

exports.upgradeToCreator = (req, res) => {
    const {code} = req.query;
    //Send the authorization code to Stripe's API
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
}

//Called once bookings are (tried to be) saved to DB
exports.capturePaymentIntent = async (req, res) => {
    stripe.paymentIntents.capture(req.body.stripeId, (err, intent) => {
        if(err) {
            res.status(500).send({err: "Couldn't capture intent."});
        } else {
            res.status(200).send({intentId: intent.id, status: intent.status})
        }
    });
}
exports.cancelPaymentIntent = async (req, res) => {
    stripe.paymentIntents.cancel(req.body.stripeId, (err, intent) => {
        if(err) {
            res.status(500).send({err: "Couldn't cancel intent."});
        } else {
            res.status(200).send({intentId: intent.id, status: intent.status})
        }
    });
}

exports.createPaymentIntent = async (req, res) => {
    const {expId, bookType, numGuests, transferId} = req.body;
    const payInfo = await helpers.calculatePaymentAmount(expId, bookType, +numGuests);
    await stripe.paymentIntents.create({
        amount: payInfo.amount,
        currency: payInfo.currency,
        application_fee_amount: payInfo.rambleFee,
        capture_method: 'manual',
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
}

//const webhook_secret = process.env.STRIPE_WEBHOOK_SECRET;
const webhook_secret = 'whsec_gRQ8130PrfZSaGEp9BPXgTXzjBwoeLOx';
exports.stripeWebhook = async (req, res) => {
    const sign = req.headers['stripe-signature'];
    let event;

    try {
        event = stripe.webhooks.constructEvent(req.rawBody, sign, webhook_secret);
    } catch (err) {
        return res.status(400).send(`Webhook Error: ${err.message}`);
    }

    let message;
    switch(event.type) {
        case 'payment_intent.succeeded':
            const paymentIntent = event.data.object;
            message = helpers.handleSuccessfulPaymentIntent(paymentIntent.id);  
            break;
        default:
            return res.status(400).end(); //Unexpected event type
    }

    //Acknowledge receipt of the event
    res.status(200).send({received: true, message});
}