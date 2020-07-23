import React, {useState, useCallback, useEffect} from 'react';
import axios from 'axios';
import {useStripe, useElements, CardElement} from '@stripe/react-stripe-js';
import {getWeekdayKey, getSlotsInfo} from './bookHelpers';

//Dialogs
import CalendarDialog from './CalendarDialog/CalendarDialog';
import TimesDialog from './TimesDialog/TimesDialog';
import BookTypeDialog from './BookTypeDialog/BookTypeDialog';
import PaymentDialog from './PaymentDialog/PaymentDialog';
import StripeDialog from './StripeDialog/StripeDialog';

const CALENDAR = 'CALENDAR';
const TIMES = 'TIMES';
const BOOK_TYPE = 'BOOK_TYPE';
const PAYMENT = 'PAYMENT';
const STRIPE = 'STRIPE';

const BookExperience = ({exp, user, closeBooking}) => {
    //For handling booking details
    const [values, setValues] = useState({
        date: null,
        timeslot: {
            slot: null,
            spotsLeft: null
        },
        bookType: null,
        numGuests: null,
        done: false
    });
    const handleChange = useCallback((name, newVal) => {
        setValues(values => ({...values, [name]: newVal}));
    }, []);

    //For keeping track of the current step
    const [step, setStep] = useState(CALENDAR);
    const handleStepChange = (next) => () => {
        if(!next) { closeBooking(); }
        setStep(next);
    }

    //For fetching bookings for a certain date
    const [bookings, setBookings] = useState([]);
    useEffect(() => {
        if(values.date) {
            //Cut off the time from query
            const dateQuery = values.date.split('T')[0];
            axios.get(`/api/exp/${exp._id}/bookings`, 
            {params: {date: dateQuery}})
            .then(res => {
                if(res.status === 200) {
                    setBookings(res.data.occ);
                }
            })
            .catch(err => {
                //TODO: Handle error here
                console.log(err);
                closeBooking();
            });
        }
    }, [values.date, exp._id, closeBooking]);

    //Handling payment
    const stripe = useStripe();
    const elements = useElements();
    const [stripeMessage, setStripeMessage] = useState('');
    const handlePayment = async () => {
        handleStepChange(STRIPE);
        setStripeMessage('Processing your payment...');
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
            if (!stripe || !elements) { return; } 
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
                // Show error to your customer (e.g., insufficient funds)
                console.log(payConfirm.error.message);
            } else {
                if(payConfirm.paymentIntent.status === 'succeeded') {
                    console.log(payConfirm);
                    setStripeMessage(`Congrats ${user.fstName}! Your booking was 
                    successfully completed.`);
                    // Show a success message to your customer
                    // There's a risk of the customer closing the window before callback
                    // execution. Set up a webhook or plugin to listen for the
                    // payment_intent.succeeded event that handles any business critical
                    // post-payment actions.
                }
            }
        } catch(err) {
            //TODO: Create error dialog
            console.log(err);
            closeBooking();
        }
        setValues('done', true);
    }

    switch(step) {
        case CALENDAR: 
            //Either today or the min date from exp timeframe
            const minDate = new Date(Math.max(new Date(exp.avail.from), new Date()));
            return <CalendarDialog 
                    open
                    date={{
                        min: minDate,
                        max: new Date(exp.avail.to),
                        selec: values.date
                    }}
                    availDays={Object.keys(exp.avail.schedule)}
                    onChange={handleChange}
                    controls={{
                        goBack: closeBooking,
                        nextStep: handleStepChange(TIMES)
                    }}/>
        case TIMES: 
            const selecDay = getWeekdayKey(values.date);
            return <TimesDialog
                    open
                    date={values.date}
                    timeslot={values.timeslot}
                    onChange={handleChange}
                    slotsInfo={getSlotsInfo(
                                exp.avail.schedule[selecDay], 
                                bookings, 
                                exp.capacity)}
                    exp={{
                        availDays: Object.keys(exp.avail.schedule),
                        capacity: exp.capacity
                    }}
                    controls={{
                        goBack: handleStepChange(CALENDAR),
                        nextStep: handleStepChange(BOOK_TYPE)
                    }}/>
        case BOOK_TYPE:
            return <BookTypeDialog
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
                        goBack: handleStepChange(TIMES),
                        nextStep: handleStepChange(PAYMENT)
                    }}/>
        case PAYMENT: 
            return <PaymentDialog 
                    open
                    form={values}
                    exp={{
                        title: exp.title,
                        creator: exp.creator,
                        img: exp.images[0],
                        price: exp.price
                    }}
                    controls={{
                        goBack: handleStepChange(BOOK_TYPE),
                        next: handlePayment
                    }}/>
        case STRIPE:
            return <StripeDialog
                    open
                    message={stripeMessage}
                    keepUser={!values.done}/>
        default: return null;
    }
}

export default BookExperience;