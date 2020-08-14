const stripe = require('stripe')(process.env.STRIPE_SECRET_KEY),
      handlers = require('../helpers/stripeWebhookHandlers'),
      {calculatePaymentAmount} = require('../helpers/bookingHelpers');

const User = require('../models/user');

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

exports.addCustomer = async (req, res) => {
    try {
        const user = await User.findById(req.userId, 'fstName lstName email stripe');
        //If the user doesn't have any saved cards,
        if(!user.stripe.customerId) {
            const customer = await stripe.customers.create({
                name: `${user.fstName} ${user.lstName}`,
                email: user.email
            });
            user.stripe.customerId = customer.id;
            await user.save();
        }
        res.status(201).send({
            customerId: user.stripe.customerId
        });
    } catch(err) {
        res.status(409).send({err: "Couldn't create Stripe customer."});
    }
}

exports.attachPaymentMethod = async (req, res) => {
    try {
        const user = await User.findById(req.userId, 'fstName lstName email stripe');
        //If the user doesn't have any saved cards,
        if(!user.stripe.customerId) {
            await stripe.customers.create({
                name: `${user.fstName} ${user.lstName}`,
                email: user.email,
                payment_method: req.body.paymentMethodId
            });
        } else {
            await stripe.paymentMethods.attach(
                req.body.paymentMethodId, {customer: user.stripe.customerId}
            );
        }
        await user.save();
        return res.status(201).send({message: 'Payment method created.'});
    } catch(err) {
        res.status(409).send({err: "Couldn't add payment method."});
    }
}

exports.detachPaymentMethod = (req, res) => {
    stripe.paymentMethods.detach(req.body.paymentMethodId)
    .then(() => {
        res.status(200).send({message: 'Payment method detached.'});
    })
    .catch((err)=> {
        res.status(409).send({err: "Couldn't detach payment method."});
    });
}

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

//Deal with payments using a saved card from the client
exports.payWithSavedCard  = async (req, res) => {
    try {
        console.log(req.body)
        const paymentIntent = await stripe.paymentIntents.create({
            amount: +req.body.amount,
            application_fee_amount: (+req.body.amount) * 0.15,
            currency: req.body.currency,
            customer: req.body.customerId,
            payment_method: req.body.payMethodId,
            error_on_requires_action: true,
            confirm: true,
            transfer_data: {
                destination: req.body.transferId
            },
            metadata: {
                creatorId: req.body.creatorId,
                clientId: req.userId,
                bookingId: req.body.bookingId
            }
        });
        console.log(paymentIntent)
        return res.status(201).send({message: 'Payment intent created.'});
    } catch(err) {
        console.log(err);
        //TODO: Handle error here
    }
}

//Creating payment intents
exports.createPaymentIntent = async (req, res) => {
    try {
        //Calculate prices
        const payInfo = await calculatePaymentAmount(
            req.body.expId, 
            req.body.bookType, 
            +req.body.numGuests
        );

        //Add the customer ID if applicable
        const customerDetails = { 
            customer: req.body.customerId 
        }

        //Create payment intent
        const payIntent = await stripe.paymentIntents.create({
            amount: payInfo.amount,
            currency: payInfo.currency,
            application_fee_amount: payInfo.rambleFee,
            transfer_data: {
                destination: req.body.transferId
            },
            capture_method: 'manual',
            metadata: {
                creatorId: req.body.creatorId,
                clientId: req.userId
            },
            ...customerDetails
        });
        return res.send({clientSecret: payIntent.client_secret});
    } catch(err) {
        res.status(500).send(err);
    }
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