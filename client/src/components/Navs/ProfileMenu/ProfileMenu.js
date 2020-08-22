import React, {useState, useEffect, useCallback} from 'react';
import {NavLink, Link} from 'react-router-dom';

//MUI
import Menu from '@material-ui/core/Menu';
import MenuItem from '@material-ui/core/MenuItem';
import Avatar from '@material-ui/core/Avatar';

//Styles
import {makeStyles} from '@material-ui/core/styles';
import styles from './ProfileMenuStyles';
const useStyles = makeStyles(styles);

const ProfileMenu = (props) => {
    const classes = useStyles({
        withNotifIcon: props.numNotifs > 0,
        isCreator: props.isCreator
    });
    const {closeParentMenu} = props;

    const [anchorEl, setAnchorEl] = useState(null);
    const openMenu = (e) => setAnchorEl(e.currentTarget);
    const closeMenu = useCallback(() => {
        setAnchorEl(null);
        closeParentMenu();
    }, [closeParentMenu]);

    //Close popover when window resizes
    useEffect(() => {
        window.addEventListener('resize', closeMenu);
        return () => { window.removeEventListener('resize', closeMenu); }
    }, [closeMenu]);

    return (
        <div className={classes.root}>
            <button onClick={openMenu} className={classes.dropButton}>
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
            to="/profile/exp/past"
            onClick={closeMenu}>
                View Profile
            </MenuItem>
            <MenuItem 
            component={NavLink}
            to="/notifications"
            onClick={closeMenu}>
                Notifications
                {props.numNotifs > 0 &&
                <div className={classes.numNotifs}>
                    {props.numNotifs}
                </div>}
            </MenuItem>
            {props.isCreator && 
                <MenuItem 
                component={NavLink} 
                to="/experience/new/intro"
                onClick={closeMenu}>
                    New Experience
                </MenuItem>}
            <MenuItem component={Link} to="/" onClick={props.logoutUser}>
                Logout
            </MenuItem>
        </Menu>
      </div>
    );
}

export default ProfileMenu;