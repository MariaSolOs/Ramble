import React from 'react';
import { NavLink } from 'react-router-dom';

import { useLanguageContext } from 'context/languageContext';

import { makeStyles } from '@material-ui/core/styles';
import styles from './Layout.styles';
const useStyles = makeStyles(styles);

const Layout: React.FC = (props) => {
    const { CreatorDashboard_Layout: text } = useLanguageContext().appText;
    const classes = useStyles();

    return (
        <div className={classes.root}>
            <h3 className={classes.dashboardTitle}>{text.dashboardTitle}</h3>
            <NavLink to="/creator/dashboard/booking-requests" className={classes.navButton}>
                {text.bookingRequests}
            </NavLink>
            <NavLink to="/creator/dashboard/calendar" className={classes.navButton}>
                {text.calendar}
            </NavLink>
            <NavLink to="/creator/dashboard/experiences" className={classes.navButton}>
                {text.createdExperiences}
            </NavLink>
            {props.children}
        </div>
    );
}

export default Layout;