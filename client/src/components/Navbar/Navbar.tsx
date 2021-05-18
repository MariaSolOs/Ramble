import { useState } from 'react';

import { useLanguageContext } from '../../context/languageContext';

import Menu from '@material-ui/core/Menu';
import IconButton from '@material-ui/core/IconButton';
import MenuItem from '@material-ui/core/MenuItem';
// import { NavLink } from 'react-router-dom';
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
                        // component={NavLink}
                        onClick={closeMenu}>
                            {text.becomeCreator}
                        </MenuItem>
                    </Menu>
                    {/* {props.isAuth? 
                            <MenuItem>{profileMenu}</MenuItem> : 
                            [<MenuItem component="button" key={0}
                            onClick={() => { dialogActions.openSignUpDialog();
                                             closeMenu(); }}>
                                {text.signUp[lang]}
                            </MenuItem>,
                            <MenuItem component="button" key={1}
                            onClick={() => { dialogActions.openLogInDialog();
                                             closeMenu(); }}>
                                {text.logIn[lang]}
                            </MenuItem>]}
                    </Menu> */}
                </div>
            </div>
        </AppBar>
    );
}

export default Navbar;