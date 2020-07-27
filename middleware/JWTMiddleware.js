const jwt = require('jsonwebtoken');

exports.generateAccessToken = (userId, isAdmin, expireTime) => {
    return jwt.sign({
        userId, 
        isAdmin
    }, 
    process.env.JWT_SECRET, 
    {   expiresIn: expireTime, 
        issuer: 'RAMBLE:API'    }
    );
}

exports.authenticateToken = (req, res, next) => {
    //Gather the jwt access token from the request header
    const authHeader = req.headers['authorization'];
    const token = authHeader && authHeader.split(' ')[1];
    if(!token) {
        return res.status(401).send({ error: "Couldn't find token." });
    }
    jwt.verify(token, process.env.JWT_SECRET, {issuer: 'RAMBLE:API'},
    (err, decoded) => {
        if(err) { 
            return res.status(401).send({ error: "Couldn't verify token." });
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
                const token = generateAccessToken(req.userId);
                res.cookie('token', token);
            }
        }
        next(); 
    });
}

exports.validateStripeState = (req, res, next) => {
    const stripeToken = req.query.state;
    jwt.verify(stripeToken, process.env.JWT_SECRET, (err, decoded) => {
        if(err) { 
            return res.status(403).json({error: `Incorrect state parameter: ${state}`});
        } 
        req.userId = decoded.userId;
        next(); 
    });
}