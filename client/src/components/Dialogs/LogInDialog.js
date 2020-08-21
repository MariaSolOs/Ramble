import React, {useState, useEffect} from 'react';
import {useDispatch} from 'react-redux';
import {emailAuth, adminLogin} from '../../store/actions/user';

//MUI
import FormControl from '@material-ui/core/FormControl';
import FormLabel from '@material-ui/core/FormLabel';
import Dialog from '@material-ui/core/Dialog';
import DialogContent from '@material-ui/core/DialogContent';
import CloseIcon from '@material-ui/icons/Close';

import TextField from '../Input/TextField';

//Styles
import {makeStyles} from '@material-ui/core/styles';
import styles from './AuthDialogStyles';
const useStyles = makeStyles(styles);

const LogInDialog = (props) => {
    const classes = useStyles();
    const dispatch = useDispatch();

    //To return to the current page after login
    useEffect(() => {
        window.localStorage.setItem('redirectURL', props.currentRoute);
    }, [props.currentRoute]);
    
    //Log in form
    const [values, setValues] = useState({
        email: '',
        password: ''
    });
    const handleChange = (e) => {
        setValues({
            ...values,
            [e.target.name]: e.target.value
        });
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
    }

    return (
        <Dialog 
        open={props.open} 
        onClose={props.onClose} 
        classes={{ paper: classes.paper }}>
            <div className={classes.header}>
                <CloseIcon onClick={props.onClose} className="closeIcon"/>
                <h5 className="title">Log in</h5>
            </div>
            <DialogContent>
                <form onSubmit={handleSubmit}>
                    <FormControl className={classes.formControl} fullWidth>
                        <FormLabel htmlFor="email">Email</FormLabel>
                        <TextField 
                        id="email"
                        name="email"
                        value={values.email}
                        onChange={handleChange}
                        required/>
                    </FormControl>
                    <FormControl className={classes.formControl} fullWidth>
                        <FormLabel htmlFor="password">Password</FormLabel>
                        <TextField 
                        type="password"
                        id="password"
                        name="password" 
                        value={values.password}
                        onChange={handleChange}
                        required/>
                    </FormControl>
                    <button type="submit" onClick={props.onClose}
                    className={classes.submitButton}>
                        Log in
                    </button>
                </form>
                <div className={classes.formDivisor}/>
                <a href="/api/auth/facebook" className={classes.link}>
                    <button className={classes.mediaButton}>
                        <img src="https://img.icons8.com/color/48/000000/facebook-new.png" 
                        alt="Facebook icon" className="icon" style={{height: '100%'}}/>
                        Log in with Facebook
                    </button>
                </a>
                <a href="/api/auth/google" className={classes.link}> 
                    <button className={classes.mediaButton}>
                        <img src="https://img.icons8.com/color/48/000000/google-logo.png" 
                        alt="Google icon" className="icon" style={{height: '90%'}}/>
                        Log in with Google
                    </button> 
                </a>
                <a href="https://icons8.com/icons/set/social-media"
                className={`${classes.iconsCreditLink} ${classes.link}`}>
                    Media icons by Icons8
                </a>
            </DialogContent>
        </Dialog>
    );
}

export default LogInDialog;
