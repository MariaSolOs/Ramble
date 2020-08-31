import React, {useState} from 'react';

import InputBase from '@material-ui/core/InputBase';
import Checkbox from '../../../../../components/Input/Checkbox/Checkbox';

import {makeStyles} from '@material-ui/core/styles';
import styles from './PaymentDialogStyles';
const useStyles = makeStyles(styles);

const EmailForm = (props) => {
    //For handling form changes 
    const [showEmailForm, setShowEmailForm] = useState(props.userEmail.length === 0);
    const handleNewEmailChange = (e) => { props.onChange(e.target.value); }
    const handleFormCheckbox = (e) => {
        if(e.target.name === 'shower') {
            setShowEmailForm(e.target.checked); 
            props.onCanSubmit(false);
        } else { //(e.target.name === 'hider')
            props.onChange(''); //Clear new email input
            setShowEmailForm(!e.target.checked); 
            props.onCanSubmit(true);
        }
    }

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
                onChange={handleNewEmailChange}
                className={classes.input}/>
                <div style={{ display: 'flex', alignItems: 'center' }}>
                    <p className={classes.label}>Use {props.userEmail}.</p>
                    <Checkbox name="hider" onChange={handleFormCheckbox}/>
                </div>
            </div> :
            <div className={classes.emailForm}>
                <p className={`${classes.label} email`}>
                    We'll send your receipt to {props.userEmail}. Would you like 
                    to use a different email address?
                </p>
                <Checkbox name="shower" onChange={handleFormCheckbox}/>
            </div>}
        </>
    );
}

export default EmailForm;