import jwt from 'jsonwebtoken';

import type { Context } from 'apollo-server-types';

/**
 * Generates a JSON web token for communicating with the client.
 * 
 * @param userId - Mongo ID of the user
 * @param expireTime - The expiration time of the token
 * @returns The generated token
 */
export const generateToken = (userId: string, expireTime: string = '1d') => {
    return jwt.sign({ 
        userId,
        tokenExpiry: expireTime 
    }, 
    process.env.JWT_SECRET!, {
        expiresIn: expireTime,
        issuer: 'rambleAPI'
    });
}

/**
 * @param token - JSON web token
 * @returns The decrypted token, or null if an error occurs
 */
export const verifyToken = (token: string): Context => {
    try {
        return jwt.verify(
            token, process.env.JWT_SECRET!, 
            { issuer: 'rambleAPI' }
        ) as Context; 
    } catch (err) {
        return {
            userId: '',
            tokenExpiry: ''
        }
    }
}