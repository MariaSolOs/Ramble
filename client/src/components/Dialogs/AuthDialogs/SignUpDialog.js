import React, {useEffect} from 'react';

//MUI
import Dialog from '@material-ui/core/Dialog';
import DialogContent from '@material-ui/core/DialogContent';
import CloseIcon from '@material-ui/icons/Close';
import EmailIcon from '@material-ui/icons/Email';
import facebookIcon from '../../../shared/images/facebook-icon.svg';
import googleIcon from '../../../shared/images/google-icon.svg';

//Styles
import {makeStyles} from '@material-ui/core/styles';
import styles from './AuthDialogStyles';
const useStyles = makeStyles(styles);

const SignUpDialog = (props) => {
    const classes = useStyles();

    //To return to the current page after signup
    useEffect(() => {
        window.localStorage.setItem('redirectURL', props.currentRoute);
    }, [props.currentRoute]);

    return (
        <Dialog open={props.open} onClose={props.onClose} aria-labelledby="form-dialog-header"
        classes={{ paper: classes.paper }}>
            <div className={classes.header}>
                <CloseIcon onClick={props.onClose} className={classes.closeIcon}/>
                <h5 className="title">Sign up</h5>
            </div>
            <DialogContent>
                <button className={classes.mediaButton} onClick={props.openEmailDialog}>
                    <EmailIcon className="icon"/>
                    Continue with Email
                </button>
                <a href="/api/auth/facebook" className={classes.link}>
                    <button className={classes.mediaButton}>
                        <img 
                        src={facebookIcon}
                        alt="Facebook icon" 
                        className="icon"/>
                        Continue with Facebook
                    </button>
                </a>
                <a href="/api/auth/google" className={classes.link}>
                    <button className={classes.mediaButton}>
                        <img 
                        src={googleIcon} 
                        className="icon" 
                        alt="Google icon"/>
                        Continue with Google
                    </button>
                </a>
                <p className={classes.switchDialogsText}>
                    Already have an account?&nbsp;&nbsp;
                    <span onClick={props.switchToLogin} >Log in</span>
                </p>  
            </DialogContent>
        </Dialog>
    );
}

export default React.memo(SignUpDialog);
