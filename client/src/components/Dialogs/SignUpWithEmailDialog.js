import React, {useState, useEffect} from 'react';
import {useDispatch} from 'react-redux';
import {emailAuth} from '../../store/actions/user';

//MUI
import FormControl from '@material-ui/core/FormControl';
import FormLabel from '@material-ui/core/FormLabel';
import Dialog from '@material-ui/core/Dialog';
import DialogContent from '@material-ui/core/DialogContent';
import CloseIcon from '@material-ui/icons/Close';

import TextField from '../../components/Input/TextField';

//Styles
import {makeStyles} from '@material-ui/core/styles';
import styles from './AuthDialogStyles';
const useStyles = makeStyles(styles);

const SignUpWithEmailDialog = (props) => {
    const classes = useStyles();
    const dispatch = useDispatch();
    
    //Sign up form
    const [values, setValues] = useState({
        fstName: '',
        lstName: '',
        birthday: '',
        email: '',
        password: ''
    });
    const handleChange = (e) => {
        //Capitalize names
        setValues({
            ...values,
            [e.target.name]: 
                (e.target.name === 'fstName' ||
                 e.target.name === 'lstName')? 
                 e.target.value.charAt(0).toUpperCase() + e.target.value.slice(1) :
                 e.target.value
        });
    }
    const handleSubmit = (e) => {
        e.preventDefault();
        dispatch(emailAuth(values, 'register'));
    }

    //To return to the current page after signup
    useEffect(() => {
        window.localStorage.setItem('redirectURL', props.currentRoute);
    }, [props.currentRoute]);
    
    return (
        <Dialog 
        open={props.open} 
        onClose={props.onClose}
        classes={{ paper: classes.paper }}>
            <div className={classes.header}>
                <CloseIcon onClick={props.onClose} className="closeIcon"/>
                <h5 className="title">Sign up</h5>
            </div>
            <DialogContent>
                <form onSubmit={handleSubmit}>
                    <FormControl className={classes.formControl} fullWidth>
                        <FormLabel htmlFor="fstName">First name</FormLabel>
                        <TextField 
                        id="fstName" 
                        name="fstName" 
                        value={values.fstName}
                        onChange={handleChange}
                        required/>
                    </FormControl>
                    <FormControl className={classes.formControl} fullWidth>
                        <FormLabel htmlFor="lstName">Last name</FormLabel>
                        <TextField 
                        id="lstName"
                        name="lstName" 
                        value={values.lstName}
                        onChange={handleChange}
                        required/>
                    </FormControl>
                    <FormControl className={classes.formControl} fullWidth>
                        <FormLabel htmlFor="birthday">Birthday</FormLabel>
                        <TextField 
                        type="date" 
                        id="birthday"
                        name="birthday" 
                        value={values.birthday}
                        onChange={handleChange}/>
                    </FormControl>
                    <div className={classes.formDivisor} style={{margin: '0 auto'}}/>
                    <FormControl className={classes.formControl} fullWidth>
                        <FormLabel htmlFor="email">Email</FormLabel>
                        <TextField
                        type="email"
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
                    <p className={classes.switchDialogsLink}>
                        Already have an account?&nbsp;&nbsp;
                        <span onClick={props.switchToLogin}>Log in</span>
                    </p> 
                    <button 
                    type="submit" 
                    className={classes.submitButton} 
                    onClick={props.onClose}>
                        Continue
                    </button>
                </form>
            </DialogContent>
        </Dialog>
    );
}

export default SignUpWithEmailDialog;

