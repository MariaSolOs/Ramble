"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = require("mongoose");
const mongoose_lean_defaults_1 = __importDefault(require("mongoose-lean-defaults"));
const experienceSchemaFields = {
    status: {
        type: String,
        required: true,
        enum: ['pending', 'approved', 'rejected']
    },
    zoomInfo: {
        PMI: String,
        password: String
    },
    location: {
        displayLocation: {
            type: String,
            required: true
        },
        meetPoint: String,
        coordinates: {
            lat: Number,
            long: Number
        }
    },
    title: {
        type: String,
        required: true
    },
    categories: [{
            type: String,
            enum: ['taste', 'create', 'relax', 'learn', 'move']
        }],
    description: {
        type: String,
        required: true
    },
    ageRestriction: Number,
    duration: {
        type: Number,
        required: true,
        min: 0.5
    },
    languages: [String],
    capacity: {
        type: Number,
        required: true,
        min: 1
    },
    images: [String],
    included: [String],
    toBring: [String],
    price: {
        perPerson: {
            type: Number,
            required: true
        },
        private: Number,
        currency: {
            type: String,
            required: true,
            enum: ['CAD', 'USD']
        }
    },
    rating: {
        value: {
            type: Number,
            min: 1,
            max: 5,
            default: 5
        },
        numRatings: {
            type: Number,
            default: 0
        }
    },
    creator: {
        type: mongoose_1.Schema.Types.ObjectId,
        required: true,
        ref: 'Creator'
    }
};
const experienceSchema = new mongoose_1.Schema(experienceSchemaFields);
experienceSchema.plugin(mongoose_lean_defaults_1.default);
exports.default = mongoose_1.model('Experience', experienceSchema);
