import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux';
import { BrowserRouter } from 'react-router-dom';
import { ApolloClient, InMemoryCache, ApolloProvider } from '@apollo/client';

import store from './store/store';

import App from './App';
import reportWebVitals from './reportWebVitals';

const apolloClient = new ApolloClient({
    uri: `${process.env.REACT_APP_SERVER_URI}/graphql`,
    cache: new InMemoryCache(),
    headers: {
        authorization: localStorage.getItem('ramble-token') || ''
    }
});

ReactDOM.render(
    <React.StrictMode>
        <Provider store={store}>
            <ApolloProvider client={apolloClient}>
                <BrowserRouter>
                    <App />
                </BrowserRouter>
            </ApolloProvider>
        </Provider>
    </React.StrictMode>,
    document.getElementById('root')
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
