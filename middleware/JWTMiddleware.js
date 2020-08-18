const jwt = require('jsonwebtoken'),
      {generateAccessToken} = require('../helpers/JWTHelpers');

exports.authenticateToken = (req, res, next) => {
    let token;
    //Gather the jwt access token from the request header
    const authHeader = req.headers['authorization'];
    token = authHeader && authHeader.split(' ')[1];
    if(!token) {
        return res.status(401).send({ error: 'Unauthorized.' });
    }
    jwt.verify(token, process.env.JWT_SECRET, {issuer: 'RAMBLE:API'},
    (err, decoded) => {
        if(err) { 
            return res.status(401).send({ error: 'Unauthorized.' });
        } 
        //Set userId, admin status and token in req 
        req.userId = decoded.userId;
        req.isAdmin = decoded.isAdmin;
        req.token = token;
        //For regular users tokens are refreshed
        if(!decoded.isAdmin) {
            const now = new Date().valueOf() / 1000;
            timeRemaining = (decoded.exp  - now) / 3600;
            //Refresh token if it will expire soon
            if(timeRemaining <= 1) {
                const newToken = generateAccessToken(req.userId, false, '12h');
                req.token = newToken;
            }
        }
        next(); 
    });
}

exports.validateStripeState = (req, res, next) => {
    const stripeState = req.query.state;
    jwt.verify(stripeToken, process.env.JWT_SECRET, (err, decoded) => {
        if(err) { 
            res.status(401).send({error: `Invalid state parameter: ${stripeState}`});
        } else {
            req.userId = decoded.userId;
            next(); 
        }
    });
}