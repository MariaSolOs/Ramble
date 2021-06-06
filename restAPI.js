const express = require('express');
const { generateToken } = require('./utils/jwt');
const { sendPasswordResetEmail } = require('./utils/email');
const { User } = require('./models');

const router = express.Router();

// Send email to user for resetting their password
router.post('/password-reset', (req, res) => {
    User.findOne({ 'email.address': req.body.email })
    .select('-savedExperiences -bookedExperiences -creator _id')
    .then(user => {
        if (!user) {
            return res.status(404).send({ 
                message: "There's no account associated to that email." 
            });
        }
        return sendPasswordResetEmail(user._id, req.body.email)
    })
    .then(() => {
        return res.status(201).send({ message: 'Reset email sent' });
    })
    .catch(() => {
        return res.status(500).send({
            message: 'Something went wrong...'
        });
    });
});

// Manages password-reset email link
router.get('/email/password-reset/:userId', (req, res) => {
    const token = generateToken(req.params.userId, '1d');
    res.cookie('ramble-reset_token', token);
    res.redirect(process.env.CLIENT_URL);
});

module.exports = router;