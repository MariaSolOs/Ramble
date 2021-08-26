"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = require("mongoose");
const mongoose_lean_defaults_1 = __importDefault(require("mongoose-lean-defaults"));
const bookingSchemaFields = {
    occurrence: {
        type: mongoose_1.Schema.Types.ObjectId,
        ref: 'Occurrence',
        required: true
    },
    bookingType: {
        type: String,
        required: true,
        enum: ['public', 'private']
    },
    numGuests: {
        type: Number,
        required: true,
        min: 1
    },
    client: {
        type: mongoose_1.Schema.Types.ObjectId,
        ref: 'User',
        required: true
    },
    stripe: {
        paymentIntentId: {
            type: String,
            required: true
        },
        paymentCaptured: {
            type: Boolean,
            required: true
        },
        creatorProfit: {
            type: Number,
            required: true,
            min: 0
        }
    }
};
const bookingSchema = new mongoose_1.Schema(bookingSchemaFields, {
    timestamps: true
});
bookingSchema.plugin(mongoose_lean_defaults_1.default);
exports.default = mongoose_1.model('Booking', bookingSchema);
