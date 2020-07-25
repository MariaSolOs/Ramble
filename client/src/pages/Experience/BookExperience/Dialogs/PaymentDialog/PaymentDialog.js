import React, {useState} from 'react';

//Components and icons
import Template from '../Template';
import ExperienceSummary from '../../ExperienceSummary';
import DialogContent from '@material-ui/core/DialogContent';
import ChevronLeftIcon from '@material-ui/icons/ChevronLeft';
import CardInput from './StripeCardInput';
import EmailForm from './EmailForm';

import {makeStyles} from '@material-ui/core/styles';
import styles from './PaymentDialogStyles';
const useStyles = makeStyles(styles);

const PaymentDialog = (props) => {
    const classes = useStyles();
    const totalPrice = (props.form.numGuests * +props.exp.price.perPerson);

    //Can submit form once the card input is valid
    const [enableSubmit, setEnableSubmit] = useState(false);
    const handleCardInputChange = (e) => {
        if(e.complete) { setEnableSubmit(true); }
    }

    //In case the user wants to use a different email
    const handleChangeEmail = (e) => { 
        props.onChange('email', e.target.value); 
    }

    return (
        <>
        <Template 
        open={props.openForm} 
        nextStep={props.controls.nextStep} 
        showContinue
        continueDisabled={!enableSubmit}>
            <div className={classes.header}>
                <ChevronLeftIcon onClick={props.controls.goBack} className="goBackIcon"/>
                <h5 className="title">Payment</h5>
            </div>
            <DialogContent>
                <div className={classes.expWrapper}>
                    <ExperienceSummary 
                    date={props.form.date} 
                    timeslot={props.form.timeslot} 
                    exp={props.exp}/>
                </div>
                <div className={classes.payInfo}>
                    <p className={classes.label}>Payment method</p>
                    <CardInput onChange={handleCardInputChange}/>
                    <div className={classes.priceRow}>
                        <p>Total ({props.exp.price.currency})</p>
                        <p>
                            {props.form.numGuests} <span>x</span> ${(+props.exp.price.perPerson).toFixed(2)} =
                            ${totalPrice.toFixed(2)}
                        </p>
                    </div>
                </div>
                <EmailForm 
                userEmail={props.userEmail} 
                newEmail={props.newEmail} 
                onChange={handleChangeEmail}/>
                {/* TODO: Replace this link with real one */}
                <p className={classes.policyMessage}>
                    By confirming this purchase you agree to the 
                    User Conditions and Policies regarding booking.
                    {/* <a href="#"> User Conditions and Policies </a> 
                    regarding booking. */}
                </p>
            </DialogContent>
        </Template>
        <Template open={props.openStatus}>
            <h3 style={{ color: '#FFF' }}>{props.payMessage}</h3>
        </Template>
        </>
    );
}

export default PaymentDialog;