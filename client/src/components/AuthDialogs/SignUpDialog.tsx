import React, { useState } from 'react';
import { useMutation, gql } from '@apollo/client';

import { useLanguageContext } from '../../context/languageContext';
import { useAppSelector, useAppDispatch } from '../../hooks/redux';
import { closeSignUpDialog, openLogInDialog, openErrorDialog } from '../../store/uiSlice';
import { setUserProfile } from '../../store/userSlice';

import Dialog from '@material-ui/core/Dialog';
import DialogContent from '@material-ui/core/DialogContent';
import CloseIcon from '@material-ui/icons/Close';
import FormControl from '@material-ui/core/FormControl';
import FormLabel from '@material-ui/core/FormLabel';
import TextField from '../TextField/TextField';
import GradientButton from '../GradientButton/GradientButton';

import { makeStyles } from '@material-ui/core/styles';
import styles from './AuthDialogs.styles';
const useStyles = makeStyles(styles);

const SIGN_UP_USER = gql`
    mutation signUp($email: String!, $password: String!, $firstName: String!, $lastName: String!) {
        signUpUser(email: $email, password: $password, firstName: $firstName, lastName: $lastName) {
            token
            firstName
            lastName
            email
        }
    }
`;
type SignUp = { 
    token: string;
    firstName: string; 
    lastName: string; 
    email: string; 
}
type SignUpVariables = {
    firstName: string; 
    lastName: string; 
    email: string; 
    password: string;
}

enum FormField {
    FirstName = 'firstName',
    LastName = 'lastName',
    Email = 'email',
    Password1 = 'password1',
    Password2 = 'password2'
}
type Form = Record<FormField, string>;
const initialForm: Form = {
    firstName: '',
    lastName: '',
    email: '',
    password1: '',
    password2: ''
}

const storeTokenData = (token: string) => {
    /* During sign up, we don't "remember" the user, so data is saved
       in session storage. */
    sessionStorage.setItem('ramble-token', token);
}

const SignUpDialog = () => {
    const { SignUpDialog: text } = useLanguageContext().appText;

    const classes = useStyles();

    const dispatch = useAppDispatch();
    const open = useAppSelector(state => state.ui.showSignUpDialog);

    const [signUp] = useMutation<{ signUpUser: SignUp }, SignUpVariables>(SIGN_UP_USER, {
        onCompleted: ({ signUpUser }) => {
            storeTokenData(signUpUser.token);
            
            dispatch(setUserProfile({
                isLoggedIn: true,
                firstName: signUpUser.firstName,
                lastName: signUpUser.lastName,
                email: signUpUser.email
            }));

            handleClose();
        },
        onError: ({ message }) => {
            dispatch(openErrorDialog({
                message: message || "We couldn't sign you in."
            }));
            handleClose();
        }
    });

    const [values, setValues] = useState(initialForm);
    const [passwordError, setPasswordError] = useState(false);

    const handleFormChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        const field = event.target.name;
        let newValue = event.target.value;

        if (field === FormField.FirstName || field === FormField.LastName) {
            newValue = newValue.charAt(0).toUpperCase() + newValue.slice(1);
        }

        setValues({ ...values, [field]: newValue });
    }

    const handleSubmit = (event: React.FormEvent) => {
        event.preventDefault();

        if (values.password1 !== values.password2) {
            setPasswordError(true);
            return;
        }

        signUp({
            variables: {
                email: values.email,
                password: values.password1,
                firstName: values.firstName,
                lastName: values.lastName
            }
        });
    }

    const handleClose = () => {
        setValues(initialForm);
        setPasswordError(false);
        dispatch(closeSignUpDialog());
    }

    return (
        <Dialog fullWidth open={open} classes={{ paper: classes.dialogPaper }} onClose={handleClose}>
            <div className={classes.header}>
                <CloseIcon className={classes.closeIcon} onClick={handleClose} />
                <h5 className={classes.title}>{text.signUp}</h5>
            </div>
            <DialogContent className={classes.content}>
                <form onSubmit={handleSubmit}>
                    <FormControl className={classes.formControl}>
                        <FormLabel className={classes.formLabel} htmlFor={FormField.FirstName}>
                            {text.firstName}
                        </FormLabel>
                        <TextField
                        id={FormField.FirstName}
                        name={FormField.FirstName}
                        className={classes.textField}
                        fullWidth
                        value={values.firstName}
                        onChange={handleFormChange}
                        required />
                    </FormControl>
                    <FormControl className={classes.formControl}>
                        <FormLabel className={classes.formLabel} htmlFor={FormField.LastName}>
                            {text.lastName}
                        </FormLabel>
                        <TextField
                        id={FormField.LastName}
                        name={FormField.LastName}
                        className={classes.textField}
                        fullWidth
                        value={values.lastName}
                        onChange={handleFormChange}
                        required />
                    </FormControl>
                    <div className={classes.formDivisor} />
                    <FormControl className={classes.formControl}>
                        <FormLabel className={classes.formLabel} htmlFor={FormField.Email}>
                            {text.email}
                        </FormLabel>
                        <TextField
                        id={FormField.Email}
                        name={FormField.Email}
                        type="email"
                        className={classes.textField}
                        fullWidth
                        value={values.email}
                        onChange={handleFormChange}
                        required />
                    </FormControl>
                    <FormControl className={classes.formControl}>
                        <FormLabel className={classes.formLabel} htmlFor={FormField.Password1}>
                            {text.password}
                        </FormLabel>
                        <TextField
                        id={FormField.Password1}
                        name={FormField.Password1}
                        type="password"
                        className={classes.textField}
                        fullWidth
                        value={values.password1}
                        onChange={handleFormChange}
                        required />
                    </FormControl>
                    <FormControl className={classes.formControl}>
                        <FormLabel className={classes.formLabel} htmlFor={FormField.Password2}>
                            {text.confirmPassword}
                        </FormLabel>
                        <TextField
                        id={FormField.Password2}
                        name={FormField.Password2}
                        type="password"
                        className={classes.textField}
                        fullWidth
                        value={values.password2}
                        onChange={handleFormChange}
                        helperText={passwordError && text.passwordMismatch}
                        required />
                    </FormControl>
                    <p className={classes.switchDialogsText}>
                        {text.alreadyHaveAccount}&nbsp;&nbsp;
                        <span 
                        className={classes.switchDialogsLink} 
                        onClick={() => {
                            handleClose();
                            dispatch(openLogInDialog());
                        }}>
                            {text.logIn}
                        </span>
                    </p>
                    <GradientButton 
                    type="submit" 
                    variant="experience"
                    className={classes.submitButton}>
                        {text.continue}
                    </GradientButton>
                </form>
            </DialogContent>
        </Dialog>
    );
}

export default SignUpDialog;