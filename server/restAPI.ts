import { Router } from 'express';
import Stripe from 'stripe';
import { Types } from 'mongoose';

import { generateToken } from './utils/jwt';
import { sendPasswordResetEmail } from './utils/email';
import { computeBookingFees } from './utils/booking';
import { User, Creator, Experience } from './mongodb-models';
import { LEAN_DEFAULTS, STRIPE_API_VERSION } from './server-types';
import type { Creator as CreatorType } from './mongodb-models/creator';

const router = Router();

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY!, {
    apiVersion: STRIPE_API_VERSION
});

// Send email to user for resetting their password
router.post('/password-reset', async (req, res) => {
    const user = await User.findOne({ 
        'email.address': req.body.email 
    }, '_id').lean(LEAN_DEFAULTS);

    if (!user) {
        return res.status(404).send({
            message: "There's no account associated to that email." 
        });
    }
    
    await sendPasswordResetEmail(user._id.toHexString(), req.body.email);
    return res.status(201).send({ message: 'Reset email sent' });
});

// Manages password-reset email link
router.get('/email/password-reset/:userId', (req, res) => {
    const token = generateToken(req.params.userId, '1d');
    res.cookie('ramble-reset_token', token);
    res.redirect(process.env.CLIENT_URL!);
});

// Redirects creators to their dashboard to accept bookings
router.get('/email/creator-requests/:userId', (req, res) => {
    const token = generateToken(req.params.userId, '1d');
    res.cookie('ramble-reset_token', token);
    res.redirect(`${process.env.CLIENT_URL!}/creator/dashboard/booking-requests`);
});

// Initialize Stripe onboarding for creators
router.post('/stripe/onboarding', async (req, res) => {
    const { creatorId } = req.body;

    // Get creator data
    const creator = await Creator.findById(creatorId, 'user stripe');
    if (!creator) {
        return res.status(500).send({
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
router.get('/stripe/onboarding-refresh/:creatorId', async (req, res) => {
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
router.get('/stripe/onboarding-return/:creatorId', async (req, res) => {
    const { creatorId } = req.params;

    // Get creator data
    const creator = await Creator.findById(creatorId, 'user stripe');
    if (!creator) {
        return res.status(500).send({
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
    const token = generateToken((creator.user as Types.ObjectId).toHexString(), '1d');
    res.cookie('ramble-server_cookie', token);
    res.redirect(process.env.CLIENT_URL!);
});

// Create a payment intent
router.post('/stripe/payment-intent', async (req, res) => {
    const { experienceId, bookingType, numGuests } = req.body;

    // Get the experience information
    const experience = await Experience.findById(
        experienceId, 'creator price zoomInfo'
    ).lean(LEAN_DEFAULTS).populate('creator', 'stripe');
    if (!experience) {
        return res.status(500).send({ error: 'Experience not found.' });
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

export default router;