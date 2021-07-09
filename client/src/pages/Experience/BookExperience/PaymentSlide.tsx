import { useEffect, useState } from 'react';
import { DateTime } from 'luxon';

import { useLanguageContext } from 'context/languageContext';
import { getTimePieces } from 'utils/dates';
import type { CompletableSlide } from 'models/prop-interfaces';
import type { Currency } from 'models/experience';
import type { Occurrence } from './useBookingReducer';
import type { Fees } from 'models/experience-occurrence';

import InputBase from '@material-ui/core/InputBase';
import { CardNumberElement, CardExpiryElement, CardCvcElement } from '@stripe/react-stripe-js';

import { makeStyles } from '@material-ui/core/styles';
import styles, { stripeStyles } from './PaymentSlide.styles';
const useStyles = makeStyles(styles);

interface Props extends CompletableSlide {
    email: string;
    zipCode: string;
    selectedDate: string;
    selectedSlot: Occurrence;
    fees: Fees;
    currency: Currency;
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

    const totalFees = props.fees.withServiceFee + props.fees.taxGST + props.fees.taxQST;
    
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
                        {props.fees.subTotalString}
                    </p>
                </div>
                <div className={classes.priceRow}>
                    <p className={classes.priceGreyText}>{text.serviceFee}</p>
                    <p className={classes.priceGreyText}>
                        {props.fees.serviceFee.toFixed(2)}
                    </p>
                </div>
                <div className={classes.priceRow}>
                    <p className={classes.priceGreyText}>TPS</p>
                    <p className={classes.priceGreyText}>
                        {props.fees.taxGST.toFixed(2)}
                    </p>
                </div>
                <div className={classes.priceRow}>
                    <p className={classes.priceGreyText}>TVQ</p>
                    <p className={classes.priceGreyText}>
                        {props.fees.taxQST.toFixed(2)}
                    </p>
                </div>
                <div className={classes.priceRow}>
                    <p className={classes.priceWhiteText}>
                        {text.total} ({props.currency})
                    </p>
                    <p className={classes.priceWhiteText}>
                        {totalFees.toFixed(2)}
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