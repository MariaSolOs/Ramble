import React from 'react';

import {CardElement} from '@stripe/react-stripe-js';

import {makeStyles} from '@material-ui/core/styles';
import {baseClass, styles} from './StripeCardInputStyles';
const useStyles = makeStyles(baseClass);

const StripeCardInput = ({onChange}) => {
    const {base} = useStyles();
    const options = {
        iconStyle: 'solid',
        classes: { base },
        style: { ...styles }
    }

    return <CardElement 
            options={options} 
            onChange={onChange}/>
}

export default StripeCardInput;