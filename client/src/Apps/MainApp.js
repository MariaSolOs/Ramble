import React, {useEffect, lazy, Suspense} from 'react';
import Cookies from 'js-cookie';
import {Route, Switch, useHistory} from 'react-router-dom';
import CloudinaryProvider from '../context/cloudinaryContext';
import AdminProvider from '../context/adminContext';

//Pages
import Spinner from '../components/Spinner';
import UserApp from './UserApp';
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

    return (
        <Suspense fallback={<Spinner/>}> 
            <CloudinaryProvider>
                <Switch>
                    <Route path="/admin">
                        <AdminProvider>
                            <AdminApp/>
                        </AdminProvider>
                    </Route>
                    <Route path="/" component={UserApp}/>
                </Switch>
            </CloudinaryProvider> 
        </Suspense>
    );
}

export default MainApp;
