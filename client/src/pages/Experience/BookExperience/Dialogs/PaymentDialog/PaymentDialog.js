import React, {useState, useCallback} from 'react';

//Components and icons
import Template from '../Template';
import ExperienceSummary from '../../ExperienceSummary';
import DialogContent from '@material-ui/core/DialogContent';
import ChevronLeftIcon from '@material-ui/icons/ChevronLeft';
import PaymentMethod from './PaymentMethod';
import EmailForm from './EmailForm';

import {makeStyles} from '@material-ui/core/styles';
import styles from './PaymentDialogStyles';
const useStyles = makeStyles(styles);

const PaymentDialog = (props) => {
    const classes = useStyles();
    const totalPrice = (props.form.numGuests * +props.exp.price.perPerson);

    //Can submit form once the card input is valid
    const [enableSubmit, setEnableSubmit] = useState(false);
    const handleCanSubmit = (e) => { setEnableSubmit(true); }

    const {onChange} = props;
    //In case the user wants to use a different email
    const handleChangeEmail = (e) => { 
        onChange('email', e.target.value); 
    }

    //Allow user to save a card/use an existing card
    const handleRememberCardChange = (e) => {
        onChange('rememberCard', e.target.checked);
    }  
    const handleUseCardChange = useCallback((cardId) => {
        onChange('cardToUse', cardId);
        setEnableSubmit(true);
    }, [onChange]);

    return (
        <>
        <Template 
        open={props.openForm} 
        nextStep={props.controls.nextStep} 
        showContinue
        continueMessage={
            <span className={classes.submitMessage}>
                Confirm booking &bull; <span>$</span>{totalPrice}
            </span>
        }
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
                <PaymentMethod
                cards={props.cards}
                cardToUse={props.form.cardToUse}
                rememberCard={props.form.rememberCard}
                onRememberCard={handleRememberCardChange}
                onCardToUse={handleUseCardChange}
                onCanSubmit={handleCanSubmit}/>
                <div className={classes.totalPrice}>
                    <p>Total ({props.exp.price.currency})</p>
                    <p>
                        {props.form.bookType === 'private'?
                        `$${props.exp.price.private}` : 
                        <>{props.form.numGuests}<span> x </span> 
                          {(+props.exp.price.perPerson).toFixed(2)}<> = </> 
                          {totalPrice.toFixed(2)}
                        </>}
                    </p>
                </div>
                <EmailForm 
                userEmail={props.userEmail} 
                newEmail={props.form.email} 
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