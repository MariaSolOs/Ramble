const stripe = require('stripe')(process.env.STRIPE_SECRET_KEY),
      handlers = require('../helpers/stripeWebhookHandlers'),
      {calculatePaymentAmount} = require('../helpers/experienceHelpers'),
      {ErrorHandler} = require('../helpers/errorHandler');

const User = require('../models/user');

exports.completeCreatorOnboarding = (req, res, next) => {
    const {code} = req.query;
    //Send the authorization code to Stripe's API
    stripe.oauth.token({grant_type: 'authorization_code', code})
    .then(async (response) => {
        //Add Stripe ID to creator
        const user = await User.findById(req.userId, 'creator')
                           .populate('creator', 'stripe');
        user.creator.stripe.accountId = response.stripe_user_id;
        await user.creator.save();

        return res.status(200).redirect(`${process.env.CLIENT_URL}/creator/dashboard/experiences`);
        }, (err) => {
            if (err.type === 'StripeInvalidGrantError') {
                next(new ErrorHandler(400, `Invalid authorization code: ${code}`));
            } else {
                next(new ErrorHandler(500, 'An unknown error occurred.'));
            }
        }
    );
}

exports.addCustomer = async (req, res, next) => {
    try {
        const user = await User.findById(req.userId, 'fstName lstName email stripe');
        //If the user doesn't have any saved cards,
        if(!user.stripe.customerId) {
            const customer = await stripe.customers.create({
                name: `${user.fstName} ${user.lstName}`,
                email: user.email.address
            });
            user.stripe.customerId = customer.id;
            await user.save();
        }
        res.status(201).send({
            customerId: user.stripe.customerId
        });
    } catch(err) {
        next(new ErrorHandler(409, err.message));
    }
}

exports.applyPromo = (req, res, next) => {
    User.find({'promoCode.code': req.body.code}, (err, users) => {
        if(!err && (users.length === 1)) {
            //Only one friend can use the promo code
            res.status(200).send({
                valid: users[0].promoCode.usedBy.length === 0
            });
        } else {
            next(new ErrorHandler(500, 'Promo cannot be applied.'));
        }
    });
}

exports.attachPaymentMethod = async (req, res, next) => {
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
        next(new ErrorHandler(409, err.message));
    }
}

exports.detachPaymentMethod = (req, res, next) => {
    stripe.paymentMethods.detach(req.body.paymentMethodId)
    .then(() => {
        res.status(200).send({message: 'Payment method detached.'});
    })
    .catch((err) => {
        next(new ErrorHandler(409, err.message));
    });
}

exports.capturePaymentIntent = (req, res, next) => {
    stripe.paymentIntents.capture(req.body.stripeId, (err, intent) => {
        if(err) {
            next(new ErrorHandler(500, err.message));
        } else {
            res.status(200).send({intentId: intent.id, status: intent.status})
        }
    });
}
exports.cancelPaymentIntent = (req, res, next) => {
    stripe.paymentIntents.cancel(req.body.stripeId, (err, intent) => {
        if(err) {
            next(new ErrorHandler(500, err.message));
        } else {
            res.status(200).send({intentId: intent.id, status: intent.status})
        }
    });
}

//Deal with payments using a saved card from the client
exports.payWithSavedCard  = async (req, res, next) => {
    try {
        const {amount, currency, application_fee_amount} = 
            await calculatePaymentAmount(
                req.body.expId,
                req.body.bookType,
                req.body.numGuests,
                req.body.promoCode
            );
        await stripe.paymentIntents.create({
            amount,
            currency,
            application_fee_amount,
            customer: req.body.customerId,
            payment_method: req.body.payMethodId,
            error_on_requires_action: true,
            confirm: true,
            transfer_data: {
                destination: req.body.transferId
            },
            metadata: {
                creatorId: req.body.creatorId,
                clientId: req.body.customerId,
                bookingId: req.body.bookingId
            }
        });
        return res.status(201).send({message: 'Payment intent created.'});
    } catch(err) {
        next(new ErrorHandler(500, err.message));
    }
}

//Creating payment intents
exports.createPaymentIntent = async (req, res, next) => {
    try {
        //Calculate prices
        const {amount, application_fee_amount, currency} = 
            await calculatePaymentAmount(
                req.body.expId, 
                req.body.bookType, 
                +req.body.numGuests,
                req.body.promoCode
            );

        //Add the customer ID if applicable
        const customerDetails = { 
            customer: req.body.customerId 
        }

        //Create payment intent
        const payIntent = await stripe.paymentIntents.create({
            amount,
            currency,
            application_fee_amount,
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
        next(new ErrorHandler(500, err.message));
    }
}

exports.stripeWebhook = async (req, res, next) => {
    const sign = req.headers['stripe-signature'];
    let event;

    try {
        event = stripe.webhooks.constructEvent(
                    req.rawBody, 
                    sign, 
                    process.env.STRIPE_WEBHOOK_SECRET
                );
    } catch (err) {
        return next(new ErrorHandler(400, err.message));
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