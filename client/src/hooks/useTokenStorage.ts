import { useEffect } from 'react';

export default function useTokenStorage(isLoggedIn: boolean) {
    /* If the user has a token in session storage, it will be lost when going
       to a new tab, and so we temporarily store it in local storage. */
       useEffect(() => {
        const tokenInSessionStorage = sessionStorage.getItem('ramble-token');
        if (tokenInSessionStorage) {
            localStorage.setItem('ramble-redirect_page_token', tokenInSessionStorage);
        }
    }, [isLoggedIn]);
}