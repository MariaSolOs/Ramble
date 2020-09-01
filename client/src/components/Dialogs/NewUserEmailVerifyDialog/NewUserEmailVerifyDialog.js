import React, {useState, useEffect} from 'react';
import {connect} from 'react-redux';
import {editUserProfile} from '../../../store/actions/user';
import Cookies from 'js-cookie';

import Dialog from '@material-ui/core/Dialog';
import DialogContent from '@material-ui/core/DialogContent';
import InputBase from '@material-ui/core/InputBase';
import {FontAwesomeIcon} from '@fortawesome/react-fontawesome';
import {faPaperPlane} from '@fortawesome/free-regular-svg-icons/faPaperPlane';

import {makeStyles} from '@material-ui/core/styles';
import styles from './NewUserEmailVerifyDialogStyles';
const useStyles = makeStyles(styles);

const NewUserEmailVerifyDialog = (props) => {
    const [open, setOpen] = useState(false);

    //If the user just signed up, open dialog
    useEffect(() => {  
        const userCreatedDate = Cookies.get('userCreatedDate'); 
        if(userCreatedDate && 
          ((new Date() - new Date(userCreatedDate)) < 60000)) {
            setTimeout(() => { setOpen(true); }, 1000);
            setTimeout(() => { setOpen(false); }, 5000);
        }
    }, []);

    //Form for the user's email address
    const [email, setEmail] = useState('');
    const handleEmailChange = (e) => {
        setEmail(e.target.value);
    }
    const handleClose = (e) => { 
        e.preventDefault();
        setOpen(false); 
        setEmail('');
        Cookies.remove('userCreatedDate');
        Cookies.remove('emailVerifiedDate');
    }
    const handleSubmitEmail = (e) => {
        e.preventDefault();
        props.editUserProfile({'email.address': email});
    }

    const classes = useStyles({
        showEmailForm: props.email.length === 0
    });

    return (
        <Dialog
        open={open}
        onClose={handleClose}
        classes={{ paper: classes.paper }}
        maxWidth="xs">
            <DialogContent className={classes.content}>
                {props.email.length > 0?
                <>
                    <FontAwesomeIcon icon={faPaperPlane}/>
                    <p>
                        To fully enjoy our experiences, check your inbox to
                        verify your email address.
                    </p>
                </> :
                <form onSubmit={handleSubmitEmail}>
                    {props.name > 0 &&
                        <p className={classes.userName}>
                            Welcome, {props.name}!
                        </p>}
                    <p>
                        Before we get started we'd like to verify your email.
                    </p>
                    <InputBase 
                    type="email"
                    placeholder="Enter your email address"
                    className={classes.emailInput}
                    value={email}
                    onChange={handleEmailChange}/>
                    <div className={classes.actions}>
                        <button 
                        className={classes.button}
                        onClick={handleClose}>
                            Do this later
                        </button>
                        <button 
                        type="submit"
                        className={classes.button}>
                            Done 
                        </button>
                    </div>
                </form>}
            </DialogContent>
        </Dialog>
    );
}

const mapStateToProps = (state) => ({
    name: state.user.profile.fstName,
    email: state.user.profile.email
});
const mapDispatchToProps = (dispatch) => ({
    editUserProfile: (updatedInfo) => 
        dispatch(editUserProfile(updatedInfo, false))
});

export default connect(mapStateToProps, mapDispatchToProps)(NewUserEmailVerifyDialog);