import React, {useState, useEffect, lazy, Suspense} from 'react';
import {connect} from 'react-redux';
import {fetchProfile} from '../store/actions/user';
import {Route, Redirect, Switch} from 'react-router-dom';

//Pages
import Spinner from '../components/Spinner';
import IdleTimer from '../components/IdleTimer/IdleTimer';
import Layout from '../pages/MainLayout';
import Home from '../pages/Home/Home';
const ExperienceRouter = lazy(() => import('../pages/Experience/Router'));
const ProfileRouter = lazy(() => import('../pages/Profile/Router'));
const Creators = lazy(() => import('../pages/Creators/Creators'));

const UserApp = (props) => {
    //For managing user sign/in and reloading of the page
    const {fetchProfile, isAuth} = props;
    const [loading, setLoading] = useState(true);
    useEffect(() => {
        if(isAuth) { setLoading(false); }
    }, [isAuth]);
    useEffect(() => {
        setLoading(window.localStorage.getItem('token'));
        fetchProfile();
    }, [fetchProfile]);

    //TODO: Fix the loading after logout
    
    //The isAuth prop is passed to the page routers to filter routes
    return (
        <Suspense fallback={<Spinner/>}>
            {loading? <Spinner/> : 
            <Layout>
                {isAuth && <IdleTimer/>}
                <Switch>
                    {isAuth && <Route path="/profile" component={ProfileRouter}/>}
                    <Route path="/experience">
                        <ExperienceRouter isAuth={isAuth}/>
                    </Route>
                    <Route path="/creator" component={Creators}/>
                    <Route exact path="/" component={Home}/>
                    <Redirect to="/"/>
                </Switch>
            </Layout>}
        </Suspense>
    );
}

const mapStateToProps = (state) => ({
    isAuth: (state.user.data.token !== null)
});
const mapDispatchToProps = (dispatch) => ({
    fetchProfile: () => dispatch(fetchProfile())
});

export default connect(mapStateToProps, mapDispatchToProps)(UserApp);