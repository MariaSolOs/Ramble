const {generateAccessToken} = require('../middleware/JWT');

exports.sendTokenInRes = (req, res) => {
    const token = generateAccessToken(req.user._id);
    res.status(200).send({ token });
}