const mongoose = require('mongoose');

const OccurrenceSchema = new mongoose.Schema({
    experience: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Experience',
        required: true
    },

    dateStart: {
        type: Date,
        required: true
    },

    dateEnd: {
        type: Date,
        required: true
    },

    spotsLeft: {
        type: Number,
        required: true,
        min: 0
    },

    creatorProfit: { // Only takes into account confirmed bookings
        type: Number,
        required: true,
        min: 0
    },
    
    bookings: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Booking'
    }]
});
  
module.exports = mongoose.model('Occurrence', OccurrenceSchema);