import React, { useState, useEffect } from 'react';
import { Switch, Route } from 'react-router-dom';
import Cookies from 'js-cookie';
import { useReactiveVar } from '@apollo/client';

import { updateToken } from 'utils/auth';
import { useGetCoreProfileLazyQuery } from 'graphql-api';
import LanguageProvider from 'context/languageContext';
import UiProvider from 'context/uiContext';
import GlobalStyles from 'assets/styles/GlobalStyles';
import { userProfileVar, setUserInfo } from 'store/user-cache';

import Home from 'pages/Home/Home';
import Navbar from 'components/Navbar/Navbar';
import SignUpDialog from 'components/AuthDialogs/SignUpDialog';
import LogInDialog from 'components/AuthDialogs/LogInDialog';
import ErrorDialog from 'components/ErrorDialog/ErrorDialog';
import Snackbar from 'components/Snackbar/Snackbar';
import ResetPasswordDialog from 'components/ResetPasswordDialog/ResetPasswordDialog';
import Spinner from 'components/Spinner/Spinner';

const ExperienceRouter = React.lazy(() => import('pages/Experience/Router'));
const CreatorRouter = React.lazy(() => import('pages/Creator/Router'));
const ProfileRouter = React.lazy(() => import('pages/UserProfile/Router'));

// TODO: Add page guards
// TODO: Use better HTML tags (main, header, etc)
const App = () => {
    const isLoggedIn = Boolean(useReactiveVar(userProfileVar).userId);

    const [rememberUser, setRememberUser] = useState(false);

    const [fetchProfile] = useGetCoreProfileLazyQuery({
        onCompleted: ({ me }) => {
            updateToken(me.token!, rememberUser);
            setUserInfo(me);
        }
    });

    // Try to log in back the user when the page refreshes
    useEffect(() => {
        if (!isLoggedIn) {
            const persistentToken = localStorage.getItem('ramble-token');
            const sessionToken = sessionStorage.getItem('ramble-token');
            
            if (persistentToken || sessionToken) {
                setRememberUser(Boolean(persistentToken));
                fetchProfile();
            }
        }
    }, [isLoggedIn, fetchProfile]);

    // Log user in when redirected from the server
    useEffect(() => {
        const serverCookie = Cookies.get('ramble-server_cookie');

        if (serverCookie) {
            Cookies.remove('ramble-server_cookie');
            sessionStorage.setItem('ramble-token', serverCookie);
            setRememberUser(false);
            fetchProfile();
        }
    }, [fetchProfile]);

    return (
        <LanguageProvider>
            <UiProvider>
                <GlobalStyles>
                    <Navbar />
                    <SignUpDialog />
                    <LogInDialog />
                    <ErrorDialog />
                    <Snackbar />
                    <ResetPasswordDialog />
                    <React.Suspense fallback={<Spinner />}>
                        <Switch>
                            <Route path="/experience" component={ExperienceRouter} />
                            <Route path="/creator" component={CreatorRouter} />
                            <Route path="/profile" component={ProfileRouter} />
                            <Route path="/" component={Home} />
                        </Switch>
                    </React.Suspense>
                </GlobalStyles>
            </UiProvider>
        </LanguageProvider>
    );
}

export default App;