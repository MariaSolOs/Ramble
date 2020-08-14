const Creator = require('../models/creator'),
      Occurrence = require('../models/occurrence'),
      Booking = require('../models/booking');

exports.handleSuccessfulPaymentIntent = async (intent) => {
    try {
        //Find booking
        let booking; 
        if(intent.metadata.bookingId) {
            booking = await Booking.findById(intent.metadata.bookingId)
                      .populate('occurrence');
        } else {
            booking = await Booking.findOne({'stripe.paymentIntentId': intent.id})
                      .populate('occurrence');
        }
        if(!booking) { 
            return 'No booking found with a matching intent ID'; 
        }

        //Update occurrence and creator's requests
        booking.occurrence.creatorProfit += booking.stripe.creatorProfit;
        booking.stripe.paymentCaptured = true;
        await booking.occurrence.save();
        await booking.save();
        await Creator.findByIdAndUpdate(intent.metadata.creatorId, 
              {$pull: {bookingRequests: booking._id}});

        return 'Successfully handled payment intent.';
    } catch(err) {
        return `Failed to handle payment intent: ${err}.`;
    }
}

exports.handleCancelledPaymentIntent = async (intent) => {
    try {
        //Find booking
        const booking = await Booking.findOneAndDelete(
                            {'stripe.paymentIntentId': intent.id}
                        );
        if(!booking) { 
            return 'No booking found with a matching intent ID'; 
        }
        //Update occurrence and creator's requests
        await Creator.findByIdAndUpdate(intent.metadata.creatorId, 
              {$pull: {bookingRequests: booking._id}});
        await Occurrence.findByIdAndUpdate(booking.occurrence, {
            $pull: {bookings: booking._id},
            $inc: {spotsLeft: booking.numPeople}
        });

        return 'Successfully cancelled payment intent.';
    } catch(err) {
        return `Failed to cancel payment intent: ${err}.`;
    }
}