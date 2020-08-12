import React, {useEffect, useCallback} from 'react';
import axios from '../../../tokenizedAxios';
import {useStripe, useElements, CardElement} from '@stripe/react-stripe-js';
import {getWeekdayKey, getSlotsInfo} from './helpers';
import useBookingReducer from './store/reducer';
import {steps, actions} from './store/types';
import {useDispatch} from 'react-redux';
import {showError} from '../../../store/actions/ui';

import * as dialogs from './Dialogs';

const BookExperience = ({exp, user, onClose}) => {
    //Managing dialog switching and payment steps
    const [state, dispatch] = useBookingReducer();
    const setStep = useCallback((step) => () => {
        dispatch({type: actions.SET_STEP, step})
    }, [dispatch]);

    //For booking cancelling
    const uiDispatch = useDispatch();
    const cancelBooking = useCallback((msg = null) => {
        if(msg) { uiDispatch(showError(msg)); }
        setTimeout(() => {
            onClose();
        }, 4000);
    }, [onClose, uiDispatch]);

    //For handling booking details
    const handleChange = useCallback((name, value) => {
        dispatch({type: actions.ADD_INPUT, name, value})
    }, [dispatch]);
 
    //For fetching occurrences for a certain date
    useEffect(() => {
        if(state.form.date) {
            //Cut off the time from query
            axios.get(`/api/occ/${exp._id}`, 
            {params: {date: state.form.date}})
            .then(res => {
                if(res.status === 200) {
                    dispatch({
                        type: actions.SET_SLOTS_INFO,
                        slotsInfo: getSlotsInfo(
                            exp.avail.schedule[getWeekdayKey(state.form.date)], 
                            res.data.occ, 
                            exp.capacity
                        )
                    });
                }
            })
            .catch(err => {
                cancelBooking('This date is not available.');
            });
        }
    }, [state.form.date, exp._id, exp.avail.schedule, exp.capacity, 
        dispatch, cancelBooking]);

    //Handling payment
    const stripe = useStripe();
    const elements = useElements();
    const handlePayment = async () => {
        dispatch({type: actions.PAY_INIT});
        try {
            let newPayMethod = null;
            let clientSecret;
            //Save payment information if user wants to
            if(state.form.rememberCard) {
                const createdPayMethod = await stripe.createPaymentMethod({
                    type: 'card',
                    card: elements.getElement(CardElement),
                    billing_details: {
                        name: `${user.fstName} ${user.lstName}`,
                    }
                });
                if(createdPayMethod.error) {
                    cancelBooking(createdPayMethod.error.message);
                } else {
                    newPayMethod = createdPayMethod.paymentMethod.id;
                }
            }
            //Create payment intent and get client secret 
            const payIntent = await axios.post('/api/stripe/payment-intent', {
                expId: exp._id,
                transferId: exp.creator.stripe.accountId,
                creatorId: exp.creator._id,
                bookType: state.form.bookType,
                numGuests: state.form.numGuests,
                newPayMethod
            });
            if(payIntent.status === 200) {
                clientSecret = payIntent.data.clientSecret;
            }
            if (!stripe || !elements || payIntent.status !== 200) { 
                cancelBooking('Your booking cannot be completed right now.');
                return; 
            } 
            //Confirm payment with Stripe
            const payConfirm = await stripe.confirmCardPayment(clientSecret, {
                payment_method: {
                    card: elements.getElement(CardElement),
                    billing_details: {
                        name: `${user.fstName} ${user.lstName}`,
                    }
                },
                receipt_email: state.form.email || user.email
            });
            if(payConfirm.error) {
                cancelBooking(payConfirm.error.message);
            } else if(payConfirm.paymentIntent.status === 'requires_capture') {
                //Everything is good so far, now add booking to occurrence
                axios.post(`/api/occ/${exp._id}/bookings`, {
                    date: state.form.date,
                    timeslot: state.form.timeslot,
                    numGuests: state.form.numGuests,
                    stripeId: payConfirm.paymentIntent.id,
                    creatorProfit: payConfirm.paymentIntent.amount * 0.85
                })
                .then(res => {
                    if(res.status === 201) {
                        dispatch({
                            type: actions.PAY_COMPLETE,
                            msg: `Congrats ${user.fstName}! 
                            Your booking was successfully completed.`
                        });
                    } else {
                        cancelBooking('Please contact us.');
                    }
                    setTimeout(() => { onClose(); }, 4000);
                }).catch(err => { cancelBooking('Please contact us.'); });
            }
        } catch(err) { cancelBooking('Please contact us.'); }
    }

    switch(state.step) {
        case steps.CALENDAR: 
            //Either today or the min date from exp timeframe
            const minDate = new Date(Math.max(new Date(exp.avail.from), new Date()));
            return <dialogs.CalendarDialog 
                    open
                    date={{
                        min: minDate,
                        max: new Date(exp.avail.to),
                        selec: state.form.date
                    }}
                    availDays={Object.keys(exp.avail.schedule)}
                    onChange={handleChange}
                    controls={{
                        goBack: onClose,
                        nextStep: setStep(steps.TIMES)
                    }}/>
        case steps.TIMES: 
            return <dialogs.TimesDialog
                    open
                    date={state.form.date}
                    timeslot={state.form.timeslot}
                    onChange={handleChange}
                    slotsInfo={state.slotsInfo}
                    expCapacity={exp.capacity}
                    controls={{
                        goBack: setStep(steps.CALENDAR),
                        nextStep: setStep(steps.BOOK_TYPE)
                    }}/>
        case steps.BOOK_TYPE:
            return <dialogs.BookTypeDialog
                    open
                    form={state.form}
                    exp={{
                        title: exp.title,
                        creator: exp.creator,
                        capacity: exp.capacity,
                        img: exp.images[0],
                        price: exp.price,
                    }}
                    onChange={handleChange}
                    controls={{
                        goBack: setStep(steps.TIMES),
                        nextStep: setStep(steps.PAYMENT)
                    }}/>
        case steps.PAYMENT: 
            return <dialogs.PaymentDialog 
                    openForm={!state.payDone}
                    openStatus={state.payProcessing || state.payDone}
                    payMessage={state.payMsg}
                    form={state.form}
                    exp={{
                        title: exp.title,
                        creator: exp.creator,
                        img: exp.images[0],
                        price: exp.price
                    }}
                    userEmail={user.email}
                    savedCard={user.savedCard}
                    onChange={handleChange}
                    controls={{
                        goBack: setStep(steps.BOOK_TYPE),
                        nextStep: handlePayment
                    }}/>
        default: return null;
    }
}

export default BookExperience;