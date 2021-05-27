const jwt = require('jsonwebtoken');

exports.generateToken = (userId, expireTime) => {
    return jwt.sign(
        { 
            userId,
            tokenExpiry: expireTime 
        }, 
        process.env.JWT_SECRET, 
        {
            expiresIn: expireTime,
            issuer: 'rambleAPI'
        }
    );
}