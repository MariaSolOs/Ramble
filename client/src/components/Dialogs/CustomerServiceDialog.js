import React from 'react';

import Dialog from '@material-ui/core/Dialog';
import DialogContent from '@material-ui/core/DialogContent';
import {FontAwesomeIcon} from '@fortawesome/react-fontawesome';
import {faPhoneAlt} from '@fortawesome/free-solid-svg-icons/faPhoneAlt';
import {faEnvelope} from '@fortawesome/free-solid-svg-icons/faEnvelope';

import {makeStyles} from '@material-ui/core/styles';
const useStyles = makeStyles(() => ({
    paper: {
        backgroundColor: 'rgb(30, 30, 30)',
        borderRadius: '1.1rem',
        padding: '2% 6% 1.2% 2%',
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
    },
    content: { padding: '8px 8px 0' },

    contactInfo: {
        display: 'flex',
        alignItems: 'center',
        marginBottom: 10,
        '& svg': {
            color: '#C0BFBA',
            fontSize: '1.25rem',
            marginRight: '1rem'
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
            <DialogContent className={classes.content}>
                <div className={classes.contactInfo}>
                    <FontAwesomeIcon icon={faPhoneAlt}/>
                    <p>+ 1 (514) 654-7156</p>
                </div>
                <div className={classes.contactInfo}>
                    <FontAwesomeIcon icon={faEnvelope}/>
                    <p>support@ramble.com</p>
                </div>
            </DialogContent>
        </Dialog>
    );
}

export default CustomerServiceDialog;