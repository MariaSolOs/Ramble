import React, {useEffect} from 'react';

//MUI
import Dialog from '@material-ui/core/Dialog';
import DialogContent from '@material-ui/core/DialogContent';
import CloseIcon from '@material-ui/icons/Close';
import EmailIcon from '@material-ui/icons/Email';

//Styles
import {makeStyles} from '@material-ui/core/styles';
import styles from './DialogStyles';
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
                <CloseIcon onClick={props.onClose} className="closeIcon"/>
                <h5 className="title">Sign up</h5>
            </div>
            <DialogContent>
                <button className={classes.mediaButton} onClick={props.openEmailDialog}>
                    <EmailIcon className="icon"/>
                    Continue with Email
                </button>
                <a href="/api/auth/facebook" className={classes.link}>
                    <button className={classes.mediaButton}>
                        <img src="https://img.icons8.com/color/48/000000/facebook-new.png" 
                        alt="Facebook icon" className="icon"
                        style={{height: 26, width: 26}}/>
                        Continue with Facebook
                    </button>
                </a>
                <a href="/api/auth/google" className={classes.link}>
                    <button className={classes.mediaButton}>
                        <img src="https://img.icons8.com/color/48/000000/google-logo.png" 
                        className="icon" alt="Google icon" style={{height: 24, width: 24}}/>
                        Continue with Google
                    </button>
                </a>
                <p className={classes.switchDialogsLink}>
                    Already have an account?&nbsp;&nbsp;
                    <span onClick={props.switchToLogin} >Log in</span>
                </p>  
                <a href="https://icons8.com/icons/set/social-media"
                className={classes.iconsCreditLink}>
                    Media icons by Icons8
                </a>
            </DialogContent>
        </Dialog>
    );
}

export default React.memo(SignUpDialog);
