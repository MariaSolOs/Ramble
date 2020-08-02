import React from 'react';
import ReactDOM from 'react-dom';
import {BrowserRouter} from 'react-router-dom';
import App from './Apps/MainApp';
import * as serviceWorker from './serviceWorker';

//Redux configuration
import {Provider} from 'react-redux';
import {combineReducers, createStore, compose, applyMiddleware} from 'redux';
import thunk from 'redux-thunk';
import userReducer from './store/reducers/user';
import experienceReducer from './store/reducers/experiences';
import uiReducer from './store/reducers/ui';

//Stripe configuration
import {Elements} from '@stripe/react-stripe-js';
import {loadStripe} from '@stripe/stripe-js';

import './index.css';

//Create global store
const composeEnhancers = process.env.NODE_ENV === 'development' ? window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ : null || compose;
const rootReducer = combineReducers({
    user: userReducer,
    exp: experienceReducer,
    ui: uiReducer
});
const store = createStore(rootReducer, composeEnhancers(applyMiddleware(thunk)));

const stripePromise = loadStripe(process.env.REACT_APP_STRIPE_PUBLIC_KEY);

ReactDOM.render(
    <Elements stripe={stripePromise}>
        <Provider store={store}>
            <React.StrictMode>
                <BrowserRouter>
                    <App/>
                </BrowserRouter>
            </React.StrictMode>
        </Provider>
    </Elements>,
  document.getElementById('root')
);

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();
