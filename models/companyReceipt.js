const mongoose = require('mongoose');

const CompanyReceiptSchema = new mongoose.Schema({
    booking: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Booking',
        required: true
    },

    total: {
        type: Number,
        required: true,
        min: 0
    }, 

    creatorProfit: {
        type: Number,
        required: true,
        min: 0
    },

    rambleProfit: {
        type: Number,
        required: true,
        min: 0
    },

    taxes: {
        GST: {
            type: Number,
            required: true,
            min: 0
        },
        QST: {
            type: Number,
            required: true,
            min: 0
        }
    }
}, {timestamps: true});
  
module.exports = mongoose.model('CompanyReceipt', CompanyReceiptSchema);
