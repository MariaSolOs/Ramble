import React from 'react';
import {useRouteMatch, useLocation, Switch, Route} from 'react-router-dom';

//Pages and layout
import BookingRequests from './BookingRequests/BookingRequests';
import Notifications from './Notifications/Notifications';
import Layout from './Layout/Layout';

const Router = (props) => {
    const {path} = useRouteMatch();
    const location = useLocation();

    return (
        <Layout>
            <Switch location={location}>
                <Route path={`${path}/bookings`} component={BookingRequests}/>
                <Route path={`${path}/notifications`} component={Notifications}/>
            </Switch>
        </Layout>
    );
}

export default Router;