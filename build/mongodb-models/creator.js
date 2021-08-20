"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = require("mongoose");
const mongoose_lean_defaults_1 = __importDefault(require("mongoose-lean-defaults"));
const creatorSchemaFields = {
    user: {
        type: mongoose_1.Schema.Types.ObjectId,
        ref: 'User',
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
        onboarded: Boolean
    },
    bookingRequests: [{
            type: mongoose_1.Schema.Types.ObjectId,
            ref: 'Booking'
        }]
};
const creatorSchema = new mongoose_1.Schema(creatorSchemaFields);
creatorSchema.plugin(mongoose_lean_defaults_1.default);
exports.default = mongoose_1.model('Creator', creatorSchema);
