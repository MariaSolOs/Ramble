const jwt = require('jsonwebtoken');

exports.generateToken = (userId, expireTime) => {
    return jwt.sign(
        { 
            id: userId
        }, 
        process.env.JWT_SECRET, 
        {
            expiresIn: expireTime,
            issuer: 'rambleAPI'
        }
    );
}