import React from 'react';
import * as helpers from './helpers';

import Avatar from '@material-ui/core/Avatar';
import Fab from '@material-ui/core/Fab';
import {FontAwesomeIcon} from '@fortawesome/react-fontawesome';
import {faClock} from '@fortawesome/free-regular-svg-icons/faClock';
import {faUsers} from '@fortawesome/free-solid-svg-icons/faUsers';
import {faDollarSign} from '@fortawesome/free-solid-svg-icons/faDollarSign';

import {makeStyles} from '@material-ui/core/styles';
import styles from './BookingCardStyles';
const useStyles = makeStyles(styles);

const BookingCard = ({booking, onAccept, onDecline}) => {
    const classes = useStyles();
    const [fromHour, fromTime, toHour, toTime] = 
        helpers.getTimePieces(booking.occurrence.timeslot);

    return (
        <div className={classes.root}>
            <div className={classes.header}>
                <p className={classes.greyText}>
                    {helpers.getFormattedDate(booking.createdAt)}
                </p>
                <p className={classes.whiteText}>
                    {helpers.getFormattedTime(booking.createdAt)}
                </p>
                <h3 className={classes.whiteText}>
                    Booking request from {booking.client.fstName}
                </h3>
            </div>
            <div className={classes.body}>
                <div className={classes.clientInfo}>
                    <Avatar src={booking.client.photo}/>
                    <div>
                        <p className={classes.whiteText}>
                            {booking.client.fstName}
                        </p>
                        <p className={classes.greyText}>
                            {booking.client.city}
                        </p>
                    </div>
                </div>
                <div className="row">
                    <p className={classes.greyText}>For</p>
                    <p className={classes.whiteText}>
                        {helpers.getFormattedDate(booking.occurrence.dateStart)}
                    </p>
                </div>
                <div className={`${classes.bookDetails} row`}>
                    <Fab size="small" disableRipple>
                        <FontAwesomeIcon icon={faClock}/>
                    </Fab>
                    <span className={`${classes.whiteText} ${classes.withLargeNum}`}>
                        <span>{fromHour}</span>{fromTime} -
                        <span>{toHour}</span>{toTime}
                    </span>
                    <Fab size="small" disableRipple>
                        <FontAwesomeIcon icon={faUsers}/>
                    </Fab>
                    <span className={classes.whiteText}>
                        {booking.numPeople} 
                        {booking.numPeople > 1? ' Guests': ' Guest'}
                    </span>
                    <Fab size="small" disableRipple>
                        <FontAwesomeIcon icon={faDollarSign}/>
                    </Fab>
                    <span className={`${classes.whiteText} ${classes.withLargeNum}`}>
                        $ <span>{(booking.stripe.creatorProfit / 100).toFixed(2)}</span>
                    </span>
                </div>
                <div className={classes.experience}>
                    <img 
                    src={booking.experience.images[0].replace('h_400', 'h_150')} 
                    alt={booking.experience.title}/>
                    <h4 className={classes.whiteText}>
                        {booking.experience.title}
                    </h4>
                </div>
                <div className="row">
                    <p className={classes.greyText}>Currently for</p>
                    <p className={classes.whiteText}>
                        {helpers.getFormattedDate(booking.occurrence.dateStart)}
                    </p>
                    <p className={classes.whiteText}>
                        {`${fromHour} ${fromTime} - ${toHour} ${toTime}`}
                    </p>
                </div>
                <div className={classes.currentBookInfo}>
                    <div>
                        <Fab size="small" disableRipple>
                            <FontAwesomeIcon icon={faUsers}/>
                        </Fab>
                        <span className={classes.whiteText}>
                            {` ${booking.experience.capacity - 
                                (booking.occurrence.spotsLeft + 
                                booking.numPeople)} / ${booking.experience.capacity} Guests`}
                        </span>
                    </div>
                    <div>
                        <span className={classes.greyText}>Current payment </span>
                        <span className={`${classes.whiteText} ${classes.withLargeNum}`}>
                            $ <span>{(booking.occurrence.creatorProfit / 100).toFixed(2)}</span>
                        </span>
                    </div>
                </div>
                <div className={classes.actions}>
                    <button 
                    onClick={onAccept}
                    className={classes.acceptButton}>
                        Accept
                    </button>
                    <button 
                    onClick={onDecline}
                    className={classes.declineButton}>
                        Decline
                    </button>
                </div>
            </div>
        </div>
    );
}

export default BookingCard;