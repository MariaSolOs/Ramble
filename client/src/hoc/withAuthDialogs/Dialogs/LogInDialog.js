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

const LogInDialog = (props) => {
    const classes = useStyles();
    const {register, handleSubmit} = useForm();

    //To return to the current page after FB/Google login
    const handleClickToAPI = () => {
        window.localStorage.setItem('redirectURL', props.currentRoute);
    }
    
    return (
        <Dialog open={props.open} onClose={props.onClose} aria-labelledby="form-dialog-header"
        classes={{ paper: classes.paper }}>
            <div className={classes.header}>
                <CloseIcon onClick={props.onClose} className="closeIcon"/>
                <h5 className="title">Log in</h5>
            </div>
            <DialogContent>
                <form onSubmit={handleSubmit(props.logInWithEmail)}>
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
                    <button type="submit" onClick={props.onClose}
                    className={classes.submitButton}>
                        Log in
                    </button>
                </form>
                <div className={classes.formDivisor}/>
                <a href="/api/auth/facebook" className={classes.link}>
                    <button className={classes.mediaButton} onClick={handleClickToAPI}>
                        <img src="https://img.icons8.com/color/48/000000/facebook-new.png" 
                        alt="Facebook icon" className="icon" style={{height: '100%'}}/>
                        Log in with Facebook
                    </button>
                </a>
                <a href="/api/auth/google" className={classes.link}> 
                    <button className={classes.mediaButton} onClick={handleClickToAPI}>
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

const mapDispatchToProps = (dispatch) => ({
    logInWithEmail: (userInfo) => dispatch(emailAuth(userInfo, 'login'))
});

export default connect(null, mapDispatchToProps)(LogInDialog);