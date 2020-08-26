const mongoose = require('mongoose');

const ReviewSchema = new mongoose.Schema({
    body: {
        type: String,
        required: true
    },
    about: {
        type: mongoose.Schema.Types.ObjectId,
        required: true,
        refPath: 'onModel'
    },
    onModel: {
        type: String,
        required: true,
        enum: ['Experience']
    }
}, {timestamps: true});
  
module.exports = mongoose.model('Review', ReviewSchema);
