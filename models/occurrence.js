const mongoose = require('mongoose');

const OccurrenceSchema = new mongoose.Schema({
    expId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Experience',
        required: true
    },
    date: {
        type: Date,
        required: true
    },
    timeslot: {
        type: String,
        required: true,
        validate: /\b((1[0-2]|[1-9])(:30)?([AP][M]))-((1[0-2]|[1-9])(:30)?([AP][M]))/
    },
    spotsLeft: {
        type: Number,
        min: 0
    },
    bookings: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Booking'
    }]
});
  
module.exports = mongoose.model('Occurrence', OccurrenceSchema);
