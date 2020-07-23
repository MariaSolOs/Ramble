const mongoose = require('mongoose');

const BookingSchema = new mongoose.Schema({
    occId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Occurrence',
        required: true
    },
    numPeople: {
        type: Number,
        required: true,
        min: 1
    }
});
//TODO: Add stripe info here
  
module.exports = mongoose.model('Booking', BookingSchema);
