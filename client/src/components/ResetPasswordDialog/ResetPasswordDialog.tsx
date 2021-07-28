import React, { useState, useEffect } from 'react';
import Cookies from 'js-cookie';

import { updateToken } from 'utils/auth';
import { useUpdateProfileMutation } from 'graphql-api';
import { useLanguageContext } from 'context/languageContext';
import { useUiContext } from 'context/uiContext';
import { setUserInfo } from 'store/user-cache';

import Dialog from '@material-ui/core/Dialog';
import DialogContent from '@material-ui/core/DialogContent';
import FormControl from '@material-ui/core/FormControl';
import FormLabel from '@material-ui/core/FormLabel';
import TextField from 'components/TextField/TextField';
import Button from 'components/GradientButton/GradientButton';

import { makeStyles } from '@material-ui/core/styles';
import styles from './ResetPasswordDialog.styles';
const useStyles = makeStyles(styles);

enum FormField {
    Password1 = 'password1',
    Password2 = 'password2'
}
type Form = Record<FormField, string>;

const ResetPasswordDialog = () => {
    const { ResetPasswordDialog: text } = useLanguageContext().appText;
    const { uiDispatch } = useUiContext();
    const classes = useStyles();
    
    // Check if the cookie for resetting the password was set
    useEffect(() => {
        if (Cookies.get('ramble-reset_token')) {
            setOpen(true);
        }
    }, []);

    const [open, setOpen] = useState(false);
    const [passwordMismatch, setPasswordMismatch] = useState(false);
    const [values, setValues] = useState<Form>({
        password1: '',
        password2: ''
    });

    const handleClose = () => { 
        setOpen(false); 
        Cookies.remove('ramble-reset_token');
    }

    const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        // Clear the error
        setPasswordMismatch(false);

        setValues(values => ({ 
            ...values,  
            [event.target.name]: event.target.value
        }));
    }

    const handleSubmit = (event: React.FormEvent) => {
        event.preventDefault();

        // Check passwords match
        if (values.password1 !== values.password2) {
            setPasswordMismatch(true);
            return;
        }

        // Set the token for the server to authenticate request
        const cookieToken = Cookies.get('ramble-reset_token')!;
        updateToken(cookieToken);

        resetPassword({ variables: { password: values.password1 } });
    }

    const [resetPassword] = useUpdateProfileMutation({
        onCompleted: ({ editUser }) => {
            setUserInfo(editUser);
            handleClose();
        },
        onError: () => {
            handleClose();
            uiDispatch({ 
                type: 'OPEN_ERROR_DIALOG',  
                message: "We couldn't reset your password..."
            });
        }
    });

    return (
        <Dialog open={open} maxWidth="xs" classes={{ paper: classes.paper }}>
            <DialogContent className={classes.content}>
                <form onSubmit={handleSubmit}>
                    <FormControl className={classes.formControl} fullWidth>
                        <FormLabel className={classes.label} htmlFor={FormField.Password1}>
                            {text.newPassword}
                        </FormLabel>
                        <TextField
                        id={FormField.Password1}
                        name={FormField.Password1}
                        type="password"
                        required
                        value={values.password1}
                        onChange={handleChange} />
                    </FormControl>
                    <FormControl className={classes.formControl} fullWidth>
                        <FormLabel className={classes.label} htmlFor={FormField.Password2}>
                            {text.confirmPassword}
                        </FormLabel>
                        <TextField
                        id={FormField.Password2}
                        name={FormField.Password2}
                        type="password"
                        required
                        value={values.password2}
                        onChange={handleChange}
                        helperText={passwordMismatch && text.passwordMismatch} />
                    </FormControl>
                    <Button variant="experience" type="submit" className={classes.button}>
                        {text.resetPassword}
                    </Button>
                </form>
            </DialogContent>
        </Dialog>
    );
}

export default ResetPasswordDialog;