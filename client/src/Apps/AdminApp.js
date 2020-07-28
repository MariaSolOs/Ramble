import React from 'react';
import {useSelector} from 'react-redux';
import {useRouteMatch, useLocation, Switch, Route, Redirect} from 'react-router-dom';

//Pages and layout
import Nav from '../components/Navs/AdminNav';
import Auth from '../pages/Admin/Auth/Auth';

const AdminApp = (props) => {
    const {path} = useRouteMatch();
    const location = useLocation();
    //const isAuth = useSelector(state => state.user.token !== null);

    return (
        <>
            <Nav/>
            <Switch location={location}>
                <Route exact path={`${path}/`} component={Auth}/>
                <Redirect to="/"/>
            </Switch>
        </>
    );
}

export default AdminApp;