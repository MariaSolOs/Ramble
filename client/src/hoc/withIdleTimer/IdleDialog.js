import React from 'react';

//Components
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogTitle from '@material-ui/core/DialogTitle';
import clockImg from './idleClock.svg';

import {makeStyles} from '@material-ui/core/styles';
const useStyles = makeStyles(() => ({
    //Containers
    paper: {
        backgroundColor: 'rgba(30, 30, 30, 0.95)',
        borderRadius: '1.1rem',
        padding: '1%',
    },
    actions_root: { padding: 0 },

    title: {
        fontFamily: 'Helvetica, sans-serif',
        fontSize: '1.1rem',
        fontWeight: 'bold',
        color: '#DFDFDF',
        letterSpacing: '-0.05rem',
        paddingTop: 5
    },

    //Clock image
    clock: {
        height: 80,
        width: 80,
        margin: '0 auto'
    },
    closeButton: {
        fontFamily: 'Helvetica, sans-serif',
        fontWeight: 'bold',
        fontSize: '1.1rem',
        color: '#DFDFDF',
        letterSpacing: '-0.05rem',
        backgroundColor: '#4F4F4F',
        border: 'none',
        margin: '1rem auto 0',
        width: '80%',
        padding: '0.8rem 1.8rem',
        borderRadius: '0.8rem',
        cursor: 'pointer', 
        '&:focus': { outline: 'none' }
    }
}));

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