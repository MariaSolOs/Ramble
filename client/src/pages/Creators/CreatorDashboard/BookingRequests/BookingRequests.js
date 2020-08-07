import React, {useState, useEffect, useCallback} from 'react';
import axios from '../../../../tokenizedAxios';
import {connect} from 'react-redux';
import {startLoading, endLoading, showError, showSnackbar} from '../../../../store/actions/ui';

import BookingCard from './BookingCard/BookingCard';

import {makeStyles} from '@material-ui/core/styles';
import styles from './BookingRequestsStyles';
const useStyles = makeStyles(styles);

const BookingRequests = (props) => {
    const classes = useStyles();

    //Fetch bookings on mounting 
    const {startLoading, endLoading, showError, showSnackbar} = props;
    const [bookings, setBookings] = useState();
    useEffect(() => {
        startLoading();
        axios.get('/api/creator/bookingRequests')
        .then(res => {
            setBookings(res.data.bookingRequests);
            endLoading();
        }).catch(err => { 
            showError("We couldn't get your booking requests.");
            endLoading();
        });
    }, [startLoading, endLoading, showError]);

    //Handle accept/decline request
    const handleDecision = useCallback((action, stripeId) => (e) => {
        //Action is either capture or cancel
        axios.post(`/api/stripe/payment-intent/${action}`, {stripeId})
        .then(res => {
            setBookings(bookings => bookings.filter(booking => 
                booking.stripe.id !== stripeId
            ));
            const decision = action === 'capture'? 'approved' : 'canceled';
            showSnackbar(`The booking was ${decision}`);
        })
        .catch(err => {
            showError("We couldn't process your decision...");
        });
    }, [showSnackbar, showError]);

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
            if(book1.occurrence.date < book2.occurrence.date) {
                return 1;
            } else if(book1.occurrence.date > book2.occurrence.date){
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
                        onAccept={handleDecision('capture', booking.stripe.id)}
                        onDecline={handleDecision('cancel', booking.stripe.id)}/>
                    </div>
                ))}
            </div>
        </div>
    );
}

const mapDispatchToProps = (dispatch) => ({
    startLoading: () => dispatch(startLoading()),
    endLoading: () => dispatch(endLoading()),
    showError: (msg) => dispatch(showError(msg)),
    showSnackbar: (msg) => dispatch(showSnackbar(msg))
});

export default connect(null, mapDispatchToProps)(BookingRequests);