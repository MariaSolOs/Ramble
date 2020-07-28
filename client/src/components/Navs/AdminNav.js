import React from 'react';
import {useDispatch} from 'react-redux';
import {Link, useHistory} from 'react-router-dom';
import {logout} from '../../store/actions/user';

import AppBar from './AppBar';

//Styles
import {makeStyles} from '@material-ui/core/styles';
const useStyles = makeStyles(() => ({
    root: {
        position: 'absolute',
        right: 0
    },
    navLink: {
        padding: 8,
        fontFamily: 'Helvetica, sans-serif',
        fontWeight: 'bold',
        fontSize: '1.05rem',
        letterSpacing: '-0.07rem',
        whiteSpace: 'nowrap',
        color: '#ACACAC',
        '&:hover': { color: '#FFF' }
    }
}));

const AdminNav = (props) => {
    const classes = useStyles();

    //For logging out the user
    const history = useHistory();
    const dispatch = useDispatch();
    const logoutAdmin = (e) => { 
        dispatch(logout()); 
        history.push('/');
    }

    return (
        <AppBar onRambleClick={logoutAdmin}>
            <div className={classes.root}>
                {props.canRegister && 
                    <Link to="/admin/register" className={classes.navLink}>
                        Register a new admin
                    </Link>}
                {props.canEditExps && 
                    <Link to="/admin/approveExps" className={classes.navLink}>
                        Approve experiences
                    </Link>}
                {props.isAuth && 
                    <Link to="/" onClick={logoutAdmin} className={classes.navLink}>
                        Logout
                    </Link>}
            </div>
        </AppBar>
    ); 
}

export default AdminNav;