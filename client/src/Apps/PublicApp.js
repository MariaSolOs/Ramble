import React, {lazy, Suspense, useEffect} from 'react';
import {useSelector} from 'react-redux';
import {Route, Redirect, Switch} from 'react-router-dom';

//Pages and layout
import Nav from '../components/Navs/CollapsingNav/CollapsingNav';
import Footer from '../components/Footer/Footer';
import Spinner from '../components/Spinner';
import IdleTimer from '../components/IdleTimer/IdleTimer';
import withSnackbar from '../hoc/withSnackbar';
import Snackbar from '../components/Snackbar';
import Home from '../pages/Home/Home';
const ExperienceRouter = lazy(() => import('../pages/Experience/Router'));
const ProfileRouter = lazy(() => import('../pages/Profile/Router'));
const Creators = lazy(() => import('../pages/Creators/Creators'));

const UserApp = (props) => {
    //For general errors
    const message = useSelector(state => state.user.message);
    const {displaySnackbar} = props;
    useEffect(() => {
        displaySnackbar(message);
    }, [displaySnackbar, message]);

    //The isAuth prop is passed to the page routers to filter routes
    return (
        <Suspense fallback={<Spinner/>}>
            <Nav/>
            {props.isAuth && <IdleTimer/>}
            <Switch>
                {props.isAuth && <Route path="/profile" component={ProfileRouter}/>}
                <Route path="/experience">
                    <ExperienceRouter isAuth={props.isAuth}/>
                </Route>
                <Route path="/become-creator">
                    <Creators/>
                    <Footer/>
                </Route>
                <Route exact path="/">
                    <Home/>
                    <Footer/>
                </Route>
                <Redirect to="/"/>
            </Switch>
        </Suspense>
    );
}

export default withSnackbar(UserApp, Snackbar);