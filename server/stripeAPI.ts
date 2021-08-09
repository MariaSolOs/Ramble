import express, { Router } from 'express';
import Stripe from 'stripe';
import { Types } from 'mongoose';

import { generateToken, verifyToken } from './utils/jwt';
import { computeBookingFees } from './utils/booking';
import { 
    handleSuccessfulPaymentIntent, 
    handleCanceledPaymentIntent 
} from './utils/stripe-webhook-handlers';
import { Booking, User, Creator, Experience } from './mongodb-models';
import { LEAN_DEFAULTS, STRIPE_API_VERSION } from './server-types';
import type { Creator as CreatorType } from './mongodb-models/creator';

const router = Router();

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY!, {
    apiVersion: STRIPE_API_VERSION
});

// Initialize Stripe onboarding for creators
router.post('/onboarding', async (req, res) => {
    const { creatorId } = req.body;

    // Get creator data
    const creator = await Creator.findById(creatorId, 'user stripe');
    if (!creator) {
        return res.status(422).send({
            message: "Creator account not found." 
        });
    }

    let accountId = creator.stripe.accountId;
    if (!accountId) {
        // Create Stripe account if they don't have one already
        const account = await stripe.accounts.create({
            type: 'standard'
        });

        // Save account ID
        accountId = account.id;
        creator.stripe.accountId = account.id;
        await creator.save();
    }

    // Create account link
    const accountLink = await stripe.accountLinks.create({
        account: accountId,
        refresh_url: `${process.env.SERVER_URL}/stripe/onboarding-refresh/${creatorId}`,
        return_url: `${process.env.SERVER_URL}/stripe/onboarding-return/${creatorId}`,
        type: 'account_onboarding'
    });
    
    // Redirect them to Stripe
    res.status(201).send({ redirectUrl: accountLink.url });
});

// Refresh the Stripe onboarding link
router.get('/onboarding-refresh/:creatorId', async (req, res) => {
    const { creatorId } = req.params;
    const creator = await Creator.findById(creatorId, 'stripe').lean(LEAN_DEFAULTS);

    const accountLink = await stripe.accountLinks.create({
        account: creator?.stripe.accountId || '',
        refresh_url: `${process.env.SERVER_URL}/stripe/onboarding-refresh/${creatorId}`,
        return_url: `${process.env.SERVER_URL}/stripe/onboarding-return/${creatorId}`,
        type: 'account_onboarding'
    });

    // Redirect them to Stripe again
    res.redirect(accountLink.url);
}); 

// Handle Stripe onboarding return
router.get('/onboarding-return/:creatorId', async (req, res) => {
    const { creatorId } = req.params;

    // Get creator data
    const creator = await Creator.findById(creatorId, 'user stripe');
    if (!creator) {
        return res.status(422).send({
            message: "Creator account not found." 
        });
    }
    
    // Check if they completed the onboarding
    const { details_submitted } = await stripe.accounts.retrieve(
        creator.stripe.accountId!
    );

    if (details_submitted) {
        // Creator signed up with Stripe
        creator.stripe.onboarded = true;
        await creator.save();
    } else {
        // Show them a message
        res.cookie('ramble-server_message', "It seems like you couldn't complete your Stripe onboarding! If you need help, please let us know.");
    }

    // Redirect them to the website
    const token = generateToken((creator.user as Types.ObjectId).toHexString());
    res.cookie('ramble-server_cookie', token);
    res.redirect(process.env.CLIENT_URL!);
});

// Create a payment intent
router.post('/payment-intent', async (req, res) => {
    const { experienceId, bookingType, numGuests } = req.body;

    // Get the experience information
    const experience = await Experience.findById(
        experienceId, 'creator price zoomInfo'
    ).lean(LEAN_DEFAULTS).populate('creator', 'stripe');
    if (!experience) {
        return res.status(422).send({ error: 'Experience not found.' });
    }

    // Get the booking price
    const isInPersonExperience = !Boolean(experience.zoomInfo?.PMI);
    const fees = computeBookingFees(
        isInPersonExperience,
        bookingType,
        +numGuests,
        experience.price.perPerson,
        experience.price.private
    );

    // Create and send the client secret
    const paymentIntent = await stripe.paymentIntents.create({
        payment_method_types: ['card'],
        amount: fees.amount,
        currency: experience.price.currency,
        application_fee_amount: fees.application_fee_amount,
        capture_method: 'manual',
        transfer_data: {
            destination: (experience.creator as CreatorType).stripe.accountId!
        },
        metadata: { // For Phil's accountability
            subtotal: fees.withServiceFee,
            serviceFee: fees.serviceFee,
            taxGST: fees.taxGST,
            taxQST: fees.taxQST
        }
    });

    return res.status(201).send({ 'clientSecret': paymentIntent.client_secret });
});

// Capture/cancel a payment intent
router.post('/payment-intent/:action', async (req, res) => {
    try {
        const { action } = req.params;
        const { bookingId, token } = req.body;

        const { userId } = verifyToken(token);
        const user = await User.findById(userId, 'creator').lean(LEAN_DEFAULTS);
        const booking = await Booking.findById(bookingId, 'stripe').lean(LEAN_DEFAULTS);

        if (!booking || !user) {
            return res.status(422).send({ message: 'Invalid input.' });
        }

        // Remove request from creator's list
        await Creator.findByIdAndUpdate(user.creator, { 
            $pull: { bookingRequests: Types.ObjectId(bookingId) } 
        });

        // Capture/cancel the intent
        const intentId = booking.stripe.paymentIntentId;
        if (action === 'capture') {
            await stripe.paymentIntents.capture(intentId);
        } else if (action === 'cancel') {
            await stripe.paymentIntents.cancel(intentId);
        } else {
            return res.status(400).send({ error: 'Invalid action.' });
        }

        return res.status(200).send({ message: 'Payment intent processed.' });
    } catch (err: any) {
        return res.status(500).send({ error: err.message });
    }
});

// Stripe webhook
router.post('/webhook', express.raw({ type: 'application/json' }), (req, res) => {
    const signature = req.headers['stripe-signature']!;
    let event: Stripe.Event;

    // Construct the event
    try {
        event = stripe.webhooks.constructEvent(
            req.body, 
            signature, 
            process.env.STRIPE_WEBHOOK_SECRET!
        );
    } catch (err: any) {
        return res.status(400).send({ error: err.message });
    }

    // Based on its type, do what we need to do
    switch (event.type) {
        case 'payment_intent.succeeded': {
            const payload = event.data.object as Stripe.PaymentIntent;
            handleSuccessfulPaymentIntent(payload);
            break;
        }
        case 'payment_intent.canceled': {
            const payload = event.data.object as Stripe.PaymentIntent;
            handleCanceledPaymentIntent(payload);
            break;
        }
        default:
            console.log(`[Stripe webhook] Unhandled event type ${event.type}`);
    }

    res.status(201).json({ received: true });
});

export default router;