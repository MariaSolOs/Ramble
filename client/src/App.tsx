import React, { useEffect } from 'react';
import { Switch, Route } from 'react-router-dom';
import { useLazyQuery, gql } from '@apollo/client';

import LanguageProvider from './context/languageContext';
import GlobalStyles from './assets/styles/GlobalStyles';
import { useAppSelector, useAppDispatch } from './hooks/redux';
import { setUserProfile } from './store/userSlice';

import Home from './pages/Home/Home';
import Navbar from './components/Navbar/Navbar';
import SignUpDialog from './components/AuthDialogs/SignUpDialog';
import LogInDialog from './components/AuthDialogs/LogInDialog';
import ErrorDialog from './components/ErrorDialog/ErrorDialog';
import Spinner from './components/Spinner/Spinner';

const ExperienceRouter = React.lazy(() => import('./pages/Experience/Router'));

const FETCH_USER = gql`
    query fetchUser {
        me {
            token
            firstName
            lastName
            birthday
            email
            phoneNumber
            photo
            city
            creator {
                _id
            }
        }
    }
`;
type User = {
    token: string;
    firstName: string;
    lastName: string;
    birthday: string;
    email: string;
    phoneNumber: string;
    photo: string;
    city: string;
    creator: { _id: string; }
}

const updateToken = (token: string) => {
    // If applicable, update the expire time of the token
    const forgetUser = Boolean(localStorage.getItem('ramble-expire_time'));

    if (forgetUser) {
        const expireTime = new Date(new Date().setDate(new Date().getDate() + 1));
        localStorage.setItem('ramble-expire_time', expireTime.toString());
    }

    localStorage.setItem('ramble-token', token);
}

const App = () => {
    const isLoggedIn = useAppSelector(state => state.user.isLoggedIn);
    const dispatch = useAppDispatch();

    const [fetchUser] = useLazyQuery<{ me: User }>(FETCH_USER, {
        onCompleted: ({ me }) => {
            updateToken(me.token);

            dispatch(setUserProfile({
                isLoggedIn: true,
                isCreator: Boolean(me.creator._id),
                firstName: me.firstName,
                lastName: me.lastName,
                birthday: me.birthday,
                email: me.email,
                phoneNumber: me.phoneNumber,
                photo: me.photo,
                city: me.city
            }));
        }
    });

    useEffect(() => {
        if (!isLoggedIn) {
            const expireTime = localStorage.getItem('ramble-expire_time');
            const token = localStorage.getItem('ramble-token');

            if (token) {
                if (expireTime && (+new Date(expireTime) < +new Date())) {
                    localStorage.removeItem('ramble-expire_time');
                    localStorage.removeItem('ramble-token');
                } else {
                    fetchUser();
                }
            }
        }
    }, [isLoggedIn, fetchUser]);

    return (
        <LanguageProvider>
            <GlobalStyles>
                <Navbar />
                <SignUpDialog />
                <LogInDialog />
                <ErrorDialog />
                <React.Suspense fallback={<Spinner />}>
                    <Switch>
                        <Route path="/experience" component={ExperienceRouter} />
                        <Route path="/" component={Home} />
                    </Switch>
                </React.Suspense>
            </GlobalStyles>
        </LanguageProvider>
    );
}

export default App;