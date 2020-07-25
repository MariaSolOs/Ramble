const jwt = require('jsonwebtoken');

const generateAccessToken = (userId) => {
    //Expires in 12 hours
    return jwt.sign({userId}, process.env.JWT_SECRET, {expiresIn: '12h'});
}

const authenticateToken = (req, res, next) => {
    //Gather the jwt access token from the request header
    const authHeader = req.headers['authorization'];
    const token = authHeader && authHeader.split(' ')[1];
    if(!token) {
        return res.status(401).send({ error: "Couldn't find token." });
    }
    jwt.verify(token, process.env.JWT_SECRET, (err, decoded) => {
        if(err) { 
            return res.status(401).send({ error: "Couldn't verify token" });
        } 
        //Set userId in req and remaining time from token
        req.userId = decoded.userId;
        const now = new Date().valueOf() / 1000;
        timeRemaining = (decoded.exp  - now) / 3600;
        //Refresh token if it will expire soon
        if(timeRemaining <= 1) {
            const token = generateAccessToken(req.userId);
            res.cookie('token', token);
        }
        next(); 
    });
}

exports.generateAccessToken = generateAccessToken;
exports.authenticateToken = authenticateToken;