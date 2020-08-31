import React from 'react';
import {NavLink} from 'react-router-dom';

import Breadcrumbs from '@material-ui/core/Breadcrumbs';

import {makeStyles} from '@material-ui/core/styles';
import styles from './UserExperiencesStyles';
const useStyles = makeStyles(styles);

const UserExperiencesNavRow = () => {
    const classes = useStyles();
    return (
        <div>
            <Breadcrumbs separator="" classes={{ root: classes.nav }}>
                <NavLink to="/profile/exp/booked">Booked experiences</NavLink>
                <NavLink to="/profile/exp/saved">Saved</NavLink>
            </Breadcrumbs>
        </div>
    );
}
export default React.memo(UserExperiencesNavRow);

