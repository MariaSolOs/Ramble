import React from 'react';

import Dialog from '@material-ui/core/Dialog';

import {makeStyles} from '@material-ui/core/styles';
const useStyles = makeStyles(() => ({
    paper: {
        backgroundColor: '#151515',
        borderRadius: '1.1rem',
        padding: '1rem 0.7rem',
        fontFamily: 'Helvetica, sans-serif',
        fontWeight: 'bold',
        letterSpacing: '-0.05rem',
    },

    continueButton: {
        display: 'block',
        width: '85%',
        margin: '0 auto',
        padding: '0.6rem 0.75rem',
        borderRadius: '0.4rem',
        border: 'none',
        background: 'radial-gradient(circle at -21.27%, #2BB282, #2D73EA)',
        fontFamily: 'Helvetica, sans-serif',
        fontWeight: 'bold',
        fontSize: '0.9rem',
        letterSpacing: '-0.04rem',
        color: '#ECEBE5',
        cursor: 'pointer',
        transition: 'filter 200ms ease-in',
        '&:focus': { outline: 'none' },
        '&:hover': { outline: 'none' },
        '&:disabled': { 
            filter: 'brightness(40%)',
            cursor: 'not-allowed'
        }
    }
}));

/**
 * Template for booking dialogs
 * @param {Boolean} open - When should the dialog open 
 * @param {Object} controls - Callbacks for switching dialogs 
 * @param {Boolean} continueDisabled - If false, the user cannot continue
 */
const Template = (props) => {
    const classes = useStyles();

    return (
        <Dialog 
        open={props.open} 
        onClose={props.controls.goBack} 
        disableBackdropClick
        classes={{ paper: classes.paper }}
        maxWidth="xs" fullWidth>
            {props.children}
            <button onClick={props.controls.nextStep}
            className={classes.continueButton}
            disabled={props.continueDisabled}>
                Continue
            </button>
        </Dialog>
    );
}

export default Template;