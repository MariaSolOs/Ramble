import React from 'react';
import {Route, Redirect} from 'react-router-dom';

const PrivateRoute = ({children, test, ...rest}) => {
    return (
        <Route {...rest} render={() => (
            test? children : <Redirect to="/"/>
        )}/>
    );
}

export default PrivateRoute;