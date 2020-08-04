import React, {useEffect} from 'react';
import {connect} from 'react-redux';
import {fetchBookingRequests, handleRequestAction} from '../../../../store/actions/creator';

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
    const {fetchBookings} = props;
    useEffect(() => {
        fetchBookings();
    }, [fetchBookings]);

    return (
        <div className={classes.requests}> 
            {props.bookings.map(booking => (
                <div key={booking._id} className={classes.request}>
                    <BookingCard 
                    booking={booking}
                    onAccept={props.acceptBooking}
                    onDecline={props.declineBooking}/>
                </div>
            ))}
        </div>
    );
}

const mapStateToProps = (state) => ({
    bookings: state.creator.bookingRequests  
});
const mapDispatchToProps = (dispatch) => ({
    fetchBookings: () => dispatch(fetchBookingRequests()),
    acceptBooking: (stripeId) => (e) => dispatch(handleRequestAction(stripeId, 'capture')),
    declineBooking: (stripeId) => (e) => dispatch(handleRequestAction(stripeId, 'cancel'))
});

export default connect(mapStateToProps, mapDispatchToProps)(BookingRequests);