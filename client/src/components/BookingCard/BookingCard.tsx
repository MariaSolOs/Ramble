import React from 'react';
import { DateTime } from 'luxon';
import useMediaQuery from '@material-ui/core/useMediaQuery';

import { useLanguageContext } from 'context/languageContext';
import type { BookingType } from 'models/experience-occurrence';
import { getTimePieces } from 'utils/dates';

import Avatar from '@material-ui/core/Avatar';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faClock } from '@fortawesome/free-regular-svg-icons/faClock';
import { faCrown } from '@fortawesome/free-solid-svg-icons/faCrown';
import { faUsers } from '@fortawesome/free-solid-svg-icons/faUsers';
import { faDollarSign } from '@fortawesome/free-solid-svg-icons/faDollarSign';

import { makeStyles, useTheme } from '@material-ui/core/styles';
import styles from './BookingCard.styles';
const useStyles = makeStyles(styles);

type Props = {
    bookingType: BookingType;
    numGuests: number;
    confirmedGuests: number;
    createdAt: string;
    dateStart: string;
    dateEnd: string;
    bookingProfit: number;
    currentProfit: number;
    experience: {
        title: string;
        image: string;
        capacity: number;
    }
    client: {
        name: string;
        photo?: string;
        city?: string;
    }
    onAccept: React.MouseEventHandler<HTMLButtonElement>;
    onDecline: React.MouseEventHandler<HTMLButtonElement>;
    containerClass?: string;
}

export type StyleProps = {
    hasClientCity: boolean;
}

const BookingCard = React.memo((props: Props) => {
    const { appText, language } = useLanguageContext();
    const { BookingCard: text } = appText;

    const classes = useStyles({
        hasClientCity: Boolean(props.client.city)
    });
    const theme = useTheme();
    const isMobile = useMediaQuery(theme.breakpoints.down('xs'));

    // Transform the prices to dollars since they come in cents
    const bookingProfit = (props.bookingProfit / 100).toFixed(2);
    const currentProfit = (props.currentProfit / 100).toFixed(2);

    // Format dates and times nicely
    const bookingDate = DateTime.fromISO(props.createdAt).setLocale(language).toLocaleString(DateTime.DATE_HUGE);
    const bookingTime = DateTime.fromISO(props.createdAt).toLocaleString(DateTime.TIME_SIMPLE);
    const occurrenceDate = DateTime.fromISO(props.dateStart).setLocale(language).toLocaleString(DateTime.DATE_HUGE);
    const [startTime, startMeridiem] = getTimePieces(DateTime.fromISO(props.dateStart));
    const [endTime, endMeridiem] = getTimePieces(DateTime.fromISO(props.dateEnd));

    return (
        <div className={props.containerClass}>
            <div className={classes.header}>
                <time className={classes.greyText}>{bookingDate}</time>
                <time className={classes.greyText}>{bookingTime}</time>
                <h4 className={classes.bookingTitle}>
                    {text.fromTitle} {props.client.name}
                </h4>
            </div>
            <div className={classes.body}>
                {props.bookingType === 'private' &&
                    <div className={classes.private}>
                        <FontAwesomeIcon className={classes.icon} icon={faCrown} />
                        {text.privateBooking}
                    </div>}
                <div className={classes.clientInfo}>
                    <Avatar src={props.client.photo}>
                        {props.client.name.charAt(0)}
                    </Avatar>
                    <div>
                        <p className={classes.clientName}>{props.client.name}</p>
                        <p className={classes.greyText}>{props.client.city}</p>                        
                    </div>
                </div>
                <div className={classes.infoRow}>
                    <div className={classes.infoContainer}>
                        <div className={classes.iconContainer}>
                            <FontAwesomeIcon className={classes.icon} icon={faClock} />
                        </div>
                        <p className={classes.infoText}>
                            <span className={classes.largeNum}>{startTime}</span> 
                            {startMeridiem} -
                            <span className={classes.largeNum}>{endTime}</span>{endMeridiem}
                        </p>
                    </div>
                    <div className={classes.infoContainer}>
                        <div className={classes.iconContainer}>
                            <FontAwesomeIcon className={classes.icon} icon={faUsers} />
                        </div>
                        <p className={classes.infoText}>
                            <span className={classes.largeNum}>{props.numGuests}</span> 
                            {!isMobile && (props.numGuests > 1 ? text.guests : text.guest)}
                        </p>
                    </div>
                    <div className={classes.infoContainer}>
                        <div className={classes.iconContainer}>
                            <FontAwesomeIcon className={classes.icon} icon={faDollarSign} />
                        </div>
                        <p className={classes.infoText}>
                            $<span className={classes.largeNum}>{bookingProfit}</span> 
                        </p>
                    </div>
                </div>
                <div className={classes.experienceInfo}>
                    <img 
                    alt={props.experience.title} 
                    src={props.experience.image}
                    className={classes.experienceImg} />
                    <p className={classes.experienceTitle}>{props.experience.title}</p>
                </div>
                <p className={classes.greyText}>{text.currentlyFor}</p>
                <p className={classes.infoText}>{occurrenceDate}</p>
                <div className={classes.infoRow}>
                    <div className={classes.infoContainer}>
                        <div className={classes.iconContainer}>
                            <FontAwesomeIcon className={classes.icon} icon={faUsers} />
                        </div>
                        <p className={classes.infoText}>
                            {`${props.confirmedGuests} / ${props.experience.capacity} ${text.guests}`}
                        </p>
                    </div>
                    <p className={classes.greyText}>
                        {`${text.currentPayment} `}
                        <span className={classes.infoText}>
                            $<span className={classes.largeNum}>{currentProfit}</span>
                        </span>
                    </p>
                </div>
                <div className={classes.actions}>
                    <button 
                    className={`${classes.button} ${classes.acceptButton}`}
                    onClick={props.onAccept}>
                        {text.accept}
                    </button>
                    <button 
                    className={`${classes.button} ${classes.declineButton}`}
                    onClick={props.onDecline}>
                        {text.decline}
                    </button>
                </div>
            </div>
        </div>
    );
});

export default BookingCard;