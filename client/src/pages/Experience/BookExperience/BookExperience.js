import React, {useEffect, useCallback} from 'react';
import axios from '../../../tokenizedAxios';
import {useStripe, useElements, CardElement} from '@stripe/react-stripe-js';
import {getWeekdayKey, getSlotsInfo} from './bookHelpers';
import withErrorDialog from '../../../hoc/withErrorDialog/withErrorDialog';
import useBookingReducer from './store/reducer';
import {steps, actions} from './store/types';

import * as dialogs from './Dialogs';

const BookExperience = ({exp, user, onClose, displayError}) => {
    //Managing dialog switching and payment steps
    const [state, dispatch] = useBookingReducer();
    const setStep = useCallback((step) => () => {
        dispatch({type: actions.SET_STEP, step})
    }, [dispatch]);
    const cancelBooking = useCallback((msg = null) => {
        if(msg) { displayError(msg); }
        setTimeout(() => {
            onClose();
        }, 4000);
    }, [onClose, displayError]);

    //For handling booking details
    const handleChange = useCallback((name, value) => {
        dispatch({type: actions.ADD_INPUT, name, value})
    }, [dispatch]);
 
    //For fetching occurrences for a certain date
    useEffect(() => {
        if(state.form.date) {
            //Cut off the time from query
            const dateQuery = state.form.date.split('T')[0];
            axios.get(`/api/exp/${exp._id}/occ`, 
            {params: {date: dateQuery}})
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
            let clientSecret;
            //Get client secret from server
            const payIntent = await axios.post('/api/stripe/payment-intent', {
                expId: exp._id,
                transferId: exp.creator.stripe.id,
                creatorId: exp.creator._id,
                ...state.form
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
                axios.post(`/api/exp/${exp._id}/occ`, {
                    ...state.form,
                    stripeId: payConfirm.paymentIntent.id
                })
                .then(res => {
                    if(res.data.status === 'succeeded') {
                        dispatch({
                            type: actions.PAY_COMPLETE,
                            msg: `Congrats ${user.fstName}! 
                            Your booking was successfully completed.`
                        });
                        setTimeout(() => { onClose(); }, 4000);
                    } else { cancelBooking('Please contact us.'); }
                })
                .catch(err => { cancelBooking('Please contact us.'); });
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
                    onChange={handleChange}
                    controls={{
                        goBack: setStep(steps.BOOK_TYPE),
                        nextStep: handlePayment
                    }}/>
        default: return null;
    }
}

export default withErrorDialog(BookExperience);