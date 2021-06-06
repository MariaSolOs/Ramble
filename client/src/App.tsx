import React, { useEffect } from 'react';
import { Switch, Route } from 'react-router-dom';

import LanguageProvider from './context/languageContext';
import GlobalStyles from './assets/styles/GlobalStyles';
import { useAppSelector, useAppDispatch } from './hooks/redux';
import { fetchProfile } from './store/userSlice';

import Home from './pages/Home/Home';
import Navbar from './components/Navbar/Navbar';
import SignUpDialog from './components/AuthDialogs/SignUpDialog';
import LogInDialog from './components/AuthDialogs/LogInDialog';
import ErrorDialog from './components/ErrorDialog/ErrorDialog';
import ResetPasswordDialog from './components/ResetPasswordDialog/ResetPasswordDialog';
import Spinner from './components/Spinner/Spinner';

const ExperienceRouter = React.lazy(() => import('./pages/Experience/Router'));

const App = () => {
    const isLoggedIn = useAppSelector(state => state.user.isLoggedIn);
    const dispatch = useAppDispatch();

    // Try to log in back the user when the page refreshes
    useEffect(() => {
        if (!isLoggedIn) {
            const token = localStorage.getItem('ramble-token') || sessionStorage.getItem('ramble-token');
            
            if (token) {
                dispatch(fetchProfile());
            }
        }
    }, [isLoggedIn, dispatch]);

    return (
        <LanguageProvider>
            <GlobalStyles>
                <Navbar />
                <SignUpDialog />
                <LogInDialog />
                <ErrorDialog />
                <ResetPasswordDialog />
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