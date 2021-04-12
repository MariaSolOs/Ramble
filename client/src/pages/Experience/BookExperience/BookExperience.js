import React, { useEffect, useCallback } from 'react';
import axios from '../../../tokenizedAxios';
import { useStripe, useElements, CardElement } from '@stripe/react-stripe-js';
import useBookingReducer from './store/reducer';
import { steps, actions } from './store/types';
import { connect } from 'react-redux';
import { useHistory } from 'react-router-dom';
import { showError } from '../../../store/actions/ui';
import useSavedCards from '../../../hooks/useSavedCards';
import withAuthDialogs from '../../../hoc/withAuthDialogs/withAuthDialogs';

import * as dialogs from './Dialogs';

const BookExperience = (props) => {
    // Managing dialog switching and payment steps
    const [state, dispatch] = useBookingReducer();
    const setStep = useCallback((step) => () => {
        dispatch({ type: actions.SET_STEP, step })
    }, [dispatch]);

    // For booking cancelling
    const { onClose, showError } = props;
    const cancelBooking = useCallback((msg = null) => {
        if (msg) { showError(msg); }
        setTimeout(() => {
            onClose();
        }, 4000);
    }, [onClose, showError]);

    // For handling booking details
    const handleChange = useCallback((name, value) => {
        dispatch({ type: actions.ADD_INPUT, name, value })
    }, [dispatch]);
 
    // For fetching occurrences for a certain date
    useEffect(() => {
        if (state.form.date) {
            // Cut off the time from query
            axios.get(`/api/occ/${props.exp._id}`, {
                params: { date: state.form.date.toISOString().split('T')[0] }
            }).then(res => {
                if (res.status === 200) {
                    dispatch({
                        type: actions.SET_SLOTS_INFO,
                        slotsInfo: res.data.occs.map(occ => ({
                            slot: occ.timeslot, 
                            spotsLeft: occ.spotsLeft
                        }))
                    });
                }
            }).catch(() => {
                cancelBooking('This date is not available.');
            });
        }
    }, [state.form.date, props.exp._id, props.exp.avail.schedule, props.exp.capacity, 
        dispatch, cancelBooking]);

    // Stop booking if user hasn't signed up/logged in 
    const handleUserAuth = () => {
        if (props.user.id === null) {
            props.dialogActions.openSignUpDialog();
        } else {
            setStep(steps.TIMES)();
        }
    }

    // We pass user's saved cards to payment dialog
    const { cards } = useSavedCards();

    // After payment is done, add booking to occurrence
    const history = useHistory();
    const handleAddBookingToOcc = (payIntentId, cardToUse) => {
        axios.post(`/api/occ/${props.exp._id}/bookings`, {
            date: state.form.date.toISOString().split('T')[0],
            timeslot: state.form.timeslot,
            numGuests: state.form.numGuests,
            bookType: state.form.bookType,
            promoCode: state.form.promoCode,
            cardToUse,  //One of these will be null
            payIntentId
        }).then(res => {
            if (res.status === 201) {
                history.push({
                    pathname: '/experience/booking-submitted',
                    state: {
                        exp: {
                            title: props.exp.title,
                            img: props.exp.images[0],
                            creator: {
                                name: props.exp.creator.user.fstName,
                                img: props.exp.creator.user.photo,
                                phoneNumber: props.exp.creator.user.phoneNumber
                            },
                            toBring: props.exp.toBring,
                            meetPoint: props.exp.location.meetPoint,
                            price: props.exp.price
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
        }).catch(() => { 
            cancelBooking('Please contact us.'); 
        });
    }

    // For handling payment
    const stripe = useStripe();
    const elements = useElements();
    const handlePayment = async () => {
        dispatch({ type: actions.PAY_INIT });
        try {
            if (state.form.cardToUse) { // Then we can skip all this
                return handleAddBookingToOcc(null, state.form.cardToUse); 
            }

            let clientSecret;
            let customerId;

            // If user wants to save the card, create Stripe customer
            if (state.form.rememberCard) {
                const newCustomer = await axios.post('/api/stripe/customer');
                if (newCustomer.status === 201) {
                    customerId = newCustomer.data.customerId;
                } else {
                    return cancelBooking("We couldn't save your card...");
                }
            }

            // Create payment intent and get client secret 
            const payIntent = await axios.post('/api/stripe/payment-intent', { 
                expId: props.exp._id,
                transferId: props.exp.creator.stripe.accountId,
                creatorId: props.exp.creator._id,
                bookType: state.form.bookType,
                numGuests: state.form.numGuests,
                promoCode: state.form.promoCode,
                customerId 
            });
            if (payIntent.status === 200) {
                clientSecret = payIntent.data.clientSecret;
            }
            if (!stripe || !elements || payIntent.status !== 200) { 
                cancelBooking('Your booking cannot be completed right now.');
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
                        name: `${props.user.fstName} ${props.user.lstName}`,
                    }
                },
                receipt_email: state.form.email.length > 0? 
                               state.form.email : props.user.email,
                ...usage
            });
            if (payConfirm.error) {
                cancelBooking(payConfirm.error.message);
            } else if (payConfirm.paymentIntent.status === 'requires_capture') {
                return handleAddBookingToOcc(payConfirm.paymentIntent.id, null);
            } else {
                return cancelBooking("We couldn't complete your payment.");
            }
        } catch (err) { cancelBooking('Please contact us.'); }
    }

    switch(state.step) {
        case steps.CALENDAR: 
            // Either today or the min date from exp timeframe
            const minDate = new Date(Math.max(new Date(props.exp.avail.from), new Date()));
            return <dialogs.CalendarDialog 
                    open
                    lang={props.lang}
                    date={{
                        min: minDate,
                        max: new Date(props.exp.avail.to),
                        selec: state.form.date
                    }}
                    availDays={Object.keys(props.exp.avail.schedule)}
                    onChange={handleChange}
                    controls={{
                        goBack: props.onClose,
                        nextStep: handleUserAuth
                    }}/>
        case steps.TIMES: 
            return <dialogs.TimesDialog
                    open
                    lang={props.lang}
                    date={state.form.date}
                    timeslot={state.form.timeslot}
                    onChange={handleChange}
                    slotsInfo={state.slotsInfo}
                    expCapacity={props.exp.capacity}
                    controls={{
                        goBack: setStep(steps.CALENDAR),
                        nextStep: setStep(steps.BOOK_TYPE)
                    }}/>
        case steps.BOOK_TYPE:
            return <dialogs.BookTypeDialog
                    open
                    lang={props.lang}
                    form={state.form}
                    exp={{
                        title: props.exp.title,
                        creator: props.exp.creator,
                        capacity: props.exp.capacity,
                        img: props.exp.images[0],
                        price: props.exp.price,
                    }}
                    onChange={handleChange}
                    controls={{
                        goBack: setStep(steps.TIMES),
                        nextStep: setStep(steps.PAYMENT)
                    }}/>
        case steps.PAYMENT: 
            return <dialogs.PaymentDialog 
                    lang={props.lang}
                    openForm={!state.payDone}
                    openStatus={state.payProcessing || state.payDone}
                    payMessage={state.payMsg}
                    form={state.form}
                    exp={{
                        title: props.exp.title,
                        creator: props.exp.creator,
                        img: props.exp.images[0],
                        price: props.exp.price,
                        isOnline: props.exp.zoomInfo
                    }}
                    user={props.user}
                    cards={cards}
                    onChange={handleChange}
                    controls={{
                        goBack: setStep(steps.BOOK_TYPE),
                        nextStep: handlePayment
                    }}/>
        default: return null;
    }
}

const mapStateToProps = (state) => ({
    lang: state.ui.language,
    user: state.user.profile
});
const mapDispatchToProps = (dispatch) => ({
    showError: (msg) => dispatch(showError(msg))
});

export default connect(mapStateToProps, mapDispatchToProps)(withAuthDialogs(BookExperience));