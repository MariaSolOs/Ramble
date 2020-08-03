const Creator = require('../models/creator'),
      Experience = require('../models/experience'),
      Booking = require('../models/booking');

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

exports.handleSuccessfulPaymentIntent = async (intent) => {
    try {
        //Update booking status to confirmed
        const booking = await Booking.findOne({
            'stripe.id': intent.id, 
            'stripe.status': 'pending'
        }).populate('occurrence');
        if(!booking) { 
            return 'No booking found with a matching intent ID'; 
        }
        booking.stripe.status = 'confirmed';
        booking.stripe.creatorProfit = intent.amount_received - intent.application_fee_amount;
        //Add booking to occurrence and update
        booking.occurrence.spotsLeft -= booking.numPeople;
        booking.occurrence.bookings.push(booking);
        await booking.occurrence.save();
        await booking.save();
        //Add booking creator's requests
        const creator = await Creator.findById(intent.metadata.creatorId, 'bookingRequests');
        creator.bookingRequests.push(booking);
        await creator.save();
        return 'Successfully added booking to occurrence';
    } catch(err) {
        return `Failed to handle payment intent: ${err}.`;
    }
}