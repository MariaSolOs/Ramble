import React from 'react';

import {FontAwesomeIcon} from '@fortawesome/react-fontawesome';
import {faClock} from '@fortawesome/free-regular-svg-icons/faClock';
import {faUsers} from '@fortawesome/free-solid-svg-icons/faUsers';
import {faCrown} from '@fortawesome/free-solid-svg-icons/faCrown';
import NotInterestedOutlinedIcon from '@material-ui/icons/NotInterestedOutlined';

import {makeStyles} from '@material-ui/core/styles';
import styles from './TimesDialogStyles';
const useStyles = makeStyles(styles);

//Eg: '10AM-12PM' => ['10', 'AM', '12', 'PM']
const getTimePieces = (time) => {
    const [from, to] = time.split('-');
    return [from.slice(0, from.length - 2),
            from.slice(from.length - 2, from.length),
            to.slice(0, to.length - 2),
            to.slice(to.length - 2, to.length)];
}

const TimeSlot = ({slot, spotsLeft, capacity, selected, onClick}) => {
    const classes = useStyles({selected});

    const [fromHour, fromTime, toHour, toTime] = getTimePieces(slot);

    const bookingIcon = (spotsLeft === capacity)? faCrown : faUsers;
    const bookedSpots = capacity - spotsLeft;
    const bookingMsg = (spotsLeft === capacity)? 'Be the first to book' : 
                        `Join ${bookedSpots} ${bookedSpots > 1? 'guests' : 'guest'}`;

    return (
        <button 
        className={classes.timeslot}
        onClick={onClick}
        disabled={spotsLeft === 0}>
            <div>
                {spotsLeft > 0 ? <FontAwesomeIcon icon={faClock}/> :
                                 <NotInterestedOutlinedIcon className={classes.disabledIcon}/>}
                <p className={classes.time}>
                    {fromHour}<span>{fromTime}</span>&nbsp;-&nbsp;{toHour}<span>{toTime}</span>
                </p>
            </div>
            {spotsLeft > 0 &&
                <div>
                    <FontAwesomeIcon icon={bookingIcon}/>
                    <p className={classes.bookingMsg}>{bookingMsg}</p>
                </div>}
        </button>
    );
}

export default TimeSlot;