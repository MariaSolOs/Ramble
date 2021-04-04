import React from 'react';
import text from './CustomerServiceDialogText';

import Dialog from '@material-ui/core/Dialog';
import DialogContent from '@material-ui/core/DialogContent';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faPhoneAlt } from '@fortawesome/free-solid-svg-icons/faPhoneAlt';
import { faEnvelope } from '@fortawesome/free-solid-svg-icons/faEnvelope';

import { makeStyles} from '@material-ui/core/styles';
import styles from './CustomerServiceDialogStyles';
const useStyles = makeStyles(styles);

const CustomerServiceDialog = ({ open, onClose, lang }) => {
    const classes = useStyles();

    return (
        <Dialog open={open} onClose={onClose} classes={{ paper: classes.paper }}>
            <div className={classes.header}>
                <h4 className="title">{text.title[lang]}</h4>
                <p>{text.message[lang]}</p>
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