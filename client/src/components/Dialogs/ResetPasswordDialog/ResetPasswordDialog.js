import React, { useState, useEffect } from 'react';
import axios from '../../../tokenizedAxios';
import { useDispatch } from 'react-redux';
import { emailAuth } from '../../../store/actions/user';
import { showError } from '../../../store/actions/ui';
import Cookies from 'js-cookie';

import Dialog from '@material-ui/core/Dialog';
import DialogContent from '@material-ui/core/DialogContent';
import FormControl from '@material-ui/core/FormControl';
import FormLabel from '@material-ui/core/FormLabel';
import CloseIcon from '@material-ui/icons/Close';
import TextField from '../../Input/TextField/TextField';

import { makeStyles } from '@material-ui/core/styles';
import styles from './ResetPasswordDialogStyles';
const useStyles = makeStyles(styles);

const initialForm = {
    pwd1: '',
    pwd2: ''
}

const ResetPasswordDialog = (props) => {
    const classes = useStyles();
    const dispatch = useDispatch();

    const [open, setOpen] = useState(false);
    const [err, setErr] = useState(false);

    // Check if we're resetting the password
    useEffect(() => {  
        const resetToken = Cookies.get('resetToken'); 
        if (resetToken) {
            setOpen(true);
        }
    }, []);

    //Form for the user's email address
    const [passwords, setPasswords] = useState(initialForm);

    const handleChange = (e) => {
        setPasswords({
            ...passwords, 
            [e.target.name]: e.target.value
        });
    }

    const handleClose = () => { 
        setOpen(false); 
        setPasswords(initialForm);
        Cookies.remove('resetToken');
    }

    const handleSubmit = (e) => {
        e.preventDefault();

        // Check that passwords match
        if (passwords.pwd1 !== passwords.pwd2) {
            return setErr(true);
        }

        // Reset their password
        axios.post('/api/profile/reset-password', {
            token: Cookies.get('resetToken'),
            password: passwords.pwd1
        }).then((res) => {
            // Log them in
            dispatch(emailAuth({
                email: res.data.email,
                password: passwords.pwd1
            }, 'login'));
        }).catch(() => {
            showError("We couldn't reset your password...");
        }).finally(() => {
            handleClose();
        });
    }

    return (
        <Dialog 
        open={open} 
        onClose={handleClose} 
        disableBackdropClick
        classes={{ paper: classes.paper }}>
            <CloseIcon onClick={handleClose} className={classes.closeIcon}/>
            <DialogContent> 
                <form onSubmit={handleSubmit}>
                    <FormControl className={classes.formControl} fullWidth>
                        <FormLabel htmlFor="password1">
                            New password
                        </FormLabel>
                        <TextField 
                        id="password1"
                        name="pwd1"
                        type="password"
                        value={passwords.pwd1}
                        onChange={handleChange}
                        required/>
                    </FormControl>
                    <FormControl className={classes.formControl} fullWidth>
                        <FormLabel htmlFor="password2">
                            Confirm your new password
                        </FormLabel>
                        <TextField 
                        id="password2"
                        name="pwd2"
                        type="password"
                        value={passwords.pwd2}
                        onChange={handleChange}
                        helperText={err && "The passwords don't match."}
                        required/>
                    </FormControl>
                    <button 
                    type="submit"
                    className={classes.submitButton}>
                        Reset my password
                    </button>
                </form>
            </DialogContent>
        </Dialog>
    );
}

export default ResetPasswordDialog;