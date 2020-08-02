import React from 'react';
import {NavLink} from 'react-router-dom';

import Breadcrumbs from '@material-ui/core/Breadcrumbs';

import {makeStyles} from '@material-ui/core/styles';
const useStyles = makeStyles(() => ({
    nav: {
        display: 'flex',
        '& a': {
            fontFamily: 'Helvetica, sans-serif',
            fontWeight: 'bold',
            fontSize: '1.2rem',
            letterSpacing: '-0.05rem',
            textDecoration: 'none',
            color: '#ACACAC',
            '&.active, &:active, &:hover': {
                color: '#FFF',
                textDecoration: 'none'
            }
        }
    }
}));

const NavRow = () => {
    const classes = useStyles();
    return (
        <div>
            <Breadcrumbs separator="" classes={{ root: classes.nav }}>
                <NavLink to="/creator/dashboard/notifications">
                    Notifications
                </NavLink>
                <NavLink to="/creator/dashboard/bookings">
                    Booking requests
                </NavLink>
                <NavLink to="/creator/dashboard/payments">
                    Payments
                </NavLink>
                <NavLink to="/creator/dashboard/calendar">
                    My calendar
                </NavLink>
            </Breadcrumbs>
        </div>
    );
}
export default React.memo(NavRow);

