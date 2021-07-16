/**
 * @returns The token stored in persistent storage.
 */
export const getStoredToken = () => (
    localStorage.getItem('ramble-token') || sessionStorage.getItem('ramble-token') || ''
);

/**
 * Based on if the user wants to be remembered, store new token.
 * 
 * @param token - JWT encrypted token
 * @param rememberUser - True if the token should persist sessions
 */
export const updateToken = (token: string, rememberUser: boolean) => {
    if (rememberUser) {
        localStorage.setItem('ramble-token', token);
    } else {
        sessionStorage.setItem('ramble-token', token);
    }
}

/**
 * Removes all the authentication tokens from session/local storage.
 */
export const removeTokens = () => {
    sessionStorage.removeItem('ramble-token');
    localStorage.removeItem('ramble-token');
    localStorage.removeItem('ramble-redirect_page_token');
}