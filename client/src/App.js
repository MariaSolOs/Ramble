import React, {useState, useEffect, lazy, Suspense} from 'react';
import Cookies from 'js-cookie';
import {connect} from 'react-redux';
import {fetchProfile} from './store/actions/user';
import {Route, Redirect, Switch, useHistory} from 'react-router-dom';
import CloudinaryProvider from './context/cloudinaryContext';

//Pages
import Spinner from './components/Spinner';
import Layout from './pages/MainLayout';
import Home from './pages/Home/Home';
import ExperienceRouter from './pages/Experience/Router';
const ProfileRouter = lazy(() => import('./pages/Profile/Router'));
const Creators = lazy(() => import('./pages/Creators/Creators'));

const App = (props) => {
    const history = useHistory();

    //Keep token updated
    const cookieToken = Cookies.get('token');
    useEffect(() => {
        const storedToken = window.localStorage.getItem('token');
        if(cookieToken && (cookieToken !== storedToken)) {
            window.localStorage.setItem('token', cookieToken);
            Cookies.remove('token');
        }
    }, [cookieToken]);
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

    //For redirect requests:
    const redirect = window.localStorage.getItem('redirectURL');
    useEffect(() => {
        if(redirect) { 
            history.push(redirect); 
            window.localStorage.removeItem('redirectURL');
        }
    }, [redirect, history])

    //TODO: Fix the loading after logout
    
    //The isAuth prop is passed to the page routers to filter routes
    return (
        <Suspense fallback={<Spinner/>}>
            {loading? <Spinner/> : 
            <CloudinaryProvider>
                <Layout>
                    <Switch>
                        {isAuth && <Route path="/profile" component={ProfileRouter}/>} 
                        <Route path="/experience">
                            <ExperienceRouter isAuth={isAuth}/>
                        </Route>
                        <Route path="/creator" component={Creators}/>
                        <Route exact path="/" component={Home}/>
                        <Redirect to="/"/>
                    </Switch>
                </Layout>
            </CloudinaryProvider>}
        </Suspense>
    );
}

const mapStateToProps = (state) => ({
    isAuth: (state.user.data.id !== null)
});

const mapDispatchToProps = (dispatch) => ({
    fetchProfile: () => dispatch(fetchProfile())
});

export default connect(mapStateToProps, mapDispatchToProps)(App);
