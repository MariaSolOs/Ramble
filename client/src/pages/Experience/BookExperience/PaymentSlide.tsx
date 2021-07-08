import { useEffect, useState } from 'react';
import { DateTime } from 'luxon';

import { useLanguageContext } from 'context/languageContext';
import { getTimePieces } from 'utils/dates';
import type { CompletableSlide } from 'models/prop-interfaces';
import type { Occurrence } from './useBookingReducer';

import InputBase from '@material-ui/core/InputBase';
import { CardNumberElement, CardExpiryElement, CardCvcElement } from '@stripe/react-stripe-js';

import { makeStyles } from '@material-ui/core/styles';
import styles, { stripeStyles } from './PaymentSlide.styles';
const useStyles = makeStyles(styles);

/**
 * Computes the breakdown for the receipt.
 * 
 * @param price - The experience price (either the private or public/per person one)
 * @param isOnlineExperience - If true, the experience is on Zoom
 * @param numGuests - Number of guests. Only defined for public experiences
 * @returns The breakdown information
 */
const getFeesBreakdown = (price: number, isOnlineExperience: boolean, numGuests?: number) => {
    const isPublicExperience = Boolean(numGuests);
    let bookingPrice = 0;
    let subTotalString = '';

    if (isPublicExperience && !isOnlineExperience) {
        bookingPrice = price * numGuests!;
        subTotalString = `${numGuests} x ${price.toFixed(2)} = ${bookingPrice.toFixed(2)}`;       
    } else {
        bookingPrice = price;
        subTotalString = price.toFixed(2);
    }

    const serviceFee = (bookingPrice * 0.0345) * 0.33;
    const withServiceFee = serviceFee * bookingPrice;
    const taxGST = 0.05 * withServiceFee;
    const taxQST = 0.09975 * withServiceFee;

    return {
        subTotalString,
        withServiceFee,
        serviceFee,
        taxGST,
        taxQST
    }
}

type FeeInfo = ReturnType<typeof getFeesBreakdown>;

interface Props extends CompletableSlide {
    email: string;
    zipCode: string;
    selectedDate: string;
    selectedSlot: Occurrence;
    price: number; 
    numGuests?: number;
    isOnlineExperience: boolean;
    onEmailChange: (email: string) => void;
    onZipCodeChange: (zipCode: string) => void;
}

const PaymentSlide = (props: Props) => {
    const { appText, language } = useLanguageContext();
    const { BookExperience_PaymentSlide: text } = appText;
    const classes = useStyles();

    const [dateTitle, setDateTitle] = useState<DateTime>();
    const [startTime, setStartTime] = useState<string[]>([]);
    const [endTime, setEndTime] = useState<string[]>([]);
    const [fees, setFees] = useState<FeeInfo>({
        subTotalString: '',
        withServiceFee: 0,
        serviceFee: 0,
        taxGST: 0,
        taxQST: 0
    });

    useEffect(() => {
        setFees(getFeesBreakdown(
            props.price, 
            props.isOnlineExperience, 
            props.numGuests
        ));
    }, [props.price, props.isOnlineExperience, props.numGuests]);

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
            <div className={classes.priceBreakdown}>
                <div className={classes.priceRow}>
                    <p className={classes.priceWhiteText}>{text.subtotal}</p>
                    <p className={classes.priceWhiteText}>
                        {fees.subTotalString}
                    </p>
                </div>
                <div className={classes.priceRow}>
                    <p className={classes.priceGreyText}>{text.serviceFee}</p>
                    <p className={classes.priceGreyText}>
                        {fees.serviceFee.toFixed(2)}
                    </p>
                </div>
                <div className={classes.priceRow}>
                    <p className={classes.priceGreyText}>TPS</p>
                    <p className={classes.priceGreyText}>
                        {fees.taxGST.toFixed(2)}
                    </p>
                </div>
                <div className={classes.priceRow}>
                    <p className={classes.priceGreyText}>TVQ</p>
                    <p className={classes.priceGreyText}>
                        {fees.taxQST.toFixed(2)}
                    </p>
                </div>
                <div className={classes.priceRow}>
                    <p className={classes.priceWhiteText}>{text.total}</p>
                    <p className={classes.priceWhiteText}>
                        {(fees.withServiceFee + fees.taxGST + fees.taxQST).toFixed(2)}
                    </p>
                </div>
            </div>
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
                required
                value={props.zipCode}
                onChange={e => props.onZipCodeChange(e.target.value)}
                className={classes.input}
                placeholder={text.zipCodePlaceholder} />
            </div>
            <InputBase
            required
            value={props.email}
            onChange={e => props.onEmailChange(e.target.value)}
            className={classes.input}
            placeholder={text.emailPlaceholder} />
            <span className={classes.emailMessage}>{text.emailMessage}</span>
        </div>
    );
}

export default PaymentSlide;