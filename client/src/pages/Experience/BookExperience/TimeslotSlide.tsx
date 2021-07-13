import { useState, useEffect } from 'react';
import { DateTime } from 'luxon';
import { v4 as uuid } from 'uuid';

import { useLanguageContext } from 'context/languageContext';
import type { Occurrence } from './useBookingReducer';
import type { CompletableSlide } from 'models/prop-interfaces';
import { getTimePieces } from 'utils/dates';

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faClock } from '@fortawesome/free-regular-svg-icons/faClock';
import { faUsers } from '@fortawesome/free-solid-svg-icons/faUsers';
import { faCrown } from '@fortawesome/free-solid-svg-icons/faCrown';
import { faBan } from '@fortawesome/free-solid-svg-icons/faBan';

import { makeStyles } from '@material-ui/core/styles';
import styles from './TimeslotSlide.styles';
const useStyles = makeStyles(styles);

interface Props extends CompletableSlide {
    selectedDate: string;
    timeslot?: Occurrence;
    allSlots: Occurrence[];
    experienceCapacity: number;
    onTimeslotChange: (slot: Occurrence) => void;
}

type TimeslotProps = {
    timeslot: Occurrence;
    experienceCapacity: number;
    isSelected: boolean;
    onClick: () => void;
}

const Timeslot = (props: TimeslotProps) => {
    const { BookExperience_TimeslotSlide: text } = useLanguageContext().appText;
    const classes = useStyles();
    
    const timeDiff = props.timeslot.dateStart.diffNow().as('hours');
    const [startTime, startMeridiem] = getTimePieces(props.timeslot.dateStart);
    const [endTime, endMeridiem] = getTimePieces(props.timeslot.dateEnd);
    const currentGuests = props.experienceCapacity - props.timeslot.spotsLeft; 
    const isOccupied = currentGuests > 0;
    // The timeslot is also disabled if it's happening in an hour
    const isDisabled = currentGuests === props.experienceCapacity || timeDiff <= 1;

    return (
        <button 
        className={`
            ${classes.slot}
            ${props.isSelected && classes.selectedSlot}
        `} 
        disabled={isDisabled}
        onClick={props.onClick}>
            <p className={classes.timeSlotText}>
                <FontAwesomeIcon icon={faClock} className={classes.icon} />
                {startTime} 
                <span className={classes.meridiem}>
                    {startMeridiem}
                </span> - {endTime} 
                <span className={classes.meridiem}> 
                    {endMeridiem} 
                </span>
            </p>
            <p className={classes.guestsSlotText}>
                {isDisabled ?
                    <>
                        <FontAwesomeIcon icon={faBan} className={classes.icon} />
                        {text.bookingUnavailable}
                    </> :
                 isOccupied ?
                    <>
                        <FontAwesomeIcon icon={faUsers} className={classes.icon} />
                        {`${text.join} ${currentGuests} ${currentGuests === 1 ? 
                        text.guest : text.guests}`}
                    </> :
                    <>
                        <FontAwesomeIcon icon={faCrown} className={classes.icon} />
                        {text.firstBooking}
                    </>}
            </p>
        </button>
    );
}

const TimeslotSlide = (props: Props) => {
    const { appText, language } = useLanguageContext();
    const { BookExperience_TimeslotSlide: text } = appText;
    const classes = useStyles();

    const [dateTitle, setDateTitle] = useState<DateTime>();
    useEffect(() => {
        let selectedDate = DateTime.fromISO(props.selectedDate);

        // When in French mode, translate the title
        if (language === 'fr') {
            selectedDate = selectedDate.setLocale('fr');
        }

        setDateTitle(selectedDate);
    }, [props.selectedDate, language]);

    const { onSlideComplete, timeslot, allSlots } = props;
    useEffect(() => {
        onSlideComplete(Boolean(timeslot));
    }, [onSlideComplete, timeslot]);

    // If there's only one available slot, pre-select it
    useEffect(() => {
        if (allSlots.length === 1) {
            const slot = allSlots[0];
            if (slot.spotsLeft !== 0) {
                props.onTimeslotChange(slot);
            }
        }
        /* We don't need to include onTimeslotChange since
        it should never change. */
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [allSlots]);

    return (
        <>
            <h3 className={classes.title}>{text.title}</h3>
            <h4 className={classes.dateTitle}>
                {dateTitle?.toFormat('EEEE, MMMM d')}
                <span className={classes.yearTitle}>
                    {dateTitle?.toFormat('y')}
                </span>
            </h4>
            <div className={classes.slots}>
                {allSlots.map(slot => 
                    <Timeslot
                    key={uuid()}
                    timeslot={slot}
                    experienceCapacity={props.experienceCapacity}
                    isSelected={slot === timeslot}
                    onClick={() => {
                        props.onTimeslotChange(slot);
                    }} />
                )}
            </div>
        </>
    );
}

export default TimeslotSlide;