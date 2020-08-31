import React from 'react';
import {useDispatch} from 'react-redux';
import {Link, useHistory} from 'react-router-dom';
import {logout} from '../../../store/actions/user';

import AppBar from '../AppBar/AppBar';

import {makeStyles} from '@material-ui/core/styles';
import styles from './AdminNavStyles';
const useStyles = makeStyles(styles);

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
                {props.permissions.includes('addAdmin') && 
                    <Link to="/admin/register" className={classes.navLink}>
                        Register a new admin
                    </Link>}
                {props.permissions.includes('approveExp') && 
                    <Link to="/admin/approveExps" className={classes.navLink}>
                        Approve experiences
                    </Link>}
                {props.permissions.includes('seeReviews') && 
                    <Link to="/admin/exp-reviews" className={classes.navLink}>
                        See experience reviews
                    </Link>}
                {props.permissions.includes('maintenance') && 
                    <Link to="/admin/maintenance" className={classes.navLink}>
                        App maintenance
                    </Link>}
                <Link to="/" onClick={logoutAdmin} className={classes.navLink}>
                    Logout
                </Link>
            </div>
        </AppBar>
    ); 
}

export default AdminNav;