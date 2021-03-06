const { generateAccessToken } = require('../helpers/JWTHelpers');

const User = require('../models/user');

exports.updateCreatorCalendar = (req, res) => {
    res.redirect(`${process.env.CLIENT_URL}/creator/schedule/${
    req.query.exp}`);
}

exports.reviewBookingRequest = (req, res) => {
    res.redirect(`${process.env.CLIENT_URL}/creator/dashboard/bookings-requests`);
}

exports.connectWithStripe = (req, res) => {
    res.redirect(`https://connect.stripe.com/oauth/authorize?response_type=code&client_id=${
    process.env.STRIPE_CLIENT_ID}&scope=read_write&state=${req.token}&redirect_uri=${
    process.env.STRIPE_OAUTH_REDIRECT}`);
}

exports.verifyEmailAddress = (req, res) => {
    User.findByIdAndUpdate(req.params.userId, {'email.verified': true},
    (err, user) => {
        if(!err && user) {
            res.cookie('emailVerifiedDate', new Date().toISOString());
        }
        res.redirect(process.env.CLIENT_URL);
    });
}

exports.resetPassword = (req, res) => {
    res.cookie('resetToken', req.params.userId);
    res.redirect(process.env.CLIENT_URL);
}