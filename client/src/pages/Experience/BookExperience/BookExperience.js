import React, {useState, useEffect, useCallback} from 'react';
import axios from 'axios';
import {useStripe, useElements, CardElement} from '@stripe/react-stripe-js';
import {getWeekdayKey, getSlotsInfo} from './bookHelpers';
import useBookingReducer from './bookingReducer';

import * as steps from './steps';
import * as dialogs from './Dialogs';

const BookExperience = ({exp, user, closeBooking}) => {
    //Managing dialog switching and payment steps
    const [state, actions] = useBookingReducer();
    const cancelBooking = () => {
        actions.setStep();
        closeBooking();
    }

    //For handling booking details
    const [values, setValues] = useState({
        date: null,
        timeslot: null,
        spotsLeft: null,
        bookType: null,
        numGuests: null
    });
    const handleChange = useCallback((name, newVal) => {
        setValues(values => ({...values, [name]: newVal}));
    }, []);
 
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
                console.log(err);
                closeBooking();
            });
        }
    }, [values.date, exp._id, exp.avail.schedule, 
        exp.capacity, setSlotsInfo, closeBooking]);

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
            console.log(payIntent)
            if(payIntent.status === 200) {
                clientSecret = payIntent.data.clientSecret;
            }
            if (!stripe || !elements) { 
                actions.payComplete("Sorry, the booking couldn't be completed.");
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
                //Show error to your customer (e.g., insufficient funds)
                console.log(payConfirm.error.message);
            } else {
                console.log(payConfirm);
                if(payConfirm.paymentIntent.status === 'requires_capture') {
                    axios.post(`/api/exp/${exp._id}/occ`, {
                        ...values,
                        stripeId: payConfirm.paymentIntent.id
                    })
                    .then(res => {
                        console.log(res)
                        if(res.status === 200) {
                            actions.payComplete(`Congrats ${user.fstName}! 
                            Your booking was successfully completed.`);
                        }
                    })
                    .catch(err => {
                        actions.payComplete('Oh no, something went wrong...');
                        console.log(err)
                    });
                }
            }
        } catch(err) {
            console.log(err);
            actions.payComplete('Oh no, something went wrong...');
        }
        //No matter what, after 4 seconds close booking
        setTimeout(() => {
            cancelBooking();
        }, 4000);
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
                        goBack: cancelBooking,
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
            return <>
                    <dialogs.PaymentDialog 
                    open={!state.payDone}
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
                    <dialogs.CompletedDialog
                    open={state.payProcessing || state.payDone}
                    message={state.payMsg}/>
                    </>
        default: return null;
    }
}

export default BookExperience;