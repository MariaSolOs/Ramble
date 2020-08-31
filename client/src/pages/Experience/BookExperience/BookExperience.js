import React, {useEffect, useCallback} from 'react';
import axios from '../../../tokenizedAxios';
import {useStripe, useElements, CardElement} from '@stripe/react-stripe-js';
import useBookingReducer from './store/reducer';
import {steps, actions} from './store/types';
import {useDispatch} from 'react-redux';
import {useHistory} from 'react-router-dom';
import {showError} from '../../../store/actions/ui';
import useSavedCards from '../../../hooks/useSavedCards';

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
            {params: {date: state.form.date.toISOString().split('T')[0]}})
            .then(res => {
                if(res.status === 200) {
                    dispatch({
                        type: actions.SET_SLOTS_INFO,
                        slotsInfo: res.data.occs.map(occ => ({
                            slot: occ.timeslot, 
                            spotsLeft: occ.spotsLeft
                        }))
                    });
                }
            })
            .catch(err => {
                cancelBooking('This date is not available.');
            });
        }
    }, [state.form.date, exp._id, exp.avail.schedule, exp.capacity, 
        dispatch, cancelBooking]);

    //We pass user's saved cards to payment dialog
    const {cards} = useSavedCards();

    //After payment is done, add booking to occurrence
    const history = useHistory();
    const handleAddBookingToOcc = (payIntentId, cardToUse) => {
        axios.post(`/api/occ/${exp._id}/bookings`, {
            date: state.form.date.toISOString().split('T')[0],
            timeslot: state.form.timeslot,
            numGuests: state.form.numGuests,
            bookType: state.form.bookType,
            promoCode: state.form.promoCode,
            cardToUse,  //One of these will be null
            payIntentId
        }).then(res => {
            if(res.status === 201) {
                history.push({
                    pathname: '/experience/booking-submitted',
                    state: {
                        exp: {
                            title: exp.title,
                            img: exp.images[0],
                            creator: {
                                name: exp.creator.user.fstName,
                                img: exp.creator.user.photo,
                                phoneNumber: exp.creator.user.phoneNumber
                            },
                            toBring: exp.toBring,
                            meetPoint: exp.location.meetPoint,
                            price: exp.price
                        },
                        occ: {
                            date: state.form.date,
                            timeslot: state.form.timeslot
                        },
                        booking: {
                            numGuests: state.form.numGuests,
                            bookType: state.form.bookType,
                            payInfo: {
                                savedCardUsed: cardToUse,
                                cardInfo: res.data.cardInfo
                            } 
                        }
                    }
                });
            } else {
                cancelBooking('Please contact us.');
            }
        }).catch(err => { 
            cancelBooking('We f*cked up. Please contact us.'); 
        });
    }

    //For handling payment
    const stripe = useStripe();
    const elements = useElements();
    const handlePayment = async () => {
        dispatch({type: actions.PAY_INIT});
        try {
            if(state.form.cardToUse) { //Then we can skip all this
                return handleAddBookingToOcc(null, state.form.cardToUse); 
            }

            let clientSecret;
            let customerId;

            //If user wants to save the card, create Stripe customer
            if(state.form.rememberCard) {
                const newCustomer = await axios.post('/api/stripe/customer');
                if(newCustomer.status === 201) {
                    customerId = newCustomer.data.customerId;
                } else {
                    return cancelBooking("We f*cked up. We couldn't save your card...");
                }
            }

            //Create payment intent and get client secret 
            const payIntent = await axios.post(
                '/api/stripe/payment-intent', 
                { expId: exp._id,
                  transferId: exp.creator.stripe.accountId,
                  creatorId: exp.creator._id,
                  bookType: state.form.bookType,
                  numGuests: state.form.numGuests,
                  promoCode: state.form.promoCode,
                  customerId }
            );
            if(payIntent.status === 200) {
                clientSecret = payIntent.data.clientSecret;
            }
            if (!stripe || !elements || payIntent.status !== 200) { 
                cancelBooking('We f*cked up. Your booking cannot be completed right now.');
                return; 
            }

            //Confirm payment with Stripe
            const usage = {
                setup_future_usage: state.form.rememberCard ? 'off_session' : 
                                    undefined
            }
            const payConfirm = await stripe.confirmCardPayment(clientSecret, {
                payment_method: {
                    card: elements.getElement(CardElement),
                    billing_details: {
                        name: `${user.fstName} ${user.lstName}`,
                    }
                },
                receipt_email: state.form.email.length > 0? 
                               state.form.email : user.email,
                ...usage
            });
            if(payConfirm.error) {
                cancelBooking(payConfirm.error.message);
            } else if(payConfirm.paymentIntent.status === 'requires_capture') {
                return handleAddBookingToOcc(payConfirm.paymentIntent.id, null);
            } else {
                return cancelBooking("We f*cked up. We couldn't complete your payment.");
            }
        } catch(err) { cancelBooking('We f*cked up. Please contact us.'); }
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
                    userPromo={user.promoCode}
                    cards={cards}
                    onChange={handleChange}
                    controls={{
                        goBack: setStep(steps.BOOK_TYPE),
                        nextStep: handlePayment
                    }}/>
        default: return null;
    }
}

export default BookExperience;