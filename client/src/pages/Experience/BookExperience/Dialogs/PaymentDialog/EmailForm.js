import React, {useState} from 'react';

import InputBase from '@material-ui/core/InputBase';
import Checkbox from '../../../../../components/Input/Checkbox';

import {makeStyles} from '@material-ui/core/styles';
const useStyles = makeStyles(() => ({
    root: {
        display: 'flex',
        flexDirection: props => 
            props.showForm? 'column' : 'row',
        width: '90%',
        margin: '0 auto'
    },
    message: {
        color: '#C8C8C8',
        fontSize: '0.85rem',
        marginBottom: 0,
        textAlign: props => props.showForm && 'center'
    },
    emailInput: {
        fontFamily: 'Helvetica, sans-serif',
        fontWeight: 'bold',
        fontSize: '0.9rem',
        letterSpacing: '-0.05rem',
        color: '#FFF',
        width: '80%',
        margin: '5px auto 0',
        padding: '0 15px',
        borderRadius: '1rem',
        border: '1px solid #FFF',
        '& .MuiInputBase-input': {
            textAlign: 'center'
        }
    }
}));

const EmailForm = (props) => {
    //For handling form changes 
    const [showForm, setShowForm] = useState(!props.userEmail);
    const handleFormCheckbox = (e) => setShowForm(e.target.checked); 

    const classes = useStyles({showForm});
    return (
        <>
            {showForm?
                <div className={classes.root}>
                    <p className={classes.message}>
                        Enter the email address you would like the receipt to be sent to.
                    </p>
                    <InputBase
                    value={props.newEmail}
                    onChange={props.onChange}
                    className={classes.emailInput}/>
                </div> :
                <div className={classes.root}>
                <p className={classes.message}>
                    We'll send your receipt to {props.savedEmail}. Would you like to use a
                    different email address?
                </p>
                <Checkbox onChange={handleFormCheckbox}/>
            </div>}
        </>
    );
}

export default EmailForm;