import React, {useState} from 'react';
import useSavedCards from '../../../../../hooks/useSavedCards';

//Components and icons
import {CardElement} from '@stripe/react-stripe-js';
import MenuItem from '@material-ui/core/MenuItem';
import TextField from '../../../../../components/Input/TextField';
import Checkbox from '../../../../../components/Input/Checkbox';
import {FontAwesomeIcon} from '@fortawesome/react-fontawesome';
import {faCcVisa} from '@fortawesome/free-brands-svg-icons/faCcVisa';

import {makeStyles} from '@material-ui/core/styles';
import styles from './PaymentDialogStyles';
const useStyles = makeStyles(styles);

const PaymentMethod = (props) => {
    const classes = useStyles();
    const stripeInputOptions = {
        iconStyle: 'solid',
        classes: { base: classes.stripeBase },
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

    const cards = useSavedCards();

    const [showStripeInput, setShowStripeInput] = useState();
    //If the user wants to use a new card
    const handleStripeInputChange = (e) => {
        if(e.complete) { props.onCanSubmit(); }
    }   

    return (
        <div className={classes.payMethod}>
            <p className={classes.label}>Payment method</p>
            {cards.length > 0 && !showStripeInput?
            <>
                <TextField 
                select
                fullWidth
                value={cards[0].id}
                onChange={props.onCardToUse}>
                    {cards.map(card => (
                        <MenuItem 
                        key={card.id}
                        value={card.id}>
                            {card.last4}
                        </MenuItem> 
                    ))}
                </TextField>
                <div className={classes.checkboxField}>
                    <p>Use a different card</p>
                    <Checkbox 
                    checked={showStripeInput}
                    onChange={() => setShowStripeInput(true)}/>
                </div>
            </>
            : 
            <>
                <CardElement 
                options={stripeInputOptions} 
                onChange={handleStripeInputChange}/>
                <div className={classes.checkboxField}>
                    <p>Remember my payment information</p>
                    <Checkbox 
                    checked={props.rememberCard}
                    onChange={props.onRememberCard}/>
                </div>
            </>}
        </div>
    );
}

export default PaymentMethod;