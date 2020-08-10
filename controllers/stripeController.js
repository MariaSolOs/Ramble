const stripe = require('stripe')(process.env.STRIPE_SECRET_KEY),
      handlers = require('../helpers/stripeWebhookHandlers');

const User = require('../models/user'),
      Experience = require('../models/experience');

//Helpers
const calculatePaymentAmount = async (expId, bookType, numGuests) => {
    try {
        const exp = await Experience.findById(expId, 'price');
        let amount;
        if(bookType === 'public') {
            amount = exp.price.perPerson * numGuests * 100;
        } else if(bookType === 'private') {
            amount = exp.price.private * 100;
        } else {
            throw new Error('Invalid booking type.');
        }
        //Price is multiplied by 100 to use cents
        return {
            amount,
            currency: exp.price.currency,
            rambleFee: amount * 0.15
        }
    } catch(err) {
        throw new Error(`Couldn't calculate amount: ${err}`);
    }
}

exports.connectCreatorToStripe = (req, res) => {
    const {code} = req.query;
    //Send the authorization code to Stripe's API
    stripe.oauth.token({grant_type: 'authorization_code', code})
    .then(async (response) => {
        //Add Stripe ID to creator
        const user = await User.findById(req.userId, 'creator')
                           .populate('creator', 'stripe');
        user.creator.stripe.accountId = response.stripe_user_id;
        await user.creator.save();

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
exports.capturePaymentIntent = (req, res) => {
    stripe.paymentIntents.capture(req.body.stripeId, (err, intent) => {
        if(err) {
            res.status(500).send({err: "Couldn't capture intent."});
        } else {
            res.status(200).send({intentId: intent.id, status: intent.status})
        }
    });
}
exports.cancelPaymentIntent = (req, res) => {
    stripe.paymentIntents.cancel(req.body.stripeId, (err, intent) => {
        if(err) {
            res.status(500).send({err: "Couldn't cancel intent."});
        } else {
            res.status(200).send({intentId: intent.id, status: intent.status})
        }
    });
}

exports.createPaymentIntent = async (req, res) => {
    const payInfo = await calculatePaymentAmount(
                          req.body.expId, 
                          req.body.bookType, 
                          +req.body.numGuests
                    );
    await stripe.paymentIntents.create({
        amount: payInfo.amount,
        currency: payInfo.currency,
        application_fee_amount: payInfo.rambleFee,
        capture_method: 'manual',
        transfer_data: {
            destination: req.body.transferId
        },
        metadata: {
            creatorId: req.body.creatorId,
            clientId: req.userId
        }
    }).then((payIntent) => {
        try {
            return res.send({clientSecret: payIntent.client_secret});
        } catch(err) {
            return res.status(500).send({ err });
        }
    }).catch(err => res.status(500).send({ err }));
}

exports.stripeWebhook = async (req, res) => {
    const sign = req.headers['stripe-signature'];
    let event;

    try {
        event = stripe.webhooks.constructEvent(
                    req.rawBody, 
                    sign, 
                    process.env.STRIPE_WEBHOOK_SECRET
                );
    } catch (err) {
        return res.status(400).send(`Webhook Error: ${err.message}`);
    }

    let message;
    switch(event.type) {
        case 'payment_intent.succeeded':
            message = handlers.handleSuccessfulPaymentIntent(event.data.object);  
            break;
        case 'payment_intent.canceled': 
            message = handlers.handleCancelledPaymentIntent(event.data.object);  
            break;
        default:
            return res.status(400).end(); //Unexpected event type
    }

    //Acknowledge receipt of the event
    res.status(200).send({received: true, message});
}