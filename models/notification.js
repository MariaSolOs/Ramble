const mongoose = require('mongoose');

const NotificationSchema = new mongoose.Schema({
    message: {
        type: String,
        required: true
    },
    user: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        required: true
    },
    category: {
        type: String,
        required: true,
        enum: ['Creator-ExperienceReminder', 'Creator-ExperienceDecision']
    }
}, {timestamps: true});
  
module.exports = mongoose.model('Notification', NotificationSchema);
