import React from 'react';
import {CardElement} from '@stripe/react-stripe-js';

import {makeStyles} from '@material-ui/core/styles';
const useStyles = makeStyles(() => ({
    base: { 
        height: 40,
        marginBottom: 10,
        '& .__PrivateStripeElement': {
            height: '100%'
        },
        '& .__PrivateStripeElement-input': {
            height: 30
        }
    }
}));

const StripeCardInput = ({onChange}) => {
    const classes = useStyles();
    const CardInputOptions = {
        iconStyle: 'solid',
        classes: { base: classes.base },
        style: {
            base: {
                fontFamily: 'Helvetica, sans-serif',
                fontWeight: 'bold',
                letterSpacing: '-0.05rem',
                fontSize: '17px',
                color: '#FFF',
                fontSmoothing: 'antialiased',
                textShadow: 'none'
            },
            invalid: {
                color: '#C70039',
                iconColor: '#C70039',
                textShadow: 'none'
            }
        }
    }

    return <CardElement options={CardInputOptions} onChange={onChange}/>;
}

export default StripeCardInput;