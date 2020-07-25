import React, {useState} from 'react';

//Components and icons
import Template from '../Template';
import ExperienceSummary from '../../ExperienceSummary';
import DialogContent from '@material-ui/core/DialogContent';
import ChevronLeftIcon from '@material-ui/icons/ChevronLeft';
import CardInput from './StripeCardInput';

import {makeStyles} from '@material-ui/core/styles';
import styles from './PaymentDialogStyles';
const useStyles = makeStyles(styles);

const PaymentDialog = ({openForm, openStatus, payMessage, form, exp, controls}) => {
    const classes = useStyles();
    const totalPrice = (form.numGuests * +exp.price.perPerson);

    const [enableSubmit, setEnableSubmit] = useState(false);
    const handleCardInputChange = (e) => {
        if(e.complete) { setEnableSubmit(true); }
    }

    return (
        <>
        <Template 
        open={openForm} 
        controls={controls} 
        showContinue
        continueDisabled={!enableSubmit}>
            <div className={classes.header}>
                <ChevronLeftIcon onClick={controls.goBack} className="goBackIcon"/>
                <h5 className="title">Payment</h5>
            </div>
            <DialogContent>
                <div className={classes.expWrapper}>
                    <ExperienceSummary 
                    date={form.date} 
                    timeslot={form.timeslot} 
                    exp={exp}/>
                </div>
                <div className={classes.formSummary}>
                    <p className={classes.label}>Payment method</p>
                    <CardInput onChange={handleCardInputChange}/>
                    <p className={classes.label}>Number of guests</p>
                    <p className={classes.numGuests}>
                        <span>{form.numGuests}</span>
                        {form.numGuests > 1? ' Guests' : ' Guest'}
                    </p>
                    <div className={classes.priceRow}>
                        <p>
                            {form.numGuests} <span>x</span> ${(+exp.price.perPerson).toFixed(2)}
                        </p>
                        <p>${totalPrice.toFixed(2)}</p>
                    </div>
                    <div className={classes.priceRow}>
                        <p className="total">Total ({exp.price.currency})</p>
                        <p className="total">${totalPrice.toFixed(2)}</p>
                    </div>
                </div>
                {/* TODO: Replace this link with real one */}
                <p className={classes.policyMessage}>
                    By confirming this purchase you agree to the 
                    User Conditions and Policies regarding booking.
                    {/* <a href="#"> User Conditions and Policies </a> 
                    regarding booking. */}
                </p>
            </DialogContent>
        </Template>
        <Template open={openStatus}>
            <h3 style={{ color: '#FFF' }}>{payMessage}</h3>
        </Template>
        </>
    );
}

export default PaymentDialog;