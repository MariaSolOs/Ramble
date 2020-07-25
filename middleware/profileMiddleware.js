const User = require('../models/user');

exports.findUser = (req, res, next) => {
    User.findById(req.userId, (err, user) => {
        if(err || !user) { 
            return res.status(404).send({error: "Couldn't find user."}) ;
        }
        req.user = user;
        next();
    });
}