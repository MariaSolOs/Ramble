import React, { useState, useEffect, useCallback } from 'react';
import { PaymentDialogText as text } from '../DialogsText';

import Template from '../Template';
import ExperienceSummary from '../../ExperienceSummary/ExperienceSummary';
import DialogContent from '@material-ui/core/DialogContent';
import ChevronLeftIcon from '@material-ui/icons/ChevronLeft';
import PaymentMethod from './PaymentMethod';
import PromoCode from './PromoCode';
import EmailForm from './EmailForm';

import { makeStyles } from '@material-ui/core/styles';
import styles from './PaymentDialogStyles';
const useStyles = makeStyles(styles);

const PaymentDialog = (props) => {
    const classes = useStyles();

    // Can submit form once the card input is valid
    const [enableSubmit, setEnableSubmit] = useState(false);
    const handleCanSubmit = (val) => { setEnableSubmit(val); }

    // Initially set price according to numGuests and booking type
    const [expPrice, setExpPrice] = useState(
        props.form.bookType === 'public'?
            props.exp.isOnline ?
                props.exp.price.perPerson:
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

    // Price breakdown
    const serviceFee = (expPrice * 0.0345) + 0.33;
    const subTotal = serviceFee + expPrice;
    const taxGST = 0.05 * subTotal;
    const taxQST = 0.09975 * subTotal;

    return (
        <>
        <Template 
        open={props.openForm} 
        nextStep={props.controls.nextStep} 
        showContinue
        lang={props.lang}
        continueMessage={
            <span className={classes.submitMessage}>
                {text.confirmBook[props.lang]} &bull; <span>$</span>{(subTotal + taxGST + taxQST).toFixed(2)}
            </span>
        }
        continueDisabled={!enableSubmit}>
            <div className={classes.header}>
                <ChevronLeftIcon onClick={props.controls.goBack} className="goBackIcon"/>
                <h5 className="title">{text.payment[props.lang]}</h5>
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
                        <p>{text.subTotal[props.lang]}</p>
                        <p>
                            {props.form.bookType === 'private'?
                            `$${props.exp.price.private}` : 
                            <>
                                {props.exp.isOnline?
                                    expPrice.toFixed(2) : 
                                    <>{props.form.numGuests}<span> x </span> 
                                    {(+props.exp.price.perPerson).toFixed(2)}
                                    {(props.form.promoCode.length > 0)
                                        && <> - 20% </>} 
                                    <> = </>{expPrice.toFixed(2)}
                                    </>}
                            </>}
                        </p>
                    </div>
                    <div className={classes.priceRow}>
                        <p className="costs-row">{text.serviceFee[props.lang]}</p>
                        <p className="costs-row">{serviceFee.toFixed(2)}</p>
                    </div>
                    <div className={classes.priceRow}>
                        <p className="costs-row">TPS</p>
                        <p className="costs-row">{taxGST.toFixed(2)}</p>
                    </div>
                    <div className={classes.priceRow}>
                        <p className="costs-row">TVQ</p>
                        <p className="costs-row">{taxQST.toFixed(2)}</p>
                    </div>
                    <div className={classes.priceRow}>
                        <p>Total ({props.exp.price.currency})</p>
                        <p>${(subTotal + taxGST + taxQST).toFixed(2)}</p>
                    </div>
                </div>
                {!props.user.emailVerified &&
                    <EmailForm 
                    userEmail={props.user.email} 
                    newEmail={props.form.email} 
                    onChange={handleChangeEmail}
                    onCanSubmit={handleCanSubmit}/>}
                <p className={classes.policyMessage}>
                    {text.policyMsg[props.lang]}
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