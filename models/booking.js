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
    client: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        required: true
    },
    numPeople: {
        type: Number,
        required: true,
        min: 1
    },
    stripe: {
        id: {
            type: String,
            required: true,
        },
        status: {
            type: String,
            required: true,
            enum: ['pending', 'confirmed']
        },
        creatorProfit: Number //This is in whatever units Stripe uses
    }
}, {timestamps: true});
  
module.exports = mongoose.model('Booking', BookingSchema);
