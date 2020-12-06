import React, {useEffect} from 'react';
import {connect} from 'react-redux';
import useSocket from '../hooks/useSocket';
import {fetchExperiences} from '../store/actions/experiences';
import {showSnackbar} from '../store/actions/ui';
import {Route, Switch} from 'react-router-dom';
import Cookies from 'js-cookie';

//Pages and layout
import Page404 from '../pages/Page404/Page404';
import Nav from '../components/Navs/CollapsingNav/CollapsingNav';
import Footer from '../components/Footer/Footer';
import Spinner from '../components/Spinner/Spinner';
import NewUserEmailVerifyDialog from '../components/Dialogs/NewUserEmailVerifyDialog/NewUserEmailVerifyDialog';
import Home from '../pages/Home/Home';
import PrivateRoute from '../pages/PrivateRoute';
const Notifications = React.lazy(() => import('../pages/Notifications/Notifications'));
const ExperienceRouter = React.lazy(() => import('../pages/Experience/Router'));
const ProfileRouter = React.lazy(() => import('../pages/Profile/Router'));
const CreatorRouter = React.lazy(() => import('../pages/Creators/Router'));

const PublicApp = (props) => {
    useSocket();

    //Used for FB/Google redirects
    const cookieToken = Cookies.get('token');
    useEffect(() => {
        const storedToken = window.localStorage.getItem('token');
        if(cookieToken && (cookieToken !== storedToken)) {
            window.localStorage.setItem('token', cookieToken);
            Cookies.remove('token');
        }
    }, [cookieToken]);

    const {isAuth, fetchExps, isAdmin, showSnackbar} = props;

    //Fetch user experiences if logged in 
    useEffect(() => {
        if(isAuth && !isAdmin) { fetchExps(); }
    }, [isAuth, fetchExps, isAdmin]);

    //Change favicon when there's a notification
    useEffect(() => {
        if(props.numNotifs > 0) {
            document.querySelector('#dynamic-favicon-32').href = '/favicon/notif-favicon-32x32.png';
            document.querySelector('#dynamic-favicon-16').href = '/favicon/notif-favicon-16x16.png';
        } else {
            document.querySelector('#dynamic-favicon-32').href = '/favicon/favicon-32x32.png';
            document.querySelector('#dynamic-favicon-16').href = '/favicon/favicon-16x16.png';
        }
    }, [props.numNotifs]);

    //If the user just verified their email, show snackbar
    useEffect(() => {
        const emailVerifiedDate = Cookies.get('emailVerifiedDate');
        if(emailVerifiedDate && 
          ((new Date() - new Date(emailVerifiedDate)) < 60000)) {
            showSnackbar("Your email address was verified.");
        }
    }, [showSnackbar]);

    //isAuth and isCreator are passed to the page routers to filter routes
    return (
        <React.Suspense fallback={<Spinner/>}>
            <NewUserEmailVerifyDialog/>
            <Nav/>
            <Switch>
                <PrivateRoute path="/notifications" test={isAuth}>
                    <Notifications/>
                </PrivateRoute>
                <PrivateRoute path="/profile" test={isAuth}>
                    <ProfileRouter/>
                </PrivateRoute>
                <Route path="/experience">
                    <ExperienceRouter 
                    isAuth={isAuth} 
                    isCreator={props.isCreator}/>
                </Route>
                <Route path="/creator">
                    <CreatorRouter 
                    isAuth={isAuth}/>
                </Route>
                <Route exact path="/">
                    <Home/>
                    <Footer/>
                </Route>
                <Route component={Page404}/>
            </Switch>
        </React.Suspense>
    );
}

const mapStateToProps = (state) => ({
    isAuth: state.user.profile.id !== null,
    isCreator: state.user.creator.id !== null,
    isAdmin: state.user.isAdmin,
    numNotifs: state.user.notifs.length
});
const mapDispatchToProps = (dispatch) => ({
    fetchExps: () => dispatch(fetchExperiences()),
    showSnackbar: (msg) => dispatch(showSnackbar(msg))
});

export default connect(mapStateToProps, mapDispatchToProps)(PublicApp);