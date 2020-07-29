const mongoose = require('mongoose');

const CreatorSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true
    },
    photo: {
        type: String, 
        default: `https://res.cloudinary.com/${process.env.CLOUDINARY_CLOUD_NAME}/image/upload/c_scale,q_31,w_503/v1592335146/Ramble/Users/noPicUser.jpg`
    },
    bio: String,
    stripe: {
        id: { type: String, required: true }
    },
    bookingRequests: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Booking'
    }]
});
  
module.exports = mongoose.model('Creator', CreatorSchema);
