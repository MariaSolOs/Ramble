import React from 'react';

import Avatar from '@material-ui/core/Avatar';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCrown } from '@fortawesome/free-solid-svg-icons/faCrown';

import { makeStyles } from '@material-ui/core/styles';
import styles from './BookingTabStyles';
const useStyles = makeStyles(styles);

const BookingTab = ({ booking }) => {
    const classes = useStyles();

    return (
        <div className={classes.root}>
            <Avatar 
            src={booking.client.photo} 
            alt="Client"
            className={classes.clientPic}/>
            <div>
                <p className={classes.whiteText}>
                    {`${booking.client.fstName} ${booking.client.lstName}`}
                </p>
                <p className={classes.greyText}>
                    {`${booking.numPeople} ${booking.numPeople > 1? 'Guests' : 'Guest'}`}
                </p>
            </div>
            {booking.bookType === 'private' &&
            <div className={classes.privateTab}>
                <FontAwesomeIcon icon={faCrown}/>
                Private Booking
            </div>}
        </div>
    );
}

export default BookingTab;