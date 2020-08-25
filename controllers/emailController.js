exports.updateCreatorCalendar = (req, res) => {
    res.redirect(`${process.env.CLIENT_URL}/creator/dashboard/calendar`);
}

exports.connectWithStripe = (req, res) => {
    res.redirect(`https://connect.stripe.com/oauth/authorize?response_type=code&client_id=${
    process.env.STRIPE_CLIENT_ID}&scope=read_write&state=${req.token}&redirect_uri=${
    process.env.STRIPE_OAUTH_REDIRECT}`);
}