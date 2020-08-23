import React, {useEffect} from 'react';
import {connect} from 'react-redux';
import useSocket from '../hooks/useSocket';
import {fetchExperiences} from '../store/actions/experiences';
import {Route, Redirect, Switch} from 'react-router-dom';
import Cookies from 'js-cookie';

//Pages and layout
import Nav from '../components/Navs/CollapsingNav/CollapsingNav';
import Footer from '../components/Footer/Footer';
import Spinner from '../components/Spinner';
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

    const {isAuth, fetchExps} = props;
    //Fetch user experiences if logged in 
    useEffect(() => {
        if(isAuth) { fetchExps(); }
    }, [isAuth, fetchExps]);

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

    //The isAuth prop is passed to the page routers to filter routes
    return (
        <React.Suspense fallback={<Spinner/>}>
            <Nav/>
            <Switch>
                <PrivateRoute path="/notifications" test={isAuth}>
                    <Notifications/>
                </PrivateRoute>
                <PrivateRoute path="/profile" test={isAuth}>
                    <ProfileRouter/>
                </PrivateRoute>
                <Route path="/experience">
                    <ExperienceRouter isAuth={isAuth}/>
                </Route>
                <Route path="/creator">
                    <CreatorRouter isAuth={isAuth}/>
                </Route>
                <Route exact path="/">
                    <Home/>
                    <Footer/>
                </Route>
                <Redirect to="/"/>
            </Switch>
        </React.Suspense>
    );
}

const mapStateToProps = (state) => ({
    isAuth: state.user.profile.id !== null,
    isAdmin: state.user.isAdmin,
    numNotifs: state.user.notifs.length
});
const mapDispatchToProps = (dispatch) => ({
    fetchExps: () => dispatch(fetchExperiences())
});

export default connect(mapStateToProps, mapDispatchToProps)(PublicApp);