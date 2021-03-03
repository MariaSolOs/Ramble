const mongoose = require('mongoose');

const CompanyReceiptSchema = new mongoose.Schema({
    creatorProfit: {
        type: Number,
        required: true
    }, 
    promoCode: {
        type: String,
        default: ''
    },
    rambleGain: {
        type: Number,
        required: true
    },
    taxGST: {
        type: Number,
        required: true
    },
    taxQST: {
        type: Number,
        required: true
    },
    experience: {
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
    client: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        required: true
    }
});

module.exports = mongoose.model('CompanyReceipt', CompanyReceiptSchema);