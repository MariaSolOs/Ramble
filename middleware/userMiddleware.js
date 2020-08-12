const User = require('../models/user'),
      Admin = require('../models/admin');

exports.identifyUser = async (req, res, next) => {
    try {
        let user;
        if(req.isAdmin) {
            user = await Admin.findById(req.userId);
        } else {
            user = await User.findById(req.userId);
        }
        if(!user) {
            return res.status(401).send({err: "User couldn't be identified."});
        }
        req.user = user;
        next();
    } catch(err) {
        res.status(401).send({err: "User couldn't be identified."});
    }
}
