import React, { useState } from 'react';
import axios from '../../../tokenizedAxios';
import { ForgotPwdDialogText as text } from './AuthDialogsText';

import FormControl from '@material-ui/core/FormControl';
import Dialog from '@material-ui/core/Dialog';
import DialogContent from '@material-ui/core/DialogContent';
import CloseIcon from '@material-ui/icons/Close';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faPaperPlane } from '@fortawesome/free-regular-svg-icons/faPaperPlane';
import TextField from '../../Input/TextField/TextField';

import { makeStyles } from '@material-ui/core/styles';
import styles from './AuthDialogStyles';
const useStyles = makeStyles(styles);

const ForgotPwdDialog = (props) => {
    const classes = useStyles();

    const [email, setEmail] = useState('');
    const [errMsg, setErrMsg] = useState('');
    const [showSuccessMsg, setShowSuccessMsg] = useState(false);

    const handleChange = (e) => { setEmail(e.target.value); }

    const handleClose = () => {
        props.onClose();
        setTimeout(() => {
            setEmail('');
            setErrMsg('');
            setShowSuccessMsg(false);
        }, 1000);
    }

    const handleSubmit = (e) => {
        e.preventDefault();

        axios.post('api/auth/send-pwd-reset', { email }).then(() => {
            setShowSuccessMsg(true);
            setTimeout(() => { handleClose(); }, 3000);
        }).catch(err => {
            if (err.response.status === 404) {
                setErrMsg("We couldn't find an account with that email...");
            }
        });
    }

    return (
        <Dialog 
        open={props.open} 
        onClose={handleClose} 
        classes={{ paper: classes.paper }}>
            {showSuccessMsg? 
            <div className={classes.resetEmailSentMsg}>
                <FontAwesomeIcon icon={faPaperPlane}/>
                <p className={classes.forgotTitle}>{text.emailSent[props.lang]}</p>
            </div> :
            <>
            <CloseIcon onClick={handleClose} className={classes.closeIcon}/>
            <DialogContent> 
                <form onSubmit={handleSubmit}>
                    <FormControl className={classes.formControl} fullWidth>
                        <p className={classes.forgotTitle}>
                            {text.enterEmail[props.lang]}
                        </p>
                        <p className={classes.forgotMessage}>
                            {text.sendLink[props.lang]}
                        </p>
                        <TextField 
                        id="email"
                        name="email"
                        value={email}
                        onChange={handleChange}
                        helperText={errMsg.length > 0 && errMsg}
                        required/>
                    </FormControl>
                    <button 
                    type="submit"
                    className={classes.submitButton}>
                        {text.resetPwd[props.lang]}
                    </button>
                </form>
            </DialogContent>
            </>}
        </Dialog>
    );
}

export default ForgotPwdDialog;