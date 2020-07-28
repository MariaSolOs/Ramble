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