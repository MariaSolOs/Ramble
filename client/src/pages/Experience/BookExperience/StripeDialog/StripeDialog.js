import React from 'react';

//Components and icons
import Dialog from '@material-ui/core/Dialog';
import DialogContent from '@material-ui/core/DialogContent';

import {makeStyles} from '@material-ui/core/styles';
import styles from './StripeDialogStyles';
const useStyles = makeStyles(styles);

const StripeDialog = ({open, keepUser, message}) => {
    const classes = useStyles();

    return (
        <Dialog open={open} classes={{ paper: classes.paper }}
        maxWidth="xs" fullWidth disableBackdropClick={keepUser}>
            <DialogContent>
                {message}
            </DialogContent>
        </Dialog>
    );
}

export default StripeDialog;