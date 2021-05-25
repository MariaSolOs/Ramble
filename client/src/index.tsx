import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux';
import { BrowserRouter } from 'react-router-dom';
import { ApolloClient, InMemoryCache, ApolloProvider, createHttpLink } from '@apollo/client';
import { setContext } from '@apollo/client/link/context';

import store from './store/store';

import App from './App';
import reportWebVitals from './reportWebVitals';

const httpLink = createHttpLink({
    uri: `${process.env.REACT_APP_SERVER_URI}/graphql`
});

const authLink = setContext((_, { headers }) => {
    const token = localStorage.getItem('ramble-token');
    return {
        ...headers,
        authorization: token || ''
    }
});

const apolloClient = new ApolloClient({
    link: authLink.concat(httpLink),
    cache: new InMemoryCache()
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
