import React, { useEffect } from 'react';
import { SignUpDialogText as text } from './AuthDialogsText';

import Dialog from '@material-ui/core/Dialog';
import DialogContent from '@material-ui/core/DialogContent';
import CloseIcon from '@material-ui/icons/Close';
import EmailIcon from '@material-ui/icons/Email';
import facebookIcon from '../../../shared/images/facebook-icon.svg';
import googleIcon from '../../../shared/images/google-icon.svg';

import { makeStyles } from '@material-ui/core/styles';
import styles from './AuthDialogStyles';
const useStyles = makeStyles(styles);

const SignUpDialog = (props) => {
    const classes = useStyles();

    // To return to the current page after signup
    useEffect(() => {
        window.localStorage.setItem('redirectURL', props.currentRoute);
    }, [props.currentRoute]);

    return (
        <Dialog open={props.open} onClose={props.onClose} aria-labelledby="form-dialog-header"
        classes={{ paper: classes.paper }}>
            <div className={classes.header}>
                <CloseIcon onClick={props.onClose} className={classes.closeIcon}/>
                <h5 className="title">{text.signUp[props.lang]}</h5>
            </div>
            <DialogContent>
                <button className={classes.mediaButton} onClick={props.openEmailDialog}>
                    <EmailIcon className="icon"/>
                    {text.emailContinue[props.lang]}
                </button>
                <a href="/api/auth/facebook" className={classes.link}>
                    <button className={classes.mediaButton}>
                        <img 
                        src={facebookIcon}
                        alt="Facebook icon" 
                        className="icon"/>
                        {text.facebookContinue[props.lang]}
                    </button>
                </a>
                <a href="/api/auth/google" className={classes.link}>
                    <button className={classes.mediaButton}>
                        <img 
                        src={googleIcon} 
                        className="icon" 
                        alt="Google icon"/>
                        {text.googleContinue[props.lang]}
                    </button>
                </a>
                <p className={classes.switchDialogsText}>
                    {text.alreadyAccount[props.lang]}&nbsp;&nbsp;
                    <span onClick={props.switchToLogin}>
                        {text.logIn[props.lang]}
                    </span>
                </p>  
            </DialogContent>
        </Dialog>
    );
}

export default React.memo(SignUpDialog);
