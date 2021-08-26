"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = require("mongoose");
const mongoose_lean_defaults_1 = __importDefault(require("mongoose-lean-defaults"));
const bcrypt_1 = __importDefault(require("bcrypt"));
const adminSchemaFields = {
    userName: {
        type: String,
        unique: true
    },
    passwordHash: String
};
const adminSchema = new mongoose_1.Schema(adminSchemaFields);
adminSchema.plugin(mongoose_lean_defaults_1.default);
/**
 * Verifies if the input password matches the hashed one.
 */
adminSchema.static('isValidPassword', function isValidPassword(password, passwordHash) {
    return bcrypt_1.default.compareSync(password, passwordHash);
});
exports.default = mongoose_1.model('Admin', adminSchema);
