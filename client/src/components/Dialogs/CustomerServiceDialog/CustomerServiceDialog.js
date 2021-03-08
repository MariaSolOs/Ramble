import React from 'react';

import Dialog from '@material-ui/core/Dialog';
import DialogContent from '@material-ui/core/DialogContent';
import {FontAwesomeIcon} from '@fortawesome/react-fontawesome';
import {faPhoneAlt} from '@fortawesome/free-solid-svg-icons/faPhoneAlt';
import {faEnvelope} from '@fortawesome/free-solid-svg-icons/faEnvelope';

import {makeStyles} from '@material-ui/core/styles';
import styles from './CustomerServiceDialogStyles';
const useStyles = makeStyles(styles);

const CustomerServiceDialog = (props) => {
    const classes = useStyles();

    return (
        <Dialog 
        open={props.open} 
        onClose={props.onClose} 
        classes={{ paper: classes.paper }}>
            <div className={classes.header}>
                <h4 className="title">Customer service</h4>
                <p>24/7 service to help you anywhere, anytime</p>
            </div>
            <DialogContent className={classes.content}>
                <div className={classes.contactInfo}>
                    <FontAwesomeIcon icon={faPhoneAlt}/>
                    <p>+ 1 (514) 654-7156</p>
                </div>
                <div className={classes.contactInfo}>
                    <FontAwesomeIcon icon={faEnvelope}/>
                    <p>maria@ramble.email</p>
                </div>
            </DialogContent>
        </Dialog>
    );
}

export default CustomerServiceDialog;