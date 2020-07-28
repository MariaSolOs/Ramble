const User = require('../models/user'),
      Admin = require('../models/admin');

exports.findUser = async (req, res, next) => {
    let user;
    if(req.isAdmin) {
        user = await Admin.findById(req.userId);
    } else {
        user = await User.findById(req.userId);
    }
    if(!user) {
        return res.status(400).send({err: "Couldn't find user."});
    }
    req.user = user;
    next();
}
