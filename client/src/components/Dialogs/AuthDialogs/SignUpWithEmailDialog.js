import React, { useState, useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { emailAuth } from '../../../store/actions/user';
import { SignUpWithEmailDialogText as text } from './AuthDialogsText';

import FormControl from '@material-ui/core/FormControl';
import FormLabel from '@material-ui/core/FormLabel';
import Dialog from '@material-ui/core/Dialog';
import DialogContent from '@material-ui/core/DialogContent';
import CloseIcon from '@material-ui/icons/Close';
import TextField from '../../Input/TextField/TextField';

import { makeStyles } from '@material-ui/core/styles';
import styles from './AuthDialogStyles';
const useStyles = makeStyles(styles);

const initForm = {
    fstName: '',
    lstName: '',
    email: '',
    password1: '',
    password2: ''
}

const SignUpWithEmailDialog = (props) => {
    const classes = useStyles();
    const dispatch = useDispatch();
    
    // Sign up form
    const [values, setValues] = useState(initForm);
    const [passwordErr, setPasswordErr] = useState(false);
    const handleChange = (e) => {
        // Capitalize names
        setValues({
            ...values,
            [e.target.name]: 
                (e.target.name === 'fstName' ||
                 e.target.name === 'lstName')? 
                 e.target.value.charAt(0).toUpperCase() + e.target.value.slice(1) :
                 e.target.value
        });
    }

    const handleClose = () => {
        // Reset the form and close dialog
        setValues(initForm);
        setPasswordErr(false);
        props.onClose();
    }

    const handleSubmit = (e) => {
        e.preventDefault();

        // Check if passwords match
        if (values.password1 !== values.password2) {
            setPasswordErr(true);
            return;
        }

        dispatch(emailAuth({
            fstName: values.fstName,
            lstName: values.lstName,
            email: values.email,
            password: values.password1,
        }, 'register'));
        handleClose();
    }

    // To return to the current page after signup
    useEffect(() => {
        window.localStorage.setItem('redirectURL', props.currentRoute);
    }, [props.currentRoute]);
    
    return (
        <Dialog 
        open={props.open} 
        onClose={handleClose}
        classes={{ paper: classes.paper }}>
            <div className={classes.header}>
                <CloseIcon onClick={handleClose} className={classes.closeIcon}/>
                <h5 className="title">{text.signUp[props.lang]}</h5>
            </div>
            <DialogContent>
                <form onSubmit={handleSubmit}>
                    <FormControl className={classes.formControl} fullWidth>
                        <FormLabel htmlFor="fstName">
                            {text.fstName[props.lang]}
                        </FormLabel>
                        <TextField 
                        id="fstName" 
                        name="fstName" 
                        value={values.fstName}
                        onChange={handleChange}
                        required/>
                    </FormControl>
                    <FormControl className={classes.formControl} fullWidth>
                        <FormLabel htmlFor="lstName">
                            {text.lstName[props.lang]}
                        </FormLabel>
                        <TextField 
                        id="lstName"
                        name="lstName" 
                        value={values.lstName}
                        onChange={handleChange}
                        required/>
                    </FormControl>
                    <div className={classes.formDivisor} style={{margin: '0 auto'}}/>
                    <FormControl className={classes.formControl} fullWidth>
                        <FormLabel htmlFor="email">
                            {text.email[props.lang]}
                        </FormLabel>
                        <TextField
                        type="email"
                        id="email" 
                        name="email"
                        value={values.email}
                        onChange={handleChange}
                        required/>
                    </FormControl>
                    <FormControl className={classes.formControl} fullWidth>
                        <FormLabel htmlFor="password1">
                            {text.password[props.lang]}
                        </FormLabel>
                        <TextField 
                        type="password"
                        id="password1"
                        name="password1" 
                        value={values.password1}
                        onChange={handleChange}
                        required/>
                    </FormControl>
                    <FormControl className={classes.formControl} fullWidth>
                        <FormLabel htmlFor="password2">
                            {text.confirmPwd[props.lang]}
                        </FormLabel>
                        <TextField 
                        type="password"
                        id="password2"
                        name="password2" 
                        value={values.password2}
                        onChange={handleChange}
                        helperText={passwordErr && "The passwords don't match."}
                        required/>
                    </FormControl>
                    <p 
                    className={classes.switchDialogsText}
                    style={{ margin: '10px 0 1rem' }}>
                        {text.alreadyAccount[props.lang]}&nbsp;&nbsp;
                        <span onClick={props.switchToLogin}>
                            {text.logIn[props.lang]}
                        </span>
                    </p> 
                    <button 
                    type="submit" 
                    className={classes.submitButton}>
                        {text.continue[props.lang]}
                    </button>
                </form>
            </DialogContent>
        </Dialog>
    );
}

export default SignUpWithEmailDialog;

