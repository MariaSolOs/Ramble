import React, {useState, useEffect, useCallback} from 'react';
import axios from 'axios';
import {useStripe, useElements, CardElement} from '@stripe/react-stripe-js';
import {getWeekdayKey, getSlotsInfo} from './bookHelpers';
import useBookingReducer from './bookingReducer';
import withErrorDialog from '../../../hoc/withErrorDialog/withErrorDialog';

import * as steps from './steps';
import * as dialogs from './Dialogs';

const initForm = {
    date: null,
    timeslot: null,
    spotsLeft: null,
    bookType: null,
    numGuests: null
}

const BookExperience = ({exp, user, onClose, displayError}) => {
    //For handling booking details
    const [values, setValues] = useState(initForm);
    useEffect(() => {
        //Always reset the form when closing
        return () => { setValues(initForm); }
    }, []);
    const handleChange = useCallback((name, newVal) => {
        setValues(values => ({...values, [name]: newVal}));
    }, []);

    //Managing dialog switching and payment steps
    const [state, actions] = useBookingReducer();
    const cancelBooking = useCallback((msg = null) => {
        if(msg) { displayError(msg); }
        setTimeout(() => {
            onClose();
        }, 4000);
    }, [onClose, displayError]);
 
    //For fetching occurrences for a certain date
    const {setSlotsInfo} = actions;
     useEffect(() => {
        if(values.date) {
            //Cut off the time from query
            const dateQuery = values.date.split('T')[0];
            axios.get(`/api/exp/${exp._id}/occ`, 
            {params: {date: dateQuery}})
            .then(res => {
                if(res.status === 200) {
                    setSlotsInfo(
                        getSlotsInfo(
                            exp.avail.schedule[getWeekdayKey(values.date)], 
                            res.data.occ, 
                            exp.capacity
                        )
                    );
                }
            })
            .catch(err => {
                cancelBooking('We cannot find experience for this date.');
            });
        }
    }, [values.date, exp._id, exp.avail.schedule, 
        exp.capacity, setSlotsInfo, cancelBooking]);

    //Handling payment
    const stripe = useStripe();
    const elements = useElements();
    const handlePayment = async () => {
        actions.payInit();
        try {
            let clientSecret;
            //Get client secret from server
            const payIntent = await axios.post('/api/stripe/payment-intent', {
                expId: exp._id,
                transferId: exp.creator.stripe.id,
                ...values
            });
            if(payIntent.status === 200) {
                clientSecret = payIntent.data.clientSecret;
            }
            if (!stripe || !elements) { 
                cancelBooking('Your booking cannot be completed right now.');
                return; 
            } 
            //Confirm payment with Stripe
            const payConfirm = await stripe.confirmCardPayment(clientSecret, {
                payment_method: {
                    card: elements.getElement(CardElement),
                    billing_details: {
                        name: `${user.fstName} ${user.lstName}`
                    }
                }
            });
            if(payConfirm.error) {
                cancelBooking(payConfirm.error.message);
            } else if(payConfirm.paymentIntent.status === 'requires_capture') {
                axios.post(`/api/exp/${exp._id}/occ`, {
                    ...values,
                    stripeId: payConfirm.paymentIntent.id
                })
                .then(res => {
                    console.log(res)
                    if(res.data.status === 'succeeded') {
                        actions.payComplete(`Congrats ${user.fstName}! 
                        Your booking was successfully completed.`);
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
                        selec: values.date
                    }}
                    availDays={Object.keys(exp.avail.schedule)}
                    onChange={handleChange}
                    controls={{
                        goBack: onClose,
                        nextStep: actions.setStep(steps.TIMES)
                    }}/>
        case steps.TIMES: 
            return <dialogs.TimesDialog
                    open
                    date={values.date}
                    timeslot={values.timeslot}
                    onChange={handleChange}
                    slotsInfo={state.slotsInfo}
                    exp={{
                        availDays: Object.keys(exp.avail.schedule),
                        capacity: exp.capacity
                    }}
                    controls={{
                        goBack: actions.setStep(steps.CALENDAR),
                        nextStep: actions.setStep(steps.BOOK_TYPE)
                    }}/>
        case steps.BOOK_TYPE:
            return <dialogs.BookTypeDialog
                    open
                    form={values}
                    exp={{
                        title: exp.title,
                        creator: exp.creator,
                        capacity: exp.capacity,
                        img: exp.images[0],
                        price: exp.price,
                    }}
                    onChange={handleChange}
                    controls={{
                        goBack: actions.setStep(steps.TIMES),
                        nextStep: actions.setStep(steps.PAYMENT)
                    }}/>
        case steps.PAYMENT: 
            return <dialogs.PaymentDialog 
                    openForm={!state.payDone}
                    openStatus={state.payProcessing || state.payDone}
                    payMessage={state.payMsg}
                    form={values}
                    exp={{
                        title: exp.title,
                        creator: exp.creator,
                        img: exp.images[0],
                        price: exp.price
                    }}
                    controls={{
                        goBack: actions.setStep(steps.BOOK_TYPE),
                        nextStep: handlePayment
                    }}/>
        default: return null;
    }
}

export default withErrorDialog(BookExperience);