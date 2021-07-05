import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux';
import { BrowserRouter } from 'react-router-dom';
import { ApolloProvider } from '@apollo/client';

import store from 'store/store';
import apolloClient from 'store/gqlClient';

import App from 'App';
import reportWebVitals from 'reportWebVitals';

import { Elements } from '@stripe/react-stripe-js';
import { loadStripe } from '@stripe/stripe-js';

const stripePromise = loadStripe(process.env.REACT_APP_STRIPE_KEY!);

ReactDOM.render(
    <React.StrictMode>
        <Provider store={store}>
            <ApolloProvider client={apolloClient}>
                <Elements stripe={stripePromise}>
                    <BrowserRouter>
                        <App />
                    </BrowserRouter>
                </Elements>
            </ApolloProvider>
        </Provider>
    </React.StrictMode>,
    document.getElementById('root')
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
