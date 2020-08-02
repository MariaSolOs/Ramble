import React from 'react';
import {useSelector} from 'react-redux';

const BookingRequests = (props) => {
    const bookings = useSelector(state => state.user.creatorData);
    console.log(bookings);

    return (
        null
    );
}

export default BookingRequests;