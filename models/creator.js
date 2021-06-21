const mongoose = require('mongoose');

const CreatorSchema = new mongoose.Schema({
    user: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
    },

    // True if we verified their government ID
    verified: {
        type: Boolean,
        required: true
    },

    governmentIds: {
        type: [String],
        required: true
    },

    bio: {
        type: String,
        required: true
    },

    stripe: {
        accountId: String,
        // True if they completed Stripe's onboarding
        onboarded: Boolean
    },

    bookingRequests: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Booking'
    }]
});
  
module.exports = mongoose.model('Creator', CreatorSchema);
