import React from 'react';
import ReactDOM from 'react-dom';
import { BrowserRouter } from 'react-router-dom';
import { ApolloProvider } from '@apollo/client';
import { ApolloClient } from '@apollo/client';

import { cache, TOKEN_KEY } from 'apollo-cache';

import App from './App';

const client = new ApolloClient({
    uri: `${process.env.REACT_APP_SERVER_URI}/graphql`,
    cache,
    headers: {
        authorization: sessionStorage.getItem(TOKEN_KEY) || ''
    }
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
