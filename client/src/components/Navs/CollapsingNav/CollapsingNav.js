import React, { useState, useEffect } from 'react';
import { connect } from 'react-redux';
import { logout } from '../../../store/actions/user';
import { NavLink, Link, useHistory } from 'react-router-dom';
import withAuthDialogs from '../../../hoc/withAuthDialogs/withAuthDialogs';
import text from './CollapsingNavText';

import Menu from '@material-ui/core/Menu';
import IconButton from '@material-ui/core/IconButton';
import MenuItem from '@material-ui/core/MenuItem';
import AppBar from '../AppBar/AppBar';
import ProfileMenu from '../ProfileMenu/ProfileMenu';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faAngleDoubleDown } from '@fortawesome/free-solid-svg-icons/faAngleDoubleDown';

import { makeStyles } from '@material-ui/core/styles';
import styles from './CollapsingNavStyles';
const useStyles = makeStyles(styles);

const CollapsingNav = (props) => {
    const classes = useStyles();

    const { dialogActions, lang } = props;

    const [anchorEl, setAnchorEl] = useState(null);
    const openMenu = (e) => setAnchorEl(e.currentTarget);
    const closeMenu = () => setAnchorEl(null);

    const profileMenu = props.isAuth &&
                        <ProfileMenu 
                        userName={props.userName}
                        userPic={props.userPic}
                        numNotifs={props.numNotifs}
                        isCreator={props.isCreator}
                        closeParentMenu={closeMenu}
                        logoutUser={props.logoutUser}
                        lang={lang}/>;

    // Close popover when window resizes
    useEffect(() => {
        window.addEventListener('resize', closeMenu);
        return () => window.removeEventListener('resize', closeMenu);
    }, []);

    // Clicking on the Ramble logo redirect to the home page
    const history = useHistory();
    const handleRambleClick = () => history.push('/');

    return (
        <AppBar onRambleClick={handleRambleClick}>
            <div className={classes.root}>
                <div className={classes.collapsedNav}>
                    <IconButton onClick={openMenu} disableRipple 
                    className={classes.toggleIcon}>
                        <FontAwesomeIcon icon={faAngleDoubleDown}/>
                    </IconButton>
                    <Menu 
                    id="navbar-menu"
                    anchorEl={anchorEl}
                    getContentAnchorEl={null}
                    anchorOrigin={{ vertical: 'bottom', horizontal: 'right' }}
                    transformOrigin={{ vertical: 'top', horizontal: 'right' }}
                    open={Boolean(anchorEl)}
                    onClose={closeMenu}
                    classes={{
                        paper: classes.collapsedPaper,
                        list: classes.collapsedList
                    }}>
                        <MenuItem 
                        component={NavLink} 
                        to={props.isCreator? '/creator/dashboard/bookings-requests' : 
                                             '/creator/become'}
                        onClick={closeMenu}>
                            {(props.isCreator && props.numBookings > 0) && 
                            <div className={classes.numBookings}>
                                {props.numBookings}
                            </div>}
                            {props.isCreator? text.creatorDB[lang]: text.becomeCreator[lang]}
                        </MenuItem>
                        {props.isAuth? 
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
                    </Menu>
                </div>
                <div className={classes.expandedLinks}>
                    {props.isCreator? 
                    <Link
                    to="/creator/dashboard/bookings-requests"
                    className={classes.navLink}
                    style={{ color: '#FFF' }}>
                        {props.numBookings > 0 &&
                            <div className={classes.numBookings}>
                                {props.numBookings}
                            </div>}
                        {text.creatorDB[lang]}
                    </Link> : 
                    <Link 
                    to="/creator/become"
                    className={classes.navLink}
                    style={{ color: '#FFF' }}>
                        {text.becomeCreator[lang]}
                    </Link>}
                    {props.isAuth? profileMenu : 
                    <>
                        <button 
                        onClick={() => dialogActions.openSignUpDialog()}
                        className={`${classes.navLink} ${classes.dialogToggler}`}>
                            {text.signUp[lang]}
                        </button>
                        <button as="button" 
                        onClick={() => dialogActions.openLogInDialog()}
                        className={`${classes.navLink} ${classes.dialogToggler}`}>
                            {text.logIn[lang]}
                        </button>
                    </>}
                </div>
            </div>
        </AppBar>
    );
}

const mapStateToProps = (state) => ({
    isAuth: state.user.profile.id !== null,
    isCreator: state.user.creator.id !== null,
    numNotifs: state.user.notifs.length,
    numBookings: state.user.creator.numBookings,
    userName: state.user.profile.fstName,
    userPic: state.user.profile.photo,
    lang: state.ui.language
});
const mapDispatchToProps = (dispatch) => ({
    logoutUser: () => dispatch(logout())
});

export default connect(mapStateToProps, mapDispatchToProps)(withAuthDialogs(CollapsingNav));