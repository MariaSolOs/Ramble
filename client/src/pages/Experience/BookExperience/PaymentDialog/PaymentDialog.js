import React, {useState} from 'react';

//Components and icons
import ExperienceSummary from '../ExperienceSummary';
import Dialog from '@material-ui/core/Dialog';
import DialogContent from '@material-ui/core/DialogContent';
import ChevronLeftIcon from '@material-ui/icons/ChevronLeft';
import CardInput from './StripeCardInput';

import {makeStyles} from '@material-ui/core/styles';
import styles from './PaymentDialogStyles';
const useStyles = makeStyles(styles);

const PaymentDialog = ({open, form, exp, controls}) => {
    const classes = useStyles();
    const totalPrice = (form.numGuests * +exp.price.perPerson);

    const [enableSubmit, setEnableSubmit] = useState(false);
    const handleCardInputChange = (e) => {
        if(e.complete) { setEnableSubmit(true); }
    }

    return (
        <Dialog open={open} onClose={controls.goBack}
        classes={{ paper: classes.paper }}
        maxWidth="xs" fullWidth disableBackdropClick>
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
                    <a href="#"> User Conditions and Policies </a> 
                    regarding booking.
                </p>
                <button 
                disabled={!enableSubmit}
                onClick={controls.next}
                className={classes.continueButton}>
                    Confirm booking &bull; ${totalPrice}
                </button>
            </DialogContent>
        </Dialog>
    );
}

export default PaymentDialog;