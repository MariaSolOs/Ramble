import { Router } from 'express';
import Stripe from 'stripe';

import { generateToken } from './utils/jwt';
import { sendPasswordResetEmail } from './utils/email';
import { User, Creator } from './mongodb-models';

const router = Router();

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY!, {
    apiVersion: '2020-08-27'
});

const LEAN_DEFAULTS = { defaults: true } as const;

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

// Initialize Stripe onboarding for creators
router.post('/stripe-onboarding', async (req, res) => {
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
        refresh_url: `${process.env.SERVER_URL}/stripe-onboarding/refresh/${creatorId}`,
        return_url: `${process.env.SERVER_URL}/stripe-onboarding/return/${creatorId}`,
        type: 'account_onboarding'
    });
    
    // Redirect them to Stripe
    res.status(201).send({ redirectUrl: accountLink.url });
});

// Refresh the Stripe onboarding link
router.get('/stripe-onboarding/refresh/:creatorId', async (req, res) => {
    const { creatorId } = req.params;
    const creator = await Creator.findById(creatorId, 'stripe').lean(LEAN_DEFAULTS);

    const accountLink = await stripe.accountLinks.create({
        account: creator?.stripe.accountId || '',
        refresh_url: `${process.env.SERVER_URL}/stripe-onboarding/refresh/${creatorId}`,
        return_url: `${process.env.SERVER_URL}/stripe-onboarding/return/${creatorId}`,
        type: 'account_onboarding'
    });

    // Redirect them to Stripe again
    res.redirect(accountLink.url);
}); 

// Handle Stripe onboarding return
router.get('/stripe-onboarding/return/:creatorId', async (req, res) => {
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
    const token = generateToken(creator.user.toHexString(), '1d');
    res.cookie('ramble-server_cookie', token);
    res.redirect(process.env.CLIENT_URL!);
});

export default router;