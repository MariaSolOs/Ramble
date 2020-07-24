import React from 'react';

//Components and icons
import Dialog from '@material-ui/core/Dialog';
import DialogContent from '@material-ui/core/DialogContent';

import {makeStyles} from '@material-ui/core/styles';
import styles from './CompletedDialogStyles';
const useStyles = makeStyles(styles);

const CompletedDialog = ({open, message}) => {
    const classes = useStyles();

    return (
        <Dialog open={open} classes={{ paper: classes.paper }}
        maxWidth="xs" fullWidth disableBackdropClick>
            <DialogContent>
                <h3 className={classes.message}>
                    {message}
                </h3>
            </DialogContent>
        </Dialog>
    );
}

export default CompletedDialog;