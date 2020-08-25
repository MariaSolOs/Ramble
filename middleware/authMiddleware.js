const {generateAccessToken} = require('../helpers/JWTHelpers');

exports.redirectUserWithCookie = (req, res) => {
    const token = generateAccessToken(req.user._id, false, '12h');
    res.cookie('token', token);
    res.redirect(process.env.CLIENT_URL);
}

exports.sendToken = (req, res) => {
    const tokenExpire = req.isAdmin? '1h' : '12h';
    const token = generateAccessToken(req.user._id, req.isAdmin, tokenExpire);
    res.status(200).send({ token });
}

exports.cookieFromEmailLink = (req, res, next) => {
    const token = generateAccessToken(req.params.userId, false, '12h');
    req.token = token;
    res.cookie('token', token);
    next();
}
