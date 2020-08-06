import React, {useState, useEffect, useCallback} from 'react';
import axios from '../../../../tokenizedAxios';
import {connect} from 'react-redux';
import {startLoading, endLoading, showError, showSnackbar} from '../../../../store/actions/ui';

import BookingCard from './BookingCard/BookingCard';

import {makeStyles} from '@material-ui/core/styles';
const useStyles = makeStyles(() => ({
    requests: {
        display: 'flex',
        flexWrap: 'wrap',
        width: '100%'
    },
    request: { 
        marginTop: 20,
        '&:nth-child(2n)': { marginLeft: 50 }
    }
}));

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
                booking.stripeId !== stripeId
            ));
            const decision = action === 'capture'? 'approved' : 'canceled';
            showSnackbar(`The booking was ${decision}`);
        })
        .catch(err => {
            showError("We couldn't process your decision...");
        });
    }, [showSnackbar, showError]);

    return (
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
    );
}

const mapDispatchToProps = (dispatch) => ({
    startLoading: () => dispatch(startLoading()),
    endLoading: () => dispatch(endLoading()),
    showError: (msg) => dispatch(showError(msg)),
    showSnackbar: (msg) => dispatch(showSnackbar(msg))
});

export default connect(null, mapDispatchToProps)(BookingRequests);