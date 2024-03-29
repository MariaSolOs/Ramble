import { useEffect } from 'react';

import { useLanguageContext } from 'context/languageContext';
import type { CompletableSlide } from 'models/prop-interfaces';
import type { BookingType } from 'models/experience-occurrence';
import type { Occurrence } from './useBookingReducer';

import PlusMinusInput from 'components/PlusMinusInput/PlusMinusInput';
import Collapse from '@material-ui/core/Collapse';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faUsers } from '@fortawesome/free-solid-svg-icons/faUsers';

import { makeStyles } from '@material-ui/core/styles';
import styles from './BookingTypeSlide.styles';
const useStyles = makeStyles(styles);

interface Props extends CompletableSlide {
    bookingType?: BookingType;
    numGuests: number;
    pricePerPerson: number;
    privatePrice?: number;
    selectedSlot: Occurrence;
    experienceCapacity: number;
    isOnlineExperience: boolean;
    onBookingTypeChange: (type: BookingType) => void;
    onNumGuestsChange: (num: number) => void;
}

const BookingTypeSlide = (props: Props) => {
    const { BookExperience_BookingTypeSlide: text } = useLanguageContext().appText;
    const classes = useStyles();

    const currentGuests = props.experienceCapacity - props.selectedSlot.spotsLeft;
    const privateEnabled = Boolean(props.privatePrice) && currentGuests === 0;

    const { onSlideComplete, bookingType, onBookingTypeChange } = props;
    useEffect(() => {
        onSlideComplete(Boolean(bookingType));
    }, [onSlideComplete, bookingType]);

    // If private bookings are not enabled, pre-select public option
    useEffect(() => {
        if (!props.privatePrice) {
            onBookingTypeChange('public');
        }

        // We can safely assume onBookingType never changes
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [props.privatePrice]);

    return (
        <>
            <h3 className={classes.title}>{text.title}</h3>
            {privateEnabled &&
                <button
                className={`
                    ${classes.bookingButton}
                    ${props.bookingType === 'private' && classes.selectedButton}
                `}
                onClick={() => onBookingTypeChange('private')}>
                    <p className={classes.buttonTitle}>
                        {text.privateBookingTitle}
                        <span className={classes.price}>
                            ${props.privatePrice}
                        </span>
                    </p>
                    <p className={classes.buttonText}>
                        {text.privateBookingSubtitle}
                    </p>
                    <p className={classes.buttonText}>
                        <FontAwesomeIcon className={classes.icon} icon={faUsers} />
                        {`${text.upTo} ${props.selectedSlot.spotsLeft} `}
                        {props.selectedSlot.spotsLeft > 1 ? text.people : text.person}
                    </p>
                </button>}
            <button
            className={`
                ${classes.bookingButton}
                ${props.bookingType === 'public' && classes.selectedButton}
            `}
            onClick={() => onBookingTypeChange('public')}>
                <p className={classes.buttonTitle}>
                    {props.isOnlineExperience ? 
                        text.publicBookingTitleOnline : text.publicBookingTitle}
                    <span className={classes.price}>
                        ${props.pricePerPerson}
                    </span>
                </p>
                <p className={classes.buttonText}>
                    {text.publicBookingSubtitle}
                </p>
                <p className={classes.buttonText}>
                    {currentGuests > 0 ?
                        <>
                            <FontAwesomeIcon className={classes.icon} icon={faUsers} />
                            {`${text.join} ${currentGuests} `}
                            {currentGuests > 1 ? text.guests : text.guest}
                        </> : 
                        <>&nbsp;</>
                    }
                </p>
            </button>
            <Collapse
            className={classes.numGuestsField}
            in={props.bookingType === 'public'}>
                <p className={classes.numGuestsTitle}>
                    {text.numberOfGuests}
                </p>
                <PlusMinusInput
                value={props.numGuests}
                onValueChange={props.onNumGuestsChange}
                step={1}
                minValue={1}
                maxValue={props.selectedSlot.spotsLeft}
                getLabel={num => num > 1 ? text.guests : text.guest} />
            </Collapse>
        </>
    );
}

export default BookingTypeSlide;