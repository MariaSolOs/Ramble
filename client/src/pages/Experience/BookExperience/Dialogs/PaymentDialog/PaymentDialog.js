import React, {useState, useEffect, useCallback} from 'react';

//Components and icons
import Template from '../Template';
import ExperienceSummary from '../../ExperienceSummary/ExperienceSummary';
import DialogContent from '@material-ui/core/DialogContent';
import ChevronLeftIcon from '@material-ui/icons/ChevronLeft';
import PaymentMethod from './PaymentMethod';
import PromoCode from './PromoCode';
import EmailForm from './EmailForm';

import {makeStyles} from '@material-ui/core/styles';
import styles from './PaymentDialogStyles';
const useStyles = makeStyles(styles);

const PaymentDialog = (props) => {
    const classes = useStyles();

    //Can submit form once the card input is valid
    const [enableSubmit, setEnableSubmit] = useState(false);
    const handleCanSubmit = (val) => { setEnableSubmit(val); }

    //Initially set price according to numGuests and booking type
    const [expPrice, setExpPrice] = useState(
        props.form.bookType === 'public'?
        props.form.numGuests * props.exp.price.perPerson : 
        props.exp.price.private
    );

    const {onChange} = props;
    //In case the user wants to use a different email
    const handleChangeEmail = (val) => { 
        onChange('email', val); 
    }

    //Allow user to save a card/use an existing card
    const handleRememberCardChange = (e) => {
        onChange('rememberCard', e.target.checked);
    }  
    const handleUseCardChange = useCallback((cardId) => {
        onChange('cardToUse', cardId);
        setEnableSubmit(true);
    }, [onChange]);

    //If user referred a friend, apply promo
    useEffect(() => {
        if(props.user.promoCode.usedBy.length === 1) {
            setExpPrice(totalPrice => totalPrice * 0.8);
            onChange('promoCode', props.user.promoCode.code);
        }
    }, [props.user, onChange]); 
    //If user has a discount code
    const handleApplyPromo = (code) => {
        onChange('promoCode', code);
        setExpPrice(expPrice => expPrice * 0.8);
    }

    const taxGST = 0.05 * expPrice;
    const taxQST = 0.09975 * expPrice;

    return (
        <>
        <Template 
        open={props.openForm} 
        nextStep={props.controls.nextStep} 
        showContinue
        continueMessage={
            <span className={classes.submitMessage}>
                Confirm booking &bull; <span>$</span>{(expPrice + taxGST + taxQST).toFixed(2)}
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
                creatorName={props.exp.creator.user.fstName}
                cards={props.cards}
                cardToUse={props.form.cardToUse}
                rememberCard={props.form.rememberCard}
                onRememberCard={handleRememberCardChange}
                onCardToUse={handleUseCardChange}
                onCanSubmit={handleCanSubmit}/>
                {props.user.promoCode.usedBy.length === 1 ?
                    <p className={classes.promoMsg}>
                        Because you shared your code with a friend, you get 20% off!
                    </p> :
                    <PromoCode
                    userCode={props.user.promoCode.code}
                    promoCode={props.form.promoCode}
                    applyPromo={handleApplyPromo}
                    onCanSubmit={handleCanSubmit}/>}
                <div className={classes.priceCalc}>
                    <div className={classes.priceRow}>
                        <p>Subtotal</p>
                        <p>
                            {props.form.bookType === 'private'?
                            `$${props.exp.price.private}` : 
                            <>
                                {props.form.numGuests}<span> x </span> 
                                {(+props.exp.price.perPerson).toFixed(2)}
                                {(props.form.promoCode.length > 0)
                                    && <> - 20% </>} 
                                <> = </>{expPrice.toFixed(2)}
                            </>}
                        </p>
                    </div>
                    <div className={classes.priceRow}>
                        <p className="tax-row">TPS</p>
                        <p className="tax-row">{taxGST.toFixed(2)}</p>
                    </div>
                    <div className={classes.priceRow}>
                        <p className="tax-row">TVQ</p>
                        <p className="tax-row">{taxQST.toFixed(2)}</p>
                    </div>
                    <div className={classes.priceRow}>
                        <p>Total ({props.exp.price.currency})</p>
                        <p>${(expPrice + taxGST + taxQST).toFixed(2)}</p>
                    </div>
                </div>
                {!props.user.emailVerified &&
                    <EmailForm 
                    userEmail={props.user.email} 
                    newEmail={props.form.email} 
                    onChange={handleChangeEmail}
                    onCanSubmit={handleCanSubmit}/>}
                <p className={classes.policyMessage}>
                    By confirming this purchase you agree to the 
                    User Conditions and Policies regarding booking.
                    {/* <a href="#"> User Conditions and Policies </a> 
                    regarding booking. */}
                    {/* TODO: Replace this link with real one */}
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