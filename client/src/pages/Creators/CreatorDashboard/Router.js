import React from 'react';
import {useRouteMatch, useLocation, Switch, Route} from 'react-router-dom';

//Pages and layout
import BookingRequests from './BookingRequests/BookingRequests';
import Calendar from './Calendar/Calendar';

const Router = (props) => {
    const {path} = useRouteMatch();
    const location = useLocation();

    return (
        <Switch location={location}>
            <Route path={`${path}/bookings`} component={BookingRequests}/>
            <Route path={`${path}/calendar`} component={Calendar}/>
        </Switch>
    );
}

export default Router;