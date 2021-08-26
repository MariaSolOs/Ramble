"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = require("mongoose");
const mongoose_lean_defaults_1 = __importDefault(require("mongoose-lean-defaults"));
const bcrypt_1 = __importDefault(require("bcrypt"));
const userSchemaFields = {
    fstName: {
        type: String,
        required: true,
        default: ''
    },
    lstName: {
        type: String,
        required: true,
        default: ''
    },
    birthday: Date,
    emailAddress: {
        type: String,
        required: true
    },
    phoneNumber: {
        type: String,
        validate: /\(([0-9]{3})\) ([0-9]{3})-([0-9]{4})/
    },
    passwordHash: String,
    photo: String,
    city: String,
    savedExperiences: [{
            type: mongoose_1.Schema.Types.ObjectId,
            ref: 'Experience'
        }],
    bookedExperiences: [{
            type: mongoose_1.Schema.Types.ObjectId,
            ref: 'Experience'
        }],
    creator: {
        type: mongoose_1.Schema.Types.ObjectId,
        ref: 'Creator'
    },
    lastLogin: {
        type: Date,
        default: new Date()
    }
};
const userSchema = new mongoose_1.Schema(userSchemaFields);
userSchema.plugin(mongoose_lean_defaults_1.default);
/**
 * Verifies if the input password matches the hashed one.
 */
userSchema.static('isValidPassword', function isValidPassword(password, passwordHash) {
    return bcrypt_1.default.compareSync(password, passwordHash);
});
/**
 * Generates the password hash from the given password.
 */
userSchema.static('generatePasswordHash', function generatePasswordHash(password) {
    return bcrypt_1.default.hashSync(password, 10);
});
exports.default = mongoose_1.model('User', userSchema);
