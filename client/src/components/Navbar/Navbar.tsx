import { resetCache } from 'apollo-cache';

import { NavLink } from 'react-router-dom';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';

import { makeStyles } from '@material-ui/core/styles';
import styles from './Navbar.styles';
const useStyles = makeStyles(styles);

const Navbar = () => {
    const classes = useStyles();

    return (
        <AppBar color="default" position="absolute">
            <Toolbar className={classes.navBar}>
                <NavLink to="/approve">Approve experiences</NavLink>
                <NavLink to="/" onClick={resetCache}>Logout</NavLink>
            </Toolbar>
        </AppBar>
    );
}

export default Navbar;