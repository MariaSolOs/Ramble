import jwt from 'jsonwebtoken';

import type { Context } from '../server-types';

const ISSUER = 'rambleAdminAPI';

/**
 * Generates a JSON web token for communicating with the client.
 * 
 * @param adminId - Mongo ID of the admin
 * @returns The generated token
 */
export const generateToken = (adminId: string) => (
    jwt.sign({ adminId }, process.env.JWT_SECRET!, {
        expiresIn: '1h',
        issuer: ISSUER
    })
);

/**
 * @param token - JSON web token
 * @returns The decrypted token, or null if an error occurs
 */
export const verifyToken = (token: string): Context => {
    try {
        return jwt.verify(token, process.env.JWT_SECRET!, { 
            issuer: ISSUER 
        }) as Context; 
    } catch (err) {
        return {
            adminId: ''
        }
    }
}