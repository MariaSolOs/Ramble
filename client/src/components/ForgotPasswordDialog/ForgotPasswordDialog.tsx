import React, { useState } from 'react';

import { useLanguageContext } from 'context/languageContext';

import Dialog from '@material-ui/core/Dialog';
import DialogContent from '@material-ui/core/DialogContent';
import CloseIcon from '@material-ui/icons/Close';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faPaperPlane } from '@fortawesome/free-regular-svg-icons/faPaperPlane';
import TextField from 'components/TextField/TextField';
import Button from 'components/GradientButton/GradientButton';
import Spinner from 'components/Spinner/Spinner';

import { makeStyles } from '@material-ui/core/styles';
import styles from './ForgotPasswordDialog.styles';
const useStyles = makeStyles(styles);

type Props = {
    open: boolean;
    onClose: () => void;
}

const ForgotPasswordDialog = (props: Props) => {
    const { ForgotPasswordDialog: text } = useLanguageContext().appText;

    const classes = useStyles();

    const [email, setEmail] = useState('');
    const [showSuccessMessage, setShowSuccessMessage] = useState(false);
    const [loading, setLoading] = useState(false);
    const [errorMessage, setErrorMessage] = useState('');

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();

        setLoading(true);

        fetch(`${process.env.REACT_APP_SERVER_URI}/email/password-reset`, {
            method: 'POST',
            mode: 'cors',
            headers: {
                'Content-Type': 'application/json',
                'Accept': 'application/json'
            },
            body: JSON.stringify({ email })
        })
        .then(res => {
            setLoading(false);
            if (res.ok) {
                setShowSuccessMessage(true);
            } else if (res.status === 404) {
                setErrorMessage("We couldn't find an account with that email...");
            } else {
                setErrorMessage('Something went wrong...');
            }
        })
        .catch(() => {
            setLoading(false);
            setErrorMessage('Something went wrong...');
        });
    }

    return (
        <Dialog open={props.open} onClose={props.onClose} classes={{ paper: classes.dialogPaper }}>
            {loading && <Spinner />}
            {showSuccessMessage ? 
                <div className={classes.emailSentContainer}>
                    <FontAwesomeIcon icon={faPaperPlane} className={classes.planeIcon} />
                    <p className={classes.title}>{text.emailSent}</p>
                </div> :
                <>
                    <CloseIcon onClick={props.onClose} className={classes.closeIcon} />
                    <DialogContent>
                        <form onSubmit={handleSubmit}>
                            <h4 className={classes.title}>{text.enterEmailTitle}</h4>
                            <p className={classes.message}>{text.sendLinkMessage}</p>
                            <TextField 
                            fullWidth
                            required
                            type="email"
                            value={email}
                            helperText={errorMessage}
                            onChange={event => setEmail(event.target.value)} />
                            <Button 
                            variant="experience"
                            type="submit"
                            className={classes.button}>
                                {text.resetPassword}
                            </Button>
                        </form>
                    </DialogContent>
                </>}
        </Dialog>   
    );
}

export default ForgotPasswordDialog;