import React, {useEffect, lazy, Suspense} from 'react';
import {connect} from 'react-redux';
import {fetchProfile} from '../store/actions/user';
import Cookies from 'js-cookie';
import {Route, Switch, useHistory} from 'react-router-dom';
import CloudinaryProvider from '../context/cloudinaryContext';

import Spinner from '../components/Spinner';
import PublicApp from './PublicApp';
const AdminApp = lazy(() => import('./AdminApp'));

const MainApp = (props) => {
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

    //For redirect requests:
    const redirect = window.localStorage.getItem('redirectURL');
    useEffect(() => {
        if(redirect) { 
            history.push(redirect); 
            window.localStorage.removeItem('redirectURL');
        }
    }, [redirect, history]);

    //For automatic auth after refreshing the page
    const {fetchProfile} = props;
    useEffect(() => { 
        fetchProfile();
    }, [fetchProfile]);

    return (
        <>
            {props.loadingUser? <Spinner/> :
            <Suspense fallback={<Spinner/>}> 
                <CloudinaryProvider>
                    <Switch>
                        <Route path="/admin" component={AdminApp}/>
                        <Route path="/" component={PublicApp}/>
                    </Switch>
                </CloudinaryProvider> 
            </Suspense>}
        </>
    );
}

const mapStateToProps = (state) => ({
    loadingUser: state.user.loading
});
const mapDispatchToProps = (dispatch) => ({
    fetchProfile: () => dispatch(fetchProfile())
});

export default connect(mapStateToProps, mapDispatchToProps)(MainApp);
