import { InMemoryCache, makeVar } from '@apollo/client';

export const TOKEN_KEY = 'ramble-admin-token';

export const isLoggedInVar = makeVar(Boolean(sessionStorage.getItem(TOKEN_KEY)));

export const cache = new InMemoryCache({
    typePolicies: {
        Query: {
            fields: {
                isLoggedIn: {
                    read() {
                        return isLoggedInVar();
                    }
                }
            }
        }
    }
});

export const initCache = (token: string) => {
    sessionStorage.setItem(TOKEN_KEY, token);
    isLoggedInVar(true);
}

export const resetCache = () => {
    sessionStorage.removeItem(TOKEN_KEY);
    isLoggedInVar(false);
}