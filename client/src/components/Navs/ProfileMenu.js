import React, {useState, useEffect, useCallback} from 'react';
import {NavLink, Link} from 'react-router-dom';

//MUI
import Menu from '@material-ui/core/Menu';
import Avatar from '@material-ui/core/Avatar';

//Styles
import {makeStyles} from '@material-ui/core/styles';
import { MenuItem } from '@material-ui/core';
const useStyles = makeStyles((theme) => ({
    //Dropdown button
    dropButton: {
        height: 45,
        width: 100,
        padding: '1% 3%',
        backgroundColor: 'rgba(65, 65, 65, 0.9)',
        borderRadius: '1.5rem',
        display: 'flex',
        alignItems: 'center',
        border: 'none',
        cursor: 'pointer',
        '&:focus': { outline: 'none' },
        '& span': {
            color: '#E8E8E8',
            fontFamily: 'Helvetica, sans-serif',
            fontWeight: 'bold',
            fontSize: '1rem',
            letterSpacing: '-0.06rem',
            marginLeft: '0.6rem'
        }
    },

    menuPaper: {
        backgroundColor: 'rgba(65, 65, 65, 0.9)',
        borderRadius: '1rem',
        marginTop: '0.4rem',
        padding: '0 4px',
        '&.MuiPopover-paper': {
            minWidth: 175
        }
    },
    menuList: {
        '& .MuiListItem-root': {
            width: '100%',
            fontFamily: 'Helvetica, sans-serif',
            fontWeight: 'bold',
            fontSize: '0.9rem',
            letterSpacing: '-0.05rem',
            color: '#E8E8E8',
            textAlign: 'center',
            justifyContent: 'center',
            padding: '6px 20px',
            margin: '0 0 4px 0',
            '&:last-child': { margin: 0 },
            borderRadius: '0.65rem',
        },
        '& a.active, & a:hover': {
            backgroundColor: 'rgba(118, 118, 118, 0.96)',
            transition: 'all 0.3s ease-in-out'
        }
    }
}));

const ProfileMenu = (props) => {
    const classes = useStyles();
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
                <Avatar src={props.userPic} alt="Logged user"/>
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
            {props.isCreator && 
                <MenuItem 
                component={NavLink} 
                to="/creator/dashboard/bookings"
                onClick={closeMenu}>
                    Creator dashboard
                </MenuItem>}
            <MenuItem component={NavLink} to="/experience/new/intro"
            onClick={closeMenu}>
                New Experience
            </MenuItem>
            <MenuItem component={Link} to="/" onClick={props.logoutUser}>
                Logout
            </MenuItem>
        </Menu>
      </div>
    );
}

export default ProfileMenu;