import { useCallback } from 'react';
import { useHistory } from 'react-router-dom';

import { useGetBookingRequestsQuery } from 'graphql-api';
import { useAppDispatch } from 'hooks/redux';
import { openErrorDialog } from 'store/uiSlice';

import Spinner from 'components/Spinner/Spinner';
import BookingCard from 'components/BookingCard/BookingCard';

import { makeStyles } from '@material-ui/core/styles';
import styles from './BookingRequests.styles';
const useStyles = makeStyles(styles);

const BookingRequests = () => {
    const history = useHistory();
    const dispatch = useAppDispatch();
    const classes = useStyles();

    const { loading, data } = useGetBookingRequestsQuery({
        onError: () => handleError("We couldn't get your bookings...")
    });

    const handleError = (message: string) => {
        dispatch(openErrorDialog({ message }));
        history.replace('/');
    }

    const handleAccept = useCallback((bookingId: string) => {
        console.log(bookingId);
    }, []);
    
    const handleDecline = useCallback((bookingId: string) => {
        console.log(bookingId);
    }, []);

    if (loading || !data) {
        return <Spinner />;
    }

    // TODO: Sort requests
    return (
        <div className={classes.root}>
            {data.me.creator!.bookingRequests.map(booking => {
                // Compute the number of guests in confirmed bookings
                const guests = booking.occurrence.bookings.filter(
                    ({ paymentCaptured }) => paymentCaptured
                ).map(({ numGuests }) => numGuests);
                const confirmedGuests = guests.length > 0 ? 
                    guests.reduce((acc, val) => acc + val) : 0;

                return (
                    <BookingCard
                    key={booking._id}
                    bookingType={booking.bookingType}
                    numGuests={booking.numGuests}
                    confirmedGuests={confirmedGuests}
                    createdAt={booking.createdAt}
                    dateStart={booking.occurrence.dateStart}
                    dateEnd={booking.occurrence.dateEnd}
                    bookingProfit={booking.creatorProfit}
                    currentProfit={booking.occurrence.creatorProfit}
                    experience={{
                        title: booking.occurrence.experience.title,
                        image: booking.occurrence.experience.images[0],
                        capacity: booking.occurrence.experience.capacity
                    }}
                    client={{
                        name: booking.client.firstName,
                        photo: booking.client.photo || undefined,
                        city: booking.client.city || undefined
                    }}
                    onAccept={() => handleAccept(booking._id)}
                    onDecline={() => handleDecline(booking._id)}
                    containerClass={classes.bookingCard} />
                );
            })}
        </div>
    );
}

export default BookingRequests;