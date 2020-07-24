import React from 'react';
import {NavLink} from 'react-router-dom';

import Breadcrumbs from '@material-ui/core/Breadcrumbs';

import {makeStyles} from '@material-ui/core/styles';
const useStyles = makeStyles(() => ({
    nav: {
        display: 'flex',
        marginLeft: -100,
        '& a': {
            fontFamily: 'Helvetica, sans-serif',
            fontWeight: 'bold',
            fontSize: '1.1rem',
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

const UserExperiencesNavRow = () => {
    const classes = useStyles();
    return (
        <div>
            <Breadcrumbs separator="" classes={{ root: classes.nav }}>
                <NavLink to="/profile/exp/past">Past experiences</NavLink>
                <NavLink to="/profile/exp/saved">Saved</NavLink>
            </Breadcrumbs>
        </div>
    );
}
export default React.memo(UserExperiencesNavRow);
