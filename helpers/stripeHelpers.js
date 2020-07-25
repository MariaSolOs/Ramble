const User = require('../models/user'),
      Creator = require('../models/creator'),
      Experience = require('../models/experience'),
      Occurrence = require('../models/occurrence'),
      Booking = require('../models/booking');

exports.updateUserToCreator = async (stripeId, user) => {
    try {
        const newCreator = new Creator({
            name: user.fstName,
            photo: user.photo,
            'stripe.id': stripeId
        });
        await newCreator.save();
        return User.findByIdAndUpdate(user._id, 
               {creator: newCreator._id}, 
               {new: true});
    } catch(err) {
        return console.log("Couldn't upgrade user to creator.");
    }
}

exports.calculatePaymentAmount = async (expId, bookType, numGuests) => {
    try {
        const exp = await Experience.findById(expId);
        let amount;
        if(bookType === 'public') {
            amount = exp.price.perPerson * numGuests * 100;
        } else if(bookType === 'private') {
            amount == exp.price.private * 100;
        } else {
            throw new Error('Invalid booking type.');
        }
        //Price is multiplied by 100 to use cents
        return {
            amount: amount,
            currency: exp.price.currency,
            rambleFee: amount * 0.15
        }
    } catch(err) {
        throw new Error(`Couldn't calculate amount: ${err}`);
    }
}

exports.handleSuccessfulPaymentIntent = async (paymentIntent) => {
    console.log(paymentIntent);
    try {
        const booking = Booking.find({
            'stripe.id': paymentIntent.id, 
            'stripe.status': 'pending'
        }).populate('occurrence');
        if(!booking) { return; }
        booking.stripe.status = 'confirmed';
        booking.occurrence.spotsLeft -= booking.numPeople;
        booking.occurrence.bookings.push(booking);
        await booking.occurrence.save();
        await booking.save();
        console.log(booking, booking.occurrence);
        return 'Successfully added booking to occurrence';
    } catch(err) {
        return `Failed to handle payment intent: ${err}.`;
    }
    //TODO: Add occurrence to booking here
}