import { Router } from 'express';

import { generateToken } from './utils/jwt';
import { sendPasswordResetEmail } from './utils/email';
import { User } from './mongodb-models';
import { LEAN_DEFAULTS } from './server-types';

const router = Router();

// Send email to user for resetting their password
router.post('/password-reset', async (req, res) => {
    const user = await User.findOne({ 
        emailAddress: req.body.email 
    }, '_id').lean(LEAN_DEFAULTS);

    if (!user) {
        return res.status(422).send({
            message: "There's no account associated to that email." 
        });
    }
    
    await sendPasswordResetEmail(user._id.toHexString(), req.body.email);
    return res.status(201).send({ message: 'Reset email sent' });
});

// Manages password-reset email link
router.get('/password-reset/:userId', (req, res) => {
    const token = generateToken(req.params.userId);
    res.cookie('ramble-reset_token', token);
    res.redirect(process.env.CLIENT_URL!);
});

// Redirects creators to their dashboard to accept bookings
router.get('/creator-requests/:userId', (req, res) => {
    const token = generateToken(req.params.userId);
    res.cookie('ramble-server_cookie', token);
    res.redirect(`${process.env.CLIENT_URL!}/creator/dashboard/booking-requests`);
});

export default router;