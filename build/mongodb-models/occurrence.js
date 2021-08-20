"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = require("mongoose");
const mongoose_lean_defaults_1 = __importDefault(require("mongoose-lean-defaults"));
const occurrenceSchemaFields = {
    experience: {
        type: mongoose_1.Schema.Types.ObjectId,
        ref: 'Experience',
        required: true
    },
    dateStart: {
        type: Date,
        required: true
    },
    dateEnd: {
        type: Date,
        required: true
    },
    spotsLeft: {
        type: Number,
        required: true,
        min: 0
    },
    creatorProfit: {
        type: Number,
        required: true,
        min: 0
    },
    bookings: [{
            type: mongoose_1.Schema.Types.ObjectId,
            ref: 'Booking'
        }]
};
const occurrenceSchema = new mongoose_1.Schema(occurrenceSchemaFields);
occurrenceSchema.plugin(mongoose_lean_defaults_1.default);
exports.default = mongoose_1.model('Occurrence', occurrenceSchema);
