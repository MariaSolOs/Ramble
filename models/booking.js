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
    bookType: {
        type: String,
        required: true,
        enum: ['public', 'private']
    },
    stripe: {
        paymentIntentId: String, 
        cardToUse: String,
        paymentCaptured: { //True after the creator approves it
            type: Boolean,
            required: true,
        },
        creatorProfit: Number, //This is in whatever units Stripe uses
        promoCode: {
            type: String,
            default: ''
        },
        rambleGain: Number,
        taxGST: Number,
        taxQST: Number
    }
}, {timestamps: true});
  
module.exports = mongoose.model('Booking', BookingSchema);
