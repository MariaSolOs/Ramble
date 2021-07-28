/**
 * @returns The token stored in persistent storage.
 */
export const getStoredToken = () => (
    localStorage.getItem('ramble-token') || ''
);

/**
 * Stores new token in local storage.
 * 
 * @param token - JWT encrypted token
 */
export const updateToken = (token: string) => {
    localStorage.setItem('ramble-token', token);
}

/**
 * Removes the authentication tokens from local storage.
 */
export const removeTokens = () => {
    localStorage.removeItem('ramble-token');
}