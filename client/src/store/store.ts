import { configureStore } from '@reduxjs/toolkit';

import uiReducer from './uiSlice';
import userReducer from './userSlice';
import apolloClient from 'gqlClient';

const store = configureStore({
    reducer: {
        ui: uiReducer,
        user: userReducer
    },
    middleware: getDefaultMiddleware => (
        getDefaultMiddleware({
            thunk: {
                extraArgument: apolloClient
            }
        })
    )
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
export default store;