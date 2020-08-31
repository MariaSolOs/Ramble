import React from 'react';

import Dialog from '@material-ui/core/Dialog';
import OhNoPic from '../../../shared/images/OhNoRamble.png';

import {makeStyles} from '@material-ui/core/styles';
import styles from './ErrorDialogStyles';
const useStyles = makeStyles(styles);

const ErrorDialog = (props) => {
    const classes = useStyles();

    return (
        <Dialog
        open={props.open}
        onClose={props.onClose}
        aria-labelledby="idle-modal-title"
        aria-describedby="idle-modal"
        maxWidth="sm"
        classes={{ paper: classes.paper }}>
            <div className={classes.header}>
                <img src={OhNoPic} alt="Oh no Ramble face"/>
                Sorry 'bout that. 
            </div>
            <p className={classes.message}>
                {props.message}
            </p>
        </Dialog>
    );
}

export default ErrorDialog;