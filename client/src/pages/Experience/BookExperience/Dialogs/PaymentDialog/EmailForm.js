import React, {useState} from 'react';

import InputBase from '@material-ui/core/InputBase';
import Checkbox from '../../../../../components/Input/Checkbox';

import {makeStyles} from '@material-ui/core/styles';
import styles from './PaymentDialogStyles';
const useStyles = makeStyles(styles);

const EmailForm = (props) => {
    //For handling form changes 
    const [showEmailForm, setShowEmailForm] = useState(!props.userEmail);
    const handleFormCheckbox = (e) => setShowEmailForm(e.target.checked); 

    const classes = useStyles({showEmailForm});
    return (
        <>
        {showEmailForm?
            <div className={classes.emailForm}>
                <p className={`${classes.label} email`}>
                    Enter the email address you would like the receipt to 
                    be sent to.
                </p>
                <InputBase
                value={props.newEmail}
                onChange={props.onChange}
                className={classes.input}/>
            </div> :
            <div className={classes.emailForm}>
                <p className={`${classes.label} email`}>
                    We'll send your receipt to {props.userEmail}. Would you like 
                    to use a different email address?
                </p>
                <Checkbox onChange={handleFormCheckbox}/>
            </div>}
        </>
    );
}

export default EmailForm;