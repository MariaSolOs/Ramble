import React from 'react';
import { NavLink } from 'react-router-dom';

import Breadcrumbs from '@material-ui/core/Breadcrumbs';

import { makeStyles } from '@material-ui/core/styles';
import styles from './NavRowStyles';
const useStyles = makeStyles(styles);

const NavRow = () => {
    const classes = useStyles();

    return (
        <Breadcrumbs separator="" classes={{ root: classes.nav }}>
            <NavLink to="/creator/dashboard/bookings">
                Booking requests
            </NavLink>
            <NavLink to="/creator/dashboard/experiences">
                Experiences
            </NavLink>
            <NavLink to="/creator/dashboard/calendar">
                My calendar
            </NavLink>
        </Breadcrumbs>
    );
}
export default React.memo(NavRow);

