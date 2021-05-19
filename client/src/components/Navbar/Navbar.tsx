import { useState, useEffect } from 'react';

import { useLanguageContext } from '../../context/languageContext';

import Menu from '@material-ui/core/Menu';
import IconButton from '@material-ui/core/IconButton';
import MenuItem from '@material-ui/core/MenuItem';
import { Link } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faAngleDoubleDown } from '@fortawesome/free-solid-svg-icons/faAngleDoubleDown';
import AppBar from '../AppBar/AppBar';

import { makeStyles } from '@material-ui/core/styles';
import styles from './NavbarStyles';
const useStyles = makeStyles(styles);

const Navbar = () => {
    const { Navbar: text } = useLanguageContext().appText;

    const classes = useStyles();

    const [anchorEl, setAnchorEl] = useState<Element | null>(null);
    const closeMenu = () => { setAnchorEl(null); }
    
    // Close popover when window resizes
    useEffect(() => {
        window.addEventListener('resize', closeMenu);

        return () => { window.removeEventListener('resize', closeMenu); }
    }, []);

    return (
        <AppBar>
            <div className={classes.root}>
                <div className={classes.collapsedNav}>
                    <IconButton 
                    disableRipple 
                    className={classes.toggleIcon}
                    onClick={e => setAnchorEl(e.currentTarget)}>
                        <FontAwesomeIcon icon={faAngleDoubleDown} />
                    </IconButton>
                    <Menu
                    anchorEl={anchorEl}
                    getContentAnchorEl={null}
                    anchorOrigin={{
                        vertical: 'bottom',
                        horizontal: 'right'
                    }}
                    transformOrigin={{
                        vertical: 'top',
                        horizontal: 'right'
                    }}
                    open={Boolean(anchorEl)}
                    onClose={closeMenu}
                    classes={{
                        paper: classes.menuPaper,
                        list: classes.menuList
                    }}>
                        <MenuItem
                        component={Link}
                        to="/"
                        onClick={closeMenu}>
                            {text.becomeCreator}
                        </MenuItem>
                        <MenuItem
                        component="button"
                        onClick={closeMenu}>
                            {text.signUp}
                        </MenuItem>
                        <MenuItem
                        component="button"
                        onClick={closeMenu}>
                            {text.logIn}
                        </MenuItem>
                    </Menu>
                </div>
                <div className={classes.expandedLinks}>
                    <Link
                    to="/creator/become"
                    className={`${classes.navLink} ${classes.whiteNavLink}`}>
                        {text.becomeCreator}
                    </Link>
                    <button
                    className={`${classes.dialogToggler} ${classes.navLink}`}>
                        {text.signUp}
                    </button>
                    <button
                    className={`${classes.dialogToggler} ${classes.navLink}`}>
                        {text.logIn}
                    </button>
                </div>
            </div>
        </AppBar>
    );
}

export default Navbar;