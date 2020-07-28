import React, {useState, useEffect} from 'react';
import {connect} from 'react-redux';
import {logout} from '../../../store/actions/user';
import {NavLink, Link, useHistory} from 'react-router-dom';
import withAuthDialogs from '../../../hoc/withAuthDialogs/withAuthDialogs';

//MUI
import Menu from '@material-ui/core/Menu';
import IconButton from '@material-ui/core/IconButton';
import MenuItem from '@material-ui/core/MenuItem';

import AppBar from '../AppBar';
import ProfileMenu from '../ProfileMenu';
import {FontAwesomeIcon} from '@fortawesome/react-fontawesome';
import {faAngleDoubleDown} from '@fortawesome/free-solid-svg-icons/faAngleDoubleDown';

import {makeStyles} from '@material-ui/core/styles';
import styles from './CollapsingNavStyles';
const useStyles = makeStyles(styles);

const CollapsingNav = (props) => {
    const classes = useStyles();

    const [anchorEl, setAnchorEl] = useState(null);
    const openMenu = (e) => setAnchorEl(e.currentTarget);
    const closeMenu = () => setAnchorEl(null);

    const profileMenu = props.isAuth &&
                        <ProfileMenu 
                        userName={props.userName}
                        userPic={props.userPic}
                        closeParentMenu={closeMenu}
                        logoutUser={props.logoutUser}/>;

    //Close popover when window resizes
    useEffect(() => {
        window.addEventListener('resize', closeMenu);
        return () => window.removeEventListener('resize', closeMenu);
    }, []);

    const {dialogActions} = props;

    //Clicking on the Ramble logo redirect to the home page
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
                        <MenuItem component={NavLink} to="/become-creator"
                        onClick={closeMenu}>
                            Become a Creator
                        </MenuItem>
                        {props.isAuth? 
                            <MenuItem>{profileMenu}</MenuItem> : 
                            [<MenuItem component="button" key={0}
                            onClick={() => { dialogActions.openSignUpDialog();
                                            closeMenu(); }}>
                                Sign up
                            </MenuItem>,
                            <MenuItem component="button" key={1}
                            onClick={() => { dialogActions.openLogInDialog();
                                            closeMenu(); }}>
                                Log in
                            </MenuItem>]}
                    </Menu>
                </div>
                <div className={classes.expandedLinks}>
                    <Link to="/become-creator" className={classes.navLink} style={{color: '#FFF'}}>
                        Become a Creator
                    </Link>
                    {props.isAuth? profileMenu : 
                    <>
                        <button 
                        onClick={() => dialogActions.openSignUpDialog()}
                        className={`${classes.navLink} ${classes.dialogToggler}`}>
                            Sign up
                        </button>
                        <button as="button" 
                        onClick={() => dialogActions.openLogInDialog()}
                        className={`${classes.navLink} ${classes.dialogToggler}`}>
                            Log in
                        </button>
                    </>}
                </div>
            </div>
        </AppBar>
    );
}

const mapStateToProps = (state) => ({
    isAuth: (state.user.token !== null),
    userName: state.user.data.fstName,
    userPic: state.user.data.photo
});
const mapDispatchToProps = (dispatch) => ({
    logoutUser: () => dispatch(logout())
});

export default connect(mapStateToProps, mapDispatchToProps)(withAuthDialogs(CollapsingNav));