import React, { useState } from 'react';
import { useMutation, gql } from '@apollo/client';

import { useLanguageContext } from '../../context/languageContext';
import { useAppSelector, useAppDispatch } from '../../hooks/redux';
import { closeLogInDialog, openErrorDialog } from '../../store/uiSlice';
import { setUserProfile } from '../../store/userSlice';

import Dialog from '@material-ui/core/Dialog';
import DialogContent from '@material-ui/core/DialogContent';
import CloseIcon from '@material-ui/icons/Close';
import FormControl from '@material-ui/core/FormControl';
import FormLabel from '@material-ui/core/FormLabel';
import TextField from '../TextField/TextField';
import Checkbox from '../Checkbox/Checkbox';
import GradientButton from '../GradientButton/GradientButton';
import ForgotPasswordDialog from '../ForgotPasswordDialog/ForgotPasswordDialog';

import { makeStyles } from '@material-ui/core/styles';
import styles from './AuthDialogs.styles';
const useStyles = makeStyles(styles);

const LOG_IN_USER = gql`
    mutation logIn($email: String!, $password: String!, $rememberUser: Boolean!) {
        logInUser(email: $email, password: $password, rememberUser: $rememberUser) {
            token
            firstName
            lastName
            birthday
            email
            phoneNumber
            photo
            city
            creator {
                _id
            }
        }
    }
`;
type LogIn = {
    token: string;
    firstName: string;
    lastName: string;
    birthday: string;
    email: string;
    phoneNumber: string;
    photo: string;
    city: string;
    creator: { _id: string; };
}

enum FormField {
    Email = 'email',
    Password = 'password',
    RememberUser = 'rememberUser'
}
type Form = {
    email: string;
    password: string;
    rememberUser: boolean;
}
const initialForm: Form = {
    email: '',
    password: '',
    rememberUser: false
}

const storeTokenData = (token: string, rememberUser: boolean) => {
    // Depending on what the user wants, store their data
    if (rememberUser) {
        localStorage.setItem('ramble-token', token);
    } else {
        sessionStorage.setItem('ramble-token', token);
    }
}

const LogInDialog = () => {
    const { LogInDialog: text } = useLanguageContext().appText;

    const classes = useStyles();

    const dispatch = useAppDispatch();
    const open = useAppSelector(state => state.ui.showLogInDialog);

    const [values, setValues] = useState(initialForm);
    const [showForgotPwdDialog, setShowForgotPwdDialog] = useState(false);

    const [logIn] = useMutation<{ logInUser: LogIn }, Form>(LOG_IN_USER, {
        onCompleted: ({ logInUser }) => {
            storeTokenData(logInUser.token, values.rememberUser);
            dispatch(setUserProfile({
                isLoggedIn: true,
                isCreator: Boolean(logInUser.creator._id),
                firstName: logInUser.firstName,
                lastName: logInUser.lastName,
                birthday: logInUser.birthday,
                email: logInUser.email,
                phoneNumber: logInUser.phoneNumber,
                photo: logInUser.photo,
                city: logInUser.city
            }));
            handleClose();
        },
        onError: ({ message }) => {
            dispatch(openErrorDialog({ 
                message: message || "We couldn't log you in."
            }));
            handleClose();
        }
    });

    const handleFormChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        const fieldName = event.target.name;
        const newValue = fieldName === FormField.RememberUser ? 
            event.target.checked : event.target.value;

        setValues({
            ...values,
            [fieldName]: newValue
        });
    }

    const handleClose = () => {
        setValues(initialForm);
        dispatch(closeLogInDialog());
    }

    const handleSubmit = (event: React.FormEvent) => {
        event.preventDefault();

        logIn({ variables: { ...values } });
    }

    if (showForgotPwdDialog) {
        return (
            <ForgotPasswordDialog
            open={showForgotPwdDialog}
            onClose={() => setShowForgotPwdDialog(false)} />
        );
    }

    return (
        <Dialog fullWidth classes={{ paper: classes.dialogPaper }} open={open} onClose={handleClose}>
            <div className={classes.header}>
                <CloseIcon className={classes.closeIcon} onClick={handleClose} />
                <h5 className={classes.title}>{text.logIn}</h5>
            </div>
            <DialogContent className={classes.content}>
                <form onSubmit={handleSubmit}>
                    <FormControl className={classes.formControl}>
                        <FormLabel className={classes.formLabel} htmlFor={FormField.Email}>
                            {text.email}
                        </FormLabel>
                        <TextField
                        id={FormField.Email}
                        name={FormField.Email}
                        type="email"
                        required
                        className={classes.textField}
                        fullWidth
                        value={values.email}
                        onChange={handleFormChange} />
                    </FormControl>
                    <FormControl className={classes.formControl}>
                        <FormLabel className={classes.formLabel} htmlFor={FormField.Password}>
                            {text.password}
                        </FormLabel>
                        <TextField
                        id={FormField.Password}
                        name={FormField.Password}
                        type="password"
                        required
                        className={classes.textField}
                        fullWidth
                        value={values.password}
                        onChange={handleFormChange} />
                    </FormControl>
                    <div className={classes.rememberUserContainer}>
                        <p className={classes.rememberUserText}>
                            {text.rememberMe}
                        </p>
                        <Checkbox 
                        checked={values.rememberUser} 
                        name={FormField.RememberUser}
                        onChange={handleFormChange} />
                    </div>
                    <p 
                    className={classes.forgotPasswordLink}
                    onClick={() => {
                        setShowForgotPwdDialog(true);
                        handleClose();
                    }}>
                        {text.forgotPassword}
                    </p>
                    <GradientButton 
                    variant="experience" 
                    type="submit"
                    className={classes.submitButton}>
                        {text.logIn}
                    </GradientButton>
                </form>
            </DialogContent>
        </Dialog>
    );
}

export default LogInDialog;