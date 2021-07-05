import { useEffect } from 'react';

/**
 * If the user has a token in session storage, it will be lost when going
 * to a new tab, and this hook temporarily stores it in local storage.
 * 
 * @param isLoggedIn - If the user is currently logged in
 */
export default function useTokenStorage(isLoggedIn: boolean) {
    useEffect(() => {
        const tokenInSessionStorage = sessionStorage.getItem('ramble-token');
        if (tokenInSessionStorage) {
            localStorage.setItem('ramble-redirect_page_token', tokenInSessionStorage);
        }
    }, [isLoggedIn]);

    useEffect(() => {
        return () => {
            localStorage.removeItem('ramble-redirect_page_token');
        }
    }, []);
}