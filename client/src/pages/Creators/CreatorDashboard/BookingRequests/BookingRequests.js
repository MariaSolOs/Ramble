import React, {useState, useEffect, useCallback} from 'react';
import axios from '../../../../tokenizedAxios';
import {connect} from 'react-redux';
import {showError, showSnackbar} from '../../../../store/actions/ui';

import NavRow from '../NavRow/NavRow';
import BookingCard from './BookingCard/BookingCard';

import {makeStyles} from '@material-ui/core/styles';
import styles from './BookingRequestsStyles';
const useStyles = makeStyles(styles);

const BookingRequests = (props) => {
    const classes = useStyles();

    const {showError, showSnackbar, creatorId, 
           stripeId, bookingRequests, deleteRequest} = props;

    //Create a copy of the requests to sort them
    const [bookings, setBookings] = useState();
    useEffect(() => {
        setBookings(bookingRequests);
    }, [bookingRequests]);

    //Handle accept/decline requests
    const handleDecisionUnsavedCard = useCallback((action, stripeId, bookId) => 
    (e) => {
        showSnackbar('Processing your decision...');
        //Action is either capture or cancel
        axios.post(`/api/stripe/payment-intent/${action}`, {stripeId})
        .then(res => {
            deleteRequest(bookId);
            const decision = action === 'capture'? 'approved' : 'canceled';
            showSnackbar(`The booking was ${decision}`);
        })
        .catch(err => {
            showError("We f*cked up. We couldn't process your decision...");
        });
    }, [showSnackbar, showError, deleteRequest]);
    const handleDecisionSavedCard = useCallback((action, stripeInfo, bookId) => 
    async (e) => {
        try {
            showSnackbar('Processing your decision...');
            if(action === 'approve') {
                await axios.post(`/api/stripe/payment-intent/saved-card`, {
                    expId: stripeInfo.expId,
                    bookType: stripeInfo.bookType,
                    numGuests: stripeInfo.numGuests,
                    promoCode: stripeInfo.promoCode,         
                    customerId: stripeInfo.customerId,
                    payMethodId: stripeInfo.cardToUse,
                    bookingId: bookId, 
                    transferId: stripeId,
                    creatorId
                });
                //TODO: Handle error here
            } else if(action === 'cancel') {
                await axios.delete(`/api/creator/bookingRequests/${bookId}`);
            } else {
                throw new Error('Invalid action');
            }
            deleteRequest(bookId);
            const decision = action === 'approve'? 'approved' : 'canceled';
            showSnackbar(`The booking was ${decision}`);
        } catch(err) {
            showError("We f*cked up. We couldn't process your decision...");
        } 
    }, [showSnackbar, showError, creatorId, stripeId, deleteRequest]);

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
            <div className={classes.shadowSeparator}/>
            <div className={classes.page}>
                <NavRow/>
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
                            expId: booking.experience._id,
                            bookType: booking.bookType,
                            numGuests: booking.numPeople,
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
                            handleDecisionSavedCard('cancel', {}, booking._id)
                        }/>
                    </div>
                ))}
                </div>
            </div>
        </div>
    );
}

const mapStateToProps = (state) => ({
    creatorId: state.user.creator.id,
    stripeId: state.user.creator.stripeId,
});
const mapDispatchToProps = (dispatch) => ({
    showError: (msg) => dispatch(showError(msg)),
    showSnackbar: (msg) => dispatch(showSnackbar(msg))
});

export default connect(mapStateToProps, mapDispatchToProps)(BookingRequests);