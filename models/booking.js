const mongoose = require('mongoose');

const BookingSchema = new mongoose.Schema({
    experience: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Experience',
        required: true
    },
    occurrence: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Occurrence',
        required: true
    },
    numPeople: {
        type: Number,
        required: true,
        min: 1
    },
    stripe: { //TODO: Make these fields required
        id: String,
        status: {
            type: String,
            enum: ['pending', 'confirmed']
        }
    }
});
  
module.exports = mongoose.model('Booking', BookingSchema);
