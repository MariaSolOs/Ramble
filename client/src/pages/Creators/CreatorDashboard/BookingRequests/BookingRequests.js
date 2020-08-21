import React, {useState, useEffect, useCallback} from 'react';
import axios from '../../../../tokenizedAxios';
import {connect} from 'react-redux';
import {setNumBookings} from '../../../../store/actions/user';
import {showError, showSnackbar, startLoading, endLoading} from '../../../../store/actions/ui';

import BookingCard from './BookingCard/BookingCard';

import {makeStyles} from '@material-ui/core/styles';
import styles from './BookingRequestsStyles';
const useStyles = makeStyles(styles);

const BookingRequests = (props) => {
    const classes = useStyles();

    const {showError, showSnackbar, creatorId, 
           stripeId, numBookings, decNumBookings} = props;

    //Fetch creator bookings
    const [bookings, setBookings] = useState([]);
    useEffect(() => {
        startLoading();
        axios.get('/api/creator/bookingRequests')
        .then(res => {
            setBookings(res.data.bookingRequests);
        })
        .catch(err => {
            showError('We cannot get your bookings right now...');
        });
        endLoading();
    }, [showError, numBookings]);

    //Handle accept/decline requests
    const handleDecisionUnsavedCard = useCallback((action, stripeId, bookId) => 
    (e) => {
        showSnackbar('Processing your decision...');
        //Action is either capture or cancel
        axios.post(`/api/stripe/payment-intent/${action}`, {stripeId})
        .then(res => {
            setBookings((bookings) => (
                bookings.filter(req => (
                    req._id !== bookId
                ))
            ));
            decNumBookings();
            const decision = action === 'capture'? 'approved' : 'canceled';
            showSnackbar(`The booking was ${decision}`);
        })
        .catch(err => {
            showError("We couldn't process your decision...");
        });
    }, [showSnackbar, showError, decNumBookings]);
    const handleDecisionSavedCard = useCallback((action, stripeInfo, bookId) => 
    async (e) => {
        try {
            showSnackbar('Processing your decision...');
            if(action === 'approve') {
                await axios.post(`/api/stripe/payment-intent/saved-card`, {
                    amount: Math.round(stripeInfo.creatorProfit * 1.25),
                    currency: stripeInfo.currency,
                    customerId: stripeInfo.customerId,
                    payMethodId: stripeInfo.cardToUse,
                    bookingId: bookId, 
                    transferId: stripeId,
                    creatorId
                });
            } else {
                await axios.delete(`/api/creator/bookingRequests/${bookId}`);
            }
            setBookings((bookings) => (
                bookings.filter(req => (
                    req._id !== bookId
                ))
            ));
            decNumBookings();
            const decision = action === 'approve'? 'approved' : 'canceled';
            showSnackbar(`The booking was ${decision}`);
        } catch(err) {
            showError("We couldn't process your decision...");
        } 
    }, [showSnackbar, showError, creatorId, stripeId, decNumBookings]);

    //To handle the sorting
    const sortByBookDate = useCallback(() => {
        const bookingsCopy = bookings.slice(0);
        bookingsCopy.sort((book1, book2) => {
            if(book1.createdAt < book2.createdAt) {
                return 1;
            } else if(book1.createdAt > book2.createdAt){
                return -1;
            } else { return 0; }
        });
        setBookings(bookingsCopy);
    }, [bookings]);
    const sortByExpDate = useCallback(() => {
        const bookingsCopy = bookings.slice(0);
        bookingsCopy.sort((book1, book2) => {
            if(book1.occurrence.dateStart > book2.occurrence.dateStart) {
                return 1;
            } else if(book1.occurrence.dateStart < book2.occurrence.dateStart){
                return -1;
            } else { return 0; }
        });
        setBookings(bookingsCopy);
    }, [bookings]);

    return (
        <div className={classes.root}>
            <div className={classes.sortBar}>
                Sort by
                <button onClick={sortByBookDate}>Booking date</button>
                <button onClick={sortByExpDate}>Experience date</button>
            </div>
            <div className={classes.requests}> 
            {bookings && bookings.map(booking => (
                <div key={booking._id} className={classes.request}>
                    <BookingCard 
                    booking={booking}
                    onAccept={
                        booking.stripe.paymentIntentId?
                        handleDecisionUnsavedCard(
                            'capture', 
                            booking.stripe.paymentIntentId,
                            booking._id
                        ) :
                        handleDecisionSavedCard('approve', 
                        { customerId: booking.client.stripe.customerId,
                          currency: booking.experience.price.currency,
                          ...booking.stripe }, 
                          booking._id)
                    }
                    onDecline={
                        booking.stripe.paymentIntentId?
                        handleDecisionUnsavedCard(
                            'cancel', 
                            booking.stripe.paymentIntentId,
                            booking._id
                        ) :
                        handleDecisionSavedCard('cancel', 
                        { customerId: booking.client.stripe.customerId,
                          currency: booking.experience.price.currency,
                          ...booking.stripe },
                          booking._id)
                    }/>
                </div>
            ))}
            </div>
        </div>
    );
}

const mapStateToProps = (state) => ({
    creatorId: state.user.creator.id,
    stripeId: state.user.creator.stripeId,
    numBookings: state.user.creator.numBookings
});
const mapDispatchToProps = (dispatch) => ({
    startLoading: () => dispatch(startLoading()),
    endLoading: () => dispatch(endLoading()),
    showError: (msg) => dispatch(showError(msg)),
    showSnackbar: (msg) => dispatch(showSnackbar(msg)),
    decNumBookings: () => dispatch(setNumBookings('dec'))
});

export default connect(mapStateToProps, mapDispatchToProps)(BookingRequests);