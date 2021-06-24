import { useState, useEffect, useCallback } from 'react';
import { NavLink, Link } from 'react-router-dom';

import { useLanguageContext } from 'context/languageContext';

import Menu from '@material-ui/core/Menu';
import MenuItem from '@material-ui/core/MenuItem';
import Avatar from '@material-ui/core/Avatar';

import { makeStyles } from '@material-ui/core/styles';
import styles from './ProfileMenu.styles';
const useStyles = makeStyles(styles);

type Props = {
    userName: string;
    userPicture: string;
    isCreator: boolean;
    onClose: () => void;
    onLogout: () => void;
}

export type StyleProps = {
    isCreator: boolean;
}

const ProfileMenu = (props: Props) => {
    const classes = useStyles({
        isCreator: props.isCreator
    });

    const { ProfileMenu: text } = useLanguageContext().appText;

    const [anchorEl, setAnchorEl] = useState<Element | null>(null);

    const { onClose } = props;
    const closeMenu = useCallback(() => { 
        // When closing, collapse both the parent menu and this menu
        setAnchorEl(null); 
        onClose();
    }, [onClose]);

    const logout = () => {
        sessionStorage.removeItem('ramble-token');
        localStorage.removeItem('ramble-token');
        localStorage.removeItem('ramble-redirect_page_token');
        closeMenu();
        props.onLogout();
    }

    // Close menu when window resizes
    useEffect(() => {
        window.addEventListener('resize', closeMenu);

        return () => { window.removeEventListener('resize', closeMenu); }
    }, [closeMenu]);

    return (
        <div>
            <button onClick={e => setAnchorEl(e.currentTarget)} className={classes.button}>
                <Avatar src={props.userPicture} alt="Profile picture" className={classes.avatar}>
                    {props.userName.charAt(0)}
                </Avatar>
                <span className={classes.userName}>{props.userName}</span>
            </button>
            <Menu
            anchorEl={anchorEl}
            getContentAnchorEl={null}
            open={Boolean(anchorEl)}
            onClose={closeMenu}
            transitionDuration={500}
            anchorOrigin={{
                vertical: 'bottom',
                horizontal: 'right'
            }}
            transformOrigin={{
                vertical: 'top',
                horizontal: 'right'
            }}
            classes={{
                paper: classes.menuPaper,
                list: classes.menuList
            }}>
                <MenuItem
                component={NavLink}
                onClick={closeMenu}
                to="/"
                className={classes.link}>
                    {text.profile}
                </MenuItem>
                {props.isCreator &&
                    <MenuItem
                    component={NavLink}
                    onClick={closeMenu}
                    to="/experience/new/setting"
                    className={classes.link}>
                        {text.newExperience}
                    </MenuItem>}
                <MenuItem
                component={Link}
                to="/"
                onClick={logout}
                className={classes.link}>
                    {text.logout}
                </MenuItem>
            </Menu>
        </div>
    );
}

export default ProfileMenu;