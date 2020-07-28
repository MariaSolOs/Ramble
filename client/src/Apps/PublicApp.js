import React, {lazy, Suspense} from 'react';
import {useSelector} from 'react-redux';
import {Route, Redirect, Switch} from 'react-router-dom';

//Pages and layout
import Nav from '../components/Navs/CollapsingNav/CollapsingNav';
import Footer from '../components/Footer/Footer';
import Spinner from '../components/Spinner';
import IdleTimer from '../components/IdleTimer/IdleTimer';
import Home from '../pages/Home/Home';
const ExperienceRouter = lazy(() => import('../pages/Experience/Router'));
const ProfileRouter = lazy(() => import('../pages/Profile/Router'));
const Creators = lazy(() => import('../pages/Creators/Creators'));

const UserApp = (props) => {
    //TODO: Fix the loading after logout
    const isAuth = useSelector(state => state.user.token !== null);
    //The isAuth prop is passed to the page routers to filter routes
    return (
        <Suspense fallback={<Spinner/>}>
            <Nav/>
            {isAuth && <IdleTimer/>}
            <Switch>
                {isAuth && <Route path="/profile" component={ProfileRouter}/>}
                <Route path="/experience">
                    <ExperienceRouter isAuth={isAuth}/>
                </Route>
                <Route path="/creator">
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

export default UserApp;