const mongoose = require('mongoose');

const CreatorSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true
    },
    photo: {
        type: String, 
        default: 'https://res.cloudinary.com/dxod7etqu/image/upload/c_scale,q_31,w_503/v1592335146/Ramble/Users/noPicUser.jpg'
    },
    bio: String,
    stripe: {
        id: { 
            type: String, required: true
        }
    }
});
  
module.exports = mongoose.model('Creator', CreatorSchema);
