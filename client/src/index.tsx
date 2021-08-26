import React from 'react';
import ReactDOM from 'react-dom';
import { BrowserRouter } from 'react-router-dom';
import { ApolloProvider } from '@apollo/client';
import { ApolloClient, createHttpLink } from '@apollo/client';
import { setContext } from '@apollo/client/link/context';

import { cache, TOKEN_KEY } from 'apollo-cache';

import App from './App';

const httpLink = createHttpLink({
    uri: `${process.env.REACT_APP_SERVER_URI}/graphql`
});

const authLink = setContext((_, { headers }) => ({
    headers: {
        ...headers,
        authorization: sessionStorage.getItem(TOKEN_KEY) || ''
    }
}));

const client = new ApolloClient({
    link: authLink.concat(httpLink),
    cache
});

ReactDOM.render(
    <React.StrictMode>
        <BrowserRouter>
            <ApolloProvider client={client}>
                <App />
            </ApolloProvider>
        </BrowserRouter>
    </React.StrictMode>,
    document.getElementById('root')
);
