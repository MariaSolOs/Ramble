import React from 'react';
import {connect} from 'react-redux';
import {useForm} from 'react-hook-form';
import {emailAuth} from '../../../store/actions/user';

//MUI
import FormControl from '@material-ui/core/FormControl';
import FormLabel from '@material-ui/core/FormLabel';
import Dialog from '@material-ui/core/Dialog';
import DialogContent from '@material-ui/core/DialogContent';
import CloseIcon from '@material-ui/icons/Close';

import TextField from '../../../components/Input/TextField';

//Styles
import {makeStyles} from '@material-ui/core/styles';
import styles from './DialogStyles';
const useStyles = makeStyles(styles);

const SignUpWithEmailDialog = (props) => {
    const classes = useStyles();
    const {register, handleSubmit} = useForm();
    
    return (
        <Dialog open={props.open} onClose={props.onClose} aria-labelledby="form-dialog-header"
        classes={{ paper: classes.paper }}>
            <div className={classes.header}>
                <CloseIcon onClick={props.onClose} className="closeIcon"/>
                <h5 className="title">Sign up</h5>
            </div>
            <DialogContent>
                <form onSubmit={handleSubmit(props.registerUser)}>
                    <FormControl className={classes.formControl} fullWidth>
                        <FormLabel htmlFor="fstName">First name</FormLabel>
                        <TextField name="fstName" inputRef={register({required: true})}/>
                    </FormControl>
                    <FormControl className={classes.formControl} fullWidth>
                        <FormLabel htmlFor="lstName">Last name</FormLabel>
                        <TextField name="lstName" inputRef={register({required: true})}/>
                    </FormControl>
                    <FormControl className={classes.formControl} fullWidth>
                        <FormLabel htmlFor="birthday">Birthday</FormLabel>
                        <TextField type="date" name="birthday" inputRef={register}/>
                    </FormControl>
                    <div className={classes.formDivisor} style={{margin: '0 auto'}}/>
                    <FormControl className={classes.formControl} fullWidth>
                        <FormLabel htmlFor="email">Email</FormLabel>
                        <TextField name="email" type="email"
                        inputRef={register({required: true})}/>
                    </FormControl>
                    <FormControl className={classes.formControl} fullWidth>
                        <FormLabel htmlFor="password">Password</FormLabel>
                        <TextField name="password" type="password"
                        inputRef={register({required: true})}/>
                    </FormControl>
                    <p className={classes.switchDialogsLink}>
                        Already have an account?&nbsp;&nbsp;
                        <span onClick={props.switchToLogin}>Log in</span>
                    </p> 
                    <button type="submit" className={classes.submitButton} onClick={props.onClose}>
                        Continue
                    </button>
                </form>
            </DialogContent>
        </Dialog>
    );
}

const mapDispatchToProps = (dispatch) => ({
    registerUser: (userInfo) => dispatch(emailAuth(userInfo, 'register'))
});

export default connect(null, mapDispatchToProps)(SignUpWithEmailDialog);

