const User = require('../models/user'),
      {generateAccessToken} = require('../middleware/JWTMiddleware');

exports.findUser = (req, res, next) => {
    User.findById(req.userId, (err, user) => {
        if(err || !user) { 
            return res.status(404).send({error: "Couldn't find user."}) ;
        }
        req.user = user;
        next();
    });
}

exports.redirectWithCookie = (req, res) => {
    const token = generateAccessToken(req.userId, false, '12h');
    res.cookie('token', token);
    return res.redirect(`${process.env.CLIENT_URL}`);
}