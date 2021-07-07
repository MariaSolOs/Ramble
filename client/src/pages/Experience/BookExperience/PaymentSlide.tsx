import { useEffect, useState } from 'react';
import { DateTime } from 'luxon';

import { useLanguageContext } from 'context/languageContext';
import type { CompletableSlide } from 'models/prop-interfaces';
import type { Occurrence } from './useBookingReducer';
import { getTimePieces } from 'utils/dates';

import InputBase from '@material-ui/core/InputBase';
import { CardNumberElement, CardExpiryElement, CardCvcElement } from '@stripe/react-stripe-js';

import { makeStyles } from '@material-ui/core/styles';
import styles, { stripeStyles } from './PaymentSlide.styles';
const useStyles = makeStyles(styles);

interface Props extends CompletableSlide {
    userEmail: string;
    selectedDate: string;
    selectedSlot: Occurrence;
    price: number; 
    numGuests?: number;
}

const PaymentSlide = (props: Props) => {
    const { appText, language } = useLanguageContext();
    const { BookExperience_PaymentSlide: text } = appText;
    const classes = useStyles();

    const [dateTitle, setDateTitle] = useState<DateTime>();
    const [startTime, setStartTime] = useState<string[]>([]);
    const [endTime, setEndTime] = useState<string[]>([]);

    useEffect(() => {
        let selectedDate = DateTime.fromISO(props.selectedDate);

        // When in French mode, translate the title
        if (language === 'fr') {
            selectedDate = selectedDate.setLocale('fr');
        }

        setDateTitle(selectedDate);
    }, [props.selectedDate, language]);

    // For formatting the timeslot nicely
    useEffect(() => {
        setStartTime(getTimePieces(props.selectedSlot.dateStart));
        setEndTime(getTimePieces(props.selectedSlot.dateEnd));
    }, [props.selectedSlot]);

    return (
        <div className={classes.root}>
            <h3 className={classes.dateTitle}>
                {dateTitle?.toFormat('EEEE, MMMM d')}
            </h3>
            <h3 className={classes.timeslotTitle}>
                {`${startTime[0]} ${startTime[1]} - ${endTime[0]} ${endTime[1]}`}
            </h3>
            <div className={classes.divisor} />
            <CardNumberElement 
            className={classes.input} 
            options={{
                style: stripeStyles,
                placeholder: text.cardNumberPlaceholder
            }} />
            <div className={classes.cardInfoRow}>
                <CardExpiryElement
                className={classes.input}
                options={{
                    style: stripeStyles,
                    placeholder: text.expiryDatePlaceholder
                }} />
                <CardCvcElement
                className={classes.input}
                options={{
                    style: stripeStyles,
                    placeholder: text.cvcPlaceholder
                }} />
                <InputBase
                className={classes.input}
                placeholder={text.zipCodePlaceholder} />
            </div>
        </div>
    );
}

export default PaymentSlide;