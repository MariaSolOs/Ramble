import React, { useState, useEffect, useCallback } from 'react';
import { NavLink, Link, useLocation } from 'react-router-dom';
import text from './ProfileMenuText';

import Menu from '@material-ui/core/Menu';
import MenuItem from '@material-ui/core/MenuItem';
import Avatar from '@material-ui/core/Avatar';

import { makeStyles } from '@material-ui/core/styles';
import styles from './ProfileMenuStyles';
const useStyles = makeStyles(styles);

const ProfileMenu = (props) => {
    const { pathname } = useLocation();
    const showNotif = props.numNotifs > 0 && pathname !== '/notifications';
    const { closeParentMenu, lang } = props;

    const classes = useStyles({
        withNotifIcon: showNotif,
        isCreator: props.isCreator
    });
    
    const [anchorEl, setAnchorEl] = useState(null);
    const openMenu = (e) => setAnchorEl(e.currentTarget);
    const closeMenu = useCallback(() => {
        setAnchorEl(null);
        closeParentMenu();
    }, [closeParentMenu]);

    // Close popover when window resizes
    useEffect(() => {
        window.addEventListener('resize', closeMenu);
        return () => { window.removeEventListener('resize', closeMenu); }
    }, [closeMenu]);

    return (
        <div className={classes.root}>
            <button onClick={openMenu} className={classes.dropButton}>
                {showNotif && <div className={classes.notifDot}/>}
                <Avatar src={props.userPic} alt="Profile picture"/>
                <span>{props.userName}</span>
            </button>
        <Menu
        id="profile-menu"
        anchorEl={anchorEl}
        getContentAnchorEl={null}
        anchorOrigin={{ vertical: 'bottom', horizontal: 'right' }}
        transformOrigin={{ vertical: 'top', horizontal: 'right' }}
        open={Boolean(anchorEl)}
        onClose={closeMenu}
        transitionDuration={500}
        classes={{ paper: classes.menuPaper, list: classes.menuList }}>
            <MenuItem 
            component={NavLink} 
            to="/profile/exp/booked"
            onClick={closeMenu}>
                {text.profile[lang]}
            </MenuItem>
            <MenuItem 
            component={NavLink}
            to="/notifications"
            onClick={closeMenu}>
                Notifications
                {showNotif && 
                    <div className={classes.numNotifs}>
                        {props.numNotifs}
                    </div>}
            </MenuItem>
            {props.isCreator && 
                <MenuItem 
                component={NavLink} 
                to="/experience/new/intro"
                onClick={closeMenu}>
                    {text.newExp[lang]}
                </MenuItem>}
            <MenuItem component={Link} to="/" onClick={props.logoutUser}>
                {text.logout[lang]}
            </MenuItem>
        </Menu>
      </div>
    );
}

export default ProfileMenu;