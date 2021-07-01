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