import React from 'react';
import {AdminContext} from '../context/adminContext';
import {useRouteMatch, useLocation, Switch, Route, Redirect} from 'react-router-dom';

//Pages
import Auth from '../pages/Admin/Auth/Auth';

const AdminApp = (props) => {
    const {path} = useRouteMatch();
    const location = useLocation();

    // useEffect(() => {
    // }, []);

    return (
        <Switch location={location}>
            <Route exact path={`${path}/`} component={Auth}/>
            <Redirect to="/"/>
        </Switch>
    );
}

export default AdminApp;