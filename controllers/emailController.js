const User = require('../models/user');

exports.updateCreatorCalendar = (req, res) => {
    res.redirect(`${process.env.CLIENT_URL}/creator/dashboard/${
    req.params.expId}/schedule`);
}

exports.connectWithStripe = (req, res) => {
    res.redirect(`https://connect.stripe.com/oauth/authorize?response_type=code&client_id=${
    process.env.STRIPE_CLIENT_ID}&scope=read_write&state=${req.token}&redirect_uri=${
    process.env.STRIPE_OAUTH_REDIRECT}`);
}

exports.verifyEmailAddress = (req, res) => {
    User.findByIdAndUpdate(req.params.userId, {'email.verified': true},
    (err, user) => {
        res.redirect(process.env.CLIENT_URL);
    });
}