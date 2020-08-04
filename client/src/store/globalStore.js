import {combineReducers, createStore, compose, applyMiddleware} from 'redux';
import thunk from 'redux-thunk';
import userReducer from './reducers/user';
import creatorReducer from './reducers/creator';
import experienceReducer from './reducers/experiences';
import uiReducer from './reducers/ui';

const composeEnhancers = process.env.NODE_ENV === 'development' ? 
                         window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ : 
                         null || compose;
const rootReducer = combineReducers({
    user: userReducer,
    creator: creatorReducer,
    exp: experienceReducer,
    ui: uiReducer
});

export default createStore(rootReducer, composeEnhancers(applyMiddleware(thunk)));