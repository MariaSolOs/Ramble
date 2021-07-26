import { useState, useEffect } from 'react';
import { useReactiveVar } from '@apollo/client';

import { useLanguageContext } from 'context/languageContext';
import { useUiContext } from 'context/uiContext';
import { userProfileVar } from 'store/user-cache';

import Menu from '@material-ui/core/Menu';
import IconButton from '@material-ui/core/IconButton';
import MenuItem from '@material-ui/core/MenuItem';
import { Link } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faAngleDoubleDown } from '@fortawesome/free-solid-svg-icons/faAngleDoubleDown';
import AppBar from 'components/AppBar/AppBar';
import ProfileMenu from './ProfileMenu';

import { makeStyles } from '@material-ui/core/styles';
import styles from './Navbar.styles';
const useStyles = makeStyles(styles);

const Navbar = () => {
    const { Navbar: text } = useLanguageContext().appText;
    const classes = useStyles();
    const { uiDispatch } = useUiContext();

    const { 
        userId,
        creatorId,
        firstName,
        photo
    } = useReactiveVar(userProfileVar);
    const isLoggedIn = Boolean(userId);
    const isCreator = Boolean(creatorId);

    const [anchorEl, setAnchorEl] = useState<Element | null>(null);
    const closeMenu = () => { setAnchorEl(null); }
    
    // Close menu when window resizes
    useEffect(() => {
        window.addEventListener('resize', closeMenu);

        return () => { window.removeEventListener('resize', closeMenu); }
    }, []);

    const profileMenu = (
        <ProfileMenu 
        userName={firstName}
        userPicture={photo}
        onClose={closeMenu}
        isCreator={isCreator} />
    );

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
                        to={isCreator ? '/creator/dashboard/booking-requests' : '/creator/become'}
                        onClick={closeMenu}>
                            {isCreator ? text.creatorDashboard : text.becomeCreator}
                        </MenuItem>
                        {isLoggedIn ? 
                            <MenuItem className={classes.profileButton}>
                                {profileMenu}
                            </MenuItem> :
                            [<MenuItem
                            key={0}
                            component="button"
                            onClick={() => {
                                uiDispatch({ type: 'OPEN_SIGN_UP_DIALOG' });
                                closeMenu();
                            }}>
                                {text.signUp}
                            </MenuItem>,
                            <MenuItem
                            key={1}
                            component="button"
                            onClick={() => {
                                uiDispatch({ type: 'OPEN_LOG_IN_DIALOG' });
                                closeMenu();
                            }}>
                                {text.logIn}
                            </MenuItem>]}
                    </Menu>
                </div>
                <div className={classes.expandedLinks}>
                    <Link
                    to={isCreator ? '/creator/dashboard/booking-requests' : '/creator/become'}
                    className={`${classes.navLink} ${classes.whiteNavLink}`}>
                        {isCreator ? text.creatorDashboard : text.becomeCreator}
                    </Link>
                    {isLoggedIn ? 
                        profileMenu : 
                        <>
                            <button
                            onClick={() => uiDispatch({ type: 'OPEN_SIGN_UP_DIALOG' })}
                            className={`${classes.dialogToggler} ${classes.navLink}`}>
                                {text.signUp}
                            </button>
                            <button
                            onClick={() => uiDispatch({ type: 'OPEN_LOG_IN_DIALOG' })}
                            className={`${classes.dialogToggler} ${classes.navLink}`}>
                                {text.logIn}
                            </button>
                        </>}
                </div>
            </div>
        </AppBar>
    );
}

export default Navbar;