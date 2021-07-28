import jwt from 'jsonwebtoken';

import type { Context } from '../server-types';

const EXPIRE_TIME = '30d';
const ISSUER = 'rambleAPI';

/**
 * Generates a JSON web token for communicating with the client.
 * 
 * @param userId - Mongo ID of the user
 * @returns The generated token
 */
export const generateToken = (userId: string) => (
    jwt.sign({ userId }, process.env.JWT_SECRET!, {
        expiresIn: EXPIRE_TIME,
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
        return { userId: '' }
    }
}