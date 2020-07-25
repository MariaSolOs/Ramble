import React from 'react';

//Components
import Dialog from '@material-ui/core/Dialog';
import OhNoPic from './OhNoRamble.png';

import {makeStyles} from '@material-ui/core/styles';
const useStyles = makeStyles(() => ({
    //Containers
    paper: {
        backgroundColor: 'rgba(30, 30, 30, 0.95)',
        borderRadius: '1.1rem',
        padding: '1% 2%',
    },

    header: {
        fontFamily: 'Helvetica, sans-serif',
        fontSize: '1.1rem',
        fontWeight: 'bold',
        color: '#FFF',
        letterSpacing: '-0.05rem',
        width: '100%',
        display: 'flex',
        alignItems: 'center',
        '& img': {
            width: 70,
            height: 70,
            marginRight: 15
        }
    },
    message: {
        fontFamily: 'Helvetica, sans-serif',
        fontWeight: 'bold',
        fontSize: '1rem',
        color: '#DFDFDF',
        letterSpacing: '-0.05rem',
    }
}));

const ErrorDialog = ({open, onClose, message}) => {
    const classes = useStyles();

    return (
        <Dialog
        open={open}
        onClose={onClose}
        aria-labelledby="idle-modal-title"
        aria-describedby="idle-modal"
        maxWidth="sm"
        classes={{ paper: classes.paper }}>
            <div className={classes.header}>
                <img src={OhNoPic} alt="Oh no Ramble face"/>
                Sorry 'bout that. 
            </div>
            <p className={classes.message}>
                We f*cked up. {message}
            </p>
        </Dialog>
    );
}

export default ErrorDialog;