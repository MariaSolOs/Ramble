import React, {useEffect} from 'react';
import {connect} from 'react-redux';
import {fetchExperiences} from '../store/actions/experiences';
import {Route, Redirect, Switch} from 'react-router-dom';
import Cookies from 'js-cookie';

//Pages and layout
import Nav from '../components/Navs/CollapsingNav/CollapsingNav';
import Footer from '../components/Footer/Footer';
import Spinner from '../components/Spinner';
import IdleTimer from '../components/IdleTimer/IdleTimer';
import Home from '../pages/Home/Home';
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

    const {isAuth, savedExps, fetchExps} = props;
    //Fetch user experiences if logged in 
    useEffect(() => {
        if(isAuth && !savedExps) { fetchExps(); }
    }, [isAuth, fetchExps, savedExps]);

    //The isAuth prop is passed to the page routers to filter routes
    return (
        <React.Suspense fallback={<Spinner/>}>
            <Nav/>
            {isAuth && <IdleTimer/>}
            <Switch>
                {isAuth && <Route path="/profile" component={ProfileRouter}/>}
                <Route path="/experience">
                    <ExperienceRouter isAuth={isAuth}/>
                </Route>
                <Route path="/creator">
                    <CreatorRouter/>
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
    savedExps: state.exp.savedExps
});
const mapDispatchToProps = (dispatch) => ({
    fetchExps: () => dispatch(fetchExperiences())
});

export default connect(mapStateToProps, mapDispatchToProps)(PublicApp);