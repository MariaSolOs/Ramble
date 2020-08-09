const mongoose = require('mongoose');

const CreatorSchema = new mongoose.Schema({
    user: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User'
    },
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
        id: { type: String }
    },
    bookingRequests: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Booking'
    }]
});
  
module.exports = mongoose.model('Creator', CreatorSchema);
