import React, {useEffect} from 'react';
import {connect} from 'react-redux';
import {fetchExperiences} from '../store/actions/experiences';
import {Route, Redirect, Switch} from 'react-router-dom';
import Cookies from 'js-cookie';

//Pages and layout
import Nav from '../components/Navs/CollapsingNav/CollapsingNav';
import Footer from '../components/Footer/Footer';
import Spinner from '../components/Spinner';
import Home from '../pages/Home/Home';
import PrivateRoute from '../pages/PrivateRoute';
import Notifications from '../pages/Notifications/Notifications';
const ExperienceRouter = React.lazy(() => import('../pages/Experience/Router'));
const ProfileRouter = React.lazy(() => import('../pages/Profile/Router'));
const CreatorRouter = React.lazy(() => import('../pages/Creators/Router'));

const PublicApp = (props) => {
    //Keep token updated
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
    isAuth: state.user.token !== null,
    isAdmin: state.user.isAdmin
});
const mapDispatchToProps = (dispatch) => ({
    fetchExps: () => dispatch(fetchExperiences())
});

export default connect(mapStateToProps, mapDispatchToProps)(PublicApp);