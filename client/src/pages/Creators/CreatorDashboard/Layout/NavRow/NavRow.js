import React from 'react';
import { NavLink } from 'react-router-dom';
import text from './NavRowText';

import Breadcrumbs from '@material-ui/core/Breadcrumbs';

import { makeStyles } from '@material-ui/core/styles';
import styles from './NavRowStyles';
const useStyles = makeStyles(styles);

const NavRow = ({ lang }) => {
    const classes = useStyles();

    return (
        <Breadcrumbs separator="" classes={{ root: classes.nav }}>
            <NavLink to="/creator/dashboard/bookings-requests">
                {text.bookRequests[lang]}
            </NavLink>
            <NavLink to="/creator/dashboard/experiences">
                {text.exps[lang]}
            </NavLink>
            <NavLink to="/creator/dashboard/availabilities">
                {text.avails[lang]}
            </NavLink>
            <NavLink to="/creator/dashboard/bookings-upcoming">
                {text.upcoming[lang]}
            </NavLink>
        </Breadcrumbs>
    );
}
export default React.memo(NavRow);

