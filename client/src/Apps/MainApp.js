import React, {useEffect, lazy, Suspense} from 'react';
import {connect} from 'react-redux';
import {fetchUserProfile} from '../store/actions/user';
import Cookies from 'js-cookie';
import {Route, Switch, useHistory} from 'react-router-dom';
import {LocationProvider} from '../context/locationContext';

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
    const {fetchUserProfile} = props;
    useEffect(() => { 
        fetchUserProfile();
    }, [fetchUserProfile]);

    return (
        <>
        {props.loadingUser? <Spinner/> :
        <Suspense fallback={<Spinner/>}> 
            <Switch>
                <Route path="/admin">
                    <AdminApp isAuth={props.isAuth}/>
                </Route>
                <Route path="/">
                    <LocationProvider>
                        <PublicApp isAuth={props.isAuth}/>
                    </LocationProvider>
                </Route>
            </Switch>
        </Suspense>}
        </>
    );
}

const mapStateToProps = (state) => ({
    isAuth: state.user.token !== null,
    loadingUser: state.user.loading
});
const mapDispatchToProps = (dispatch) => ({
    fetchUserProfile: () => dispatch(fetchUserProfile())
});

export default connect(mapStateToProps, mapDispatchToProps)(MainApp);
