const User = require('../models/user'),
      Creator = require('../models/creator'),
      Experience = require('../models/experience');

const matchStripeState = (req, res, next) => {
    const stripeToken = req.query.state;
    jwt.verify(stripeToken, process.env.JWT_SECRET, (err, decoded) => {
        if(err) { 
            return res.status(403).send({ error: "Couldn't verify token" });
        } 
        //Set userId in req and remaining time from token
        req.match = true;
        next(); 
    });
}

const updateUserToCreator = async (stripeId, user) => {
    try {
        const newCreator = new Creator({
            name: user.fstName,
            photo: user.photo,
            'stripe.userId': stripeId
        });
        await newCreator.save();
        return User.findByIdAndUpdate(user._id, 
               {creatorId: newCreator._id}, 
               {new: true});
    } catch(err) {
        console.log("Couldn't upgrade user to creator.");
        return;
    }
}

const calculatePaymentAmount = async (expId, bookType, numGuests) => {
    try {
        const exp = await Experience.findById(expId);
        let amount;
        if(bookType === 'public') {
            amount = exp.price.perPerson * numGuests * 100;
        } else if(bookType === 'private') {
            amount == exp.price.private * 100;
        } else {
            throw Error('Invalid booking type.');
        }
        //Price is multiplied by 100 to use cents
        return {
            amount: amount,
            currency: exp.price.currency,
            rambleFee: amount * 0.15
        }
    } catch(err) {
        throw Error(`Couldn't calculate amount: ${err}`);
    }
}

exports.matchStripeState = matchStripeState;
exports.updateUserToCreator = updateUserToCreator;
exports.calculatePaymentAmount = calculatePaymentAmount;