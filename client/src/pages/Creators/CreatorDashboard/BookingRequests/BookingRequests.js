import React from 'react';
import {useSelector} from 'react-redux';

import BookingCard from './BookingCard/BookingCard';

const BookingRequests = (props) => {
    const bookings = useSelector(state => state.user.creatorData.bookingRequests);

    return (
        <>
            {bookings.map(booking => (
                <BookingCard 
                booking={booking}
                key={booking._id}/>
            ))}
        </>
    );
}

export default BookingRequests;