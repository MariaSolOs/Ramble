import React from 'react';

import Dialog from '@material-ui/core/Dialog';
import DialogContent from '@material-ui/core/DialogContent';

import {makeStyles} from '@material-ui/core/styles';
const useStyles = makeStyles(() => ({
    paper: {
        backgroundColor: 'rgb(30, 30, 30)',
        borderRadius: '1.1rem',
        padding: '2%',
        fontFamily: 'Helvetica, sans-serif',
        fontWeight: 'bold',
        letterSpacing: '-0.05rem',

        '& p': { 
            color: '#C0BFBA',
            margin: '5px 0'
        }
    },

    header: {
        '& .title': {
            fontSize: '1.2rem',
            color: '#ECEBE5',
            margin: 0
        }
    }
}));

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
            <DialogContent>
                
            </DialogContent>
        </Dialog>
    );
}

export default CustomerServiceDialog;