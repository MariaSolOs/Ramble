import React from 'react';

//Components
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogTitle from '@material-ui/core/DialogTitle';
import clockImg from './idleClock.svg';

import {makeStyles} from '@material-ui/core/styles';
import styles from './IdleDialogStyles';
const useStyles = makeStyles(styles);

const IdleModal = ({open, handleClose}) => {
    const classes = useStyles();

    return (
        <Dialog
        open={open}
        onClose={handleClose}
        aria-labelledby="idle-modal-title"
        aria-describedby="idle-modal"
        maxWidth="xs"
        classes={{ paper: classes.paper }}>
            <img src={clockImg} alt="clock" className={classes.clock}/>
            <DialogTitle 
            id="idle-modal-title"
            disableTypography
            classes={{ root: classes.title }}>
                Are you still there?
            </DialogTitle>
            <DialogActions classes={{ root: classes.actions_root }}>
                <button className={classes.closeButton} onClick={handleClose}>
                    Yes
                </button>
            </DialogActions>
        </Dialog>
    );
}

export default IdleModal;