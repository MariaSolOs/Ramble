import React from 'react';

import {CardElement} from '@stripe/react-stripe-js';

import {makeStyles} from '@material-ui/core/styles';
const useStyles = makeStyles(() => ({
    base: {
        height: 30,
        '& .__PrivateStripeElement': {
            height: '100%'
        },
        '& .__PrivateStripeElement-input': {
            height: 30
        }
    }
}));

const StripeCardInput = ({onChange}) => {
    const {base} = useStyles();
    const options = {
        iconStyle: 'solid',
        classes: { base },
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
                color: '#D8246E',
                iconColor: '#D8246E',
                textShadow: 'none'
            }
        }
    }

    return <CardElement 
            options={options} 
            onChange={onChange}/>
}

export default StripeCardInput;