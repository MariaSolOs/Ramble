import React, { useState, useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { emailAuth, adminLogin } from '../../../store/actions/user';
import { LogInDialogText as text } from './AuthDialogsText';

import FormControl from '@material-ui/core/FormControl';
import FormLabel from '@material-ui/core/FormLabel';
import Dialog from '@material-ui/core/Dialog';
import DialogContent from '@material-ui/core/DialogContent';
import CloseIcon from '@material-ui/icons/Close';
import facebookIcon from '../../../shared/images/facebook-icon.svg';
import googleIcon from '../../../shared/images/google-icon.svg';
import TextField from '../../Input/TextField/TextField';

import { makeStyles } from '@material-ui/core/styles';
import styles from './AuthDialogStyles';
const useStyles = makeStyles(styles);

const initForm = {
    email: '',
    password: ''
}

const LogInDialog = (props) => {
    const classes = useStyles();
    const dispatch = useDispatch();

    // To return to the current page after login
    useEffect(() => {
        window.localStorage.setItem('redirectURL', props.currentRoute);
    }, [props.currentRoute]);
    
    // Log in form
    const [values, setValues] = useState(initForm);
    const handleChange = (e) => {
        setValues({
            ...values,
            [e.target.name]: e.target.value
        });
    }

    const handleClose = () => {
        setValues(initForm);
        props.onClose();
    }

    const handleSubmit = (e) => {
        e.preventDefault();
        if(values.email.startsWith('RAMBLE_ADMIN__')) {
            const username = values.email.replace('RAMBLE_ADMIN__', '');
            dispatch(adminLogin({
                username, 
                password: values.password
            }));
        } else { dispatch(emailAuth(values, 'login')); }
        handleClose();
    }

    const handleForgotPassword = () => {
        handleClose();
        props.openForgotPwdDialog();
    }

    return (
        <Dialog 
        open={props.open} 
        onClose={handleClose} 
        classes={{ paper: classes.paper }}>
            <div className={classes.header}>
                <CloseIcon onClick={handleClose} className={classes.closeIcon}/>
                <h5 className="title">{text.logIn[props.lang]}</h5>
            </div>
            <DialogContent>
                <form onSubmit={handleSubmit}>
                    <FormControl className={classes.formControl} fullWidth>
                        <FormLabel htmlFor="email">
                            {text.email[props.lang]}
                        </FormLabel>
                        <TextField 
                        id="email"
                        name="email"
                        value={values.email}
                        onChange={handleChange}
                        required/>
                    </FormControl>
                    <FormControl className={classes.formControl} fullWidth>
                        <FormLabel htmlFor="password">
                            {text.password[props.lang]}
                        </FormLabel>
                        <TextField 
                        type="password"
                        id="password"
                        name="password" 
                        value={values.password}
                        onChange={handleChange}
                        required/>
                    </FormControl>
                    <p 
                    className={classes.forgotLink} 
                    onClick={handleForgotPassword}>
                        {text.forgotPwd[props.lang]}
                    </p>
                    <button 
                    type="submit"
                    className={classes.submitButton}>
                        {text.logIn[props.lang]}
                    </button>
                </form>
                <div className={classes.formDivisor}/>
                <a href="/api/auth/facebook" className={classes.link}>
                    <button className={classes.mediaButton}>
                        <img 
                        src={facebookIcon}
                        alt="Facebook log in" 
                        className="icon" 
                        style={{height: '100%'}}/>
                        {text.fbLogin[props.lang]}
                    </button>
                </a>
                <a href="/api/auth/google" className={classes.link}> 
                    <button className={classes.mediaButton}>
                        <img 
                        src={googleIcon}
                        alt="Google log in" 
                        className="icon"/>
                        {text.googleLogin[props.lang]}
                    </button> 
                </a>
            </DialogContent>
        </Dialog>
    );
}

export default LogInDialog;
