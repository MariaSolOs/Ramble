"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.verifyToken = exports.generateToken = void 0;
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const ISSUER = 'rambleAdminAPI';
/**
 * Generates a JSON web token for communicating with the client.
 *
 * @param alias - Username of the admin
 * @returns The generated token
 */
const generateToken = (alias) => (jsonwebtoken_1.default.sign({ alias }, process.env.JWT_SECRET, {
    expiresIn: '1h',
    issuer: ISSUER
}));
exports.generateToken = generateToken;
/**
 * @param token - JSON web token
 * @returns The decrypted token, or null if an error occurs
 */
const verifyToken = (token) => {
    try {
        return jsonwebtoken_1.default.verify(token, process.env.JWT_SECRET, {
            issuer: ISSUER
        });
    }
    catch (err) {
        return {
            alias: ''
        };
    }
};
exports.verifyToken = verifyToken;
