import React from 'react';
import {getTimePieces} from '../../bookHelpers';

import {FontAwesomeIcon} from '@fortawesome/react-fontawesome';
import {faClock} from '@fortawesome/free-regular-svg-icons/faClock';
import {faUsers} from '@fortawesome/free-solid-svg-icons/faUsers';
import {faCrown} from '@fortawesome/free-solid-svg-icons/faCrown';
import NotInterestedOutlinedIcon from '@material-ui/icons/NotInterestedOutlined';

import {makeStyles} from '@material-ui/core/styles';
import styles from './TimesDialogStyles';
const useStyles = makeStyles(styles);

const TimeSlot = ({slot, spotsLeft, capacity, selected, onClick}) => {
    const classes = useStyles();

    const [fromHour, fromTime, toHour, toTime] = getTimePieces(slot);

    const bookingIcon = (spotsLeft === capacity)? faCrown : faUsers;
    const bookingMsg = (spotsLeft === capacity)? 'Be the first to book' : 
                        `Join ${spotsLeft} ${spotsLeft > 1? 'guests' : 'guest'}`;

    return (
        <button className={`${classes.timeslot} 
                            ${selected && 'selected'}
                            ${spotsLeft === 0 && 'disabled'}`}
        onClick={onClick}
        disabled={spotsLeft === 0}>
            <div>
                <FontAwesomeIcon icon={faClock}/> 
                <p className={classes.time}>
                    {fromHour}<span>{fromTime}</span>&nbsp;-&nbsp;{toHour}<span>{toTime}</span>
                </p>
                {spotsLeft === 0 && <NotInterestedOutlinedIcon className={classes.disabledIcon}/>}
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