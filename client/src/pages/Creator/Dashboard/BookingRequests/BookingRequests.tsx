import { useState, useCallback } from 'react';

import { useGetBookingRequestsQuery } from 'graphql-api';
import { useLanguageContext } from 'context/languageContext';
import { useUiContext } from 'context/uiContext';
import { getStoredToken } from 'utils/auth';

import Spinner from 'components/Spinner/Spinner';
import BookingCard from 'components/BookingCard/BookingCard';

import { makeStyles } from '@material-ui/core/styles';
import styles from './BookingRequests.styles';
const useStyles = makeStyles(styles);

const BookingRequests = () => {
    const { BookingRequests: text } = useLanguageContext().appText;
    const { uiDispatch } = useUiContext();
    const classes = useStyles();

    const [processing, setProcessing] = useState(false);

    const { loading, data, refetch } = useGetBookingRequestsQuery({
        onError: () => handleError("We couldn't get your bookings...")
    });

    const handleError = useCallback((message: string) => {
        uiDispatch({ type: 'OPEN_ERROR_DIALOG', message });
    }, [uiDispatch]);

    const handleDecision = useCallback(async (action: 'capture' | 'cancel', bookingId: string) => {
        setProcessing(true);
 
        const res = await fetch(`${process.env.REACT_APP_SERVER_URI}/stripe/payment-intent/${action}`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'Accept': 'application/json'
            },
            body: JSON.stringify({
                bookingId,
                token: getStoredToken()
            })
        });

        if (res.ok) {
            const message = action === 'capture' ? 
                text.bookingAcceptedMessage : text.bookingRejectedMessage;
            uiDispatch({ type: 'OPEN_SNACKBAR', message });
            refetch();
        } else {
            handleError(text.decisionError);
        }

        setProcessing(false);
    }, [handleError, refetch, uiDispatch, text]);

    if (loading || !data) {
        return <Spinner />;
    }

    return (
        <div className={classes.root}>
            {processing && <Spinner />}
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
                    onAccept={() => handleDecision('capture', booking._id)}
                    onDecline={() => handleDecision('cancel', booking._id)}
                    containerClass={classes.bookingCard} />
                );
            })}
        </div>
    );
}

export default BookingRequests;