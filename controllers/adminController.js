const passport = require('passport'),
      {generateAccessToken} = require('../../middleware/JWTMiddleware'),
      Admin = require('../models/admin');

exports.registerAdmin = (req, res, next) => {
    Admin.create({ 
        username: req.body.username,
        password: req.body.password
    }).then(admin => {
        req.login(admin, err => {
            if(err) { 
                res.status(404).send({error: 'Admin registration error'}); 
            } else { 
                const token = generateAccessToken(user._id, true, '1h');
                res.status(201).send({ token });
            }
        });
    }).catch(err => { next(err); });
}

//Login with email
exports.loginAdmin = (req, res) => {
    const token = generateAccessToken(req.user._id, true, '1h');
    res.status(200).send({ token });
}