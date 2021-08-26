"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = require("mongoose");
const mongoose_lean_defaults_1 = __importDefault(require("mongoose-lean-defaults"));
const reviewSchemaFields = {
    experience: {
        type: mongoose_1.Schema.Types.ObjectId,
        ref: 'Experience',
        required: true
    },
    reviewer: {
        type: mongoose_1.Schema.Types.ObjectId,
        ref: 'User',
        required: true
    },
    reviewerName: {
        type: String,
        required: true
    },
    text: {
        type: String,
        required: true
    },
    value: {
        type: Number,
        min: 1,
        max: 5,
        required: true
    },
    approved: {
        type: Boolean,
        required: true
    }
};
const reviewSchema = new mongoose_1.Schema(reviewSchemaFields);
reviewSchema.plugin(mongoose_lean_defaults_1.default);
exports.default = mongoose_1.model('Review', reviewSchema);
