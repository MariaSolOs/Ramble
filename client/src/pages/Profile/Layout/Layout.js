import React, {useState} from 'react';
import {connect} from 'react-redux';
import {editUserProfile} from '../../../store/actions/user';
import {showSnackbar} from '../../../store/actions/ui';
import {useLocation} from 'react-router-dom';
import Files from 'react-butterfiles';

//Components
import Navbar from './Navbar';
import Tooltip from '@material-ui/core/Tooltip';

//Styles
import {makeStyles} from '@material-ui/core/styles';
import styles from './LayoutStyles';
const useStyles = makeStyles(styles);

const Layout = (props) => {
    const classes = useStyles();

    const {pathname} = useLocation();

    //To show the current profile image (if being updated)
    const [photo, setPhoto] = useState(props.photo);
    const handlePhotoChange = (files) => {
        setPhoto(files[0].src.base64);
        props.changeProfilePic(files[0].src.base64);
    }

    return (
        <div className={classes.root}>
            <div className={classes.header}>
                {pathname === '/profile/info' ? 
                <Files
                convertToBase64
                accept={['image/jpg', 'image/jpeg', 'image/png']}
                onSuccess={handlePhotoChange}
                onError={props.showError}>
                {({browseFiles}) => (
                    <>
                        <Tooltip 
                        title="Change my profile picture"
                        placement="right-start"
                        classes={{
                            tooltip: classes.tooltip,
                            tooltipPlacementRight: classes.tooltipPlacement
                        }}>
                            <img src={photo} alt="User avatar"
                            onClick={browseFiles}/>
                        </Tooltip>
                    </>
                )}
                </Files> : <img src={photo} alt="User avatar"/>}
                <div className={classes.userHeader}>
                    <h1>{props.fstName}</h1>
                    <p>{props.city}</p>
                </div>
            </div>
            <div className={classes.body}>   
                <div className={classes.navbar}>
                    <Navbar/>
                </div>
                <div className={classes.shadowSeparator}/>
                <div className={classes.page}>
                    {props.children}
                </div>
            </div>
        </div>
    );
}

const mapStateToProps = (state) => ({
    fstName: state.user.profile.fstName,
    photo: state.user.profile.photo,
    city: state.user.profile.city
});
const mapDispatchToProps = (dispatch) => ({
    changeProfilePic: (photo) => dispatch(editUserProfile({photo})),
    showError: () => dispatch(showSnackbar("We couldn't change your profile picture..."))
});

export default connect(mapStateToProps, mapDispatchToProps)(Layout);