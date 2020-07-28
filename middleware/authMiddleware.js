const {generateAccessToken} = require('../helpers/JWTHelpers');

exports.redirectUserWithCookie = (req, res) => {
    const token = generateAccessToken(req.userId, false, '12h');
    res.cookie('token', token);
    return res.redirect(`${process.env.CLIENT_URL}`);
}

exports.sendToken = (req, res) => {
    const tokenExpire = req.isAdmin? '1h' : '12h';
    const token = generateAccessToken(req.userId, req.isAdmin, tokenExpire);
    res.status(200).send({ token });
}
