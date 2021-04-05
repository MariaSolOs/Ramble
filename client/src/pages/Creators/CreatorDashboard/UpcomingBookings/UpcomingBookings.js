import React, { useState, useCallback, useEffect } from 'react';
import axios from '../../../../tokenizedAxios';
import { getFormattedDate, getTimePieces } from '../helpers';

import NavRow from '../NavRow/NavRow';
import BookingTab from './BookingTab/BookingTab';
import DatePicker from 'react-datepicker';
import CustomScroll from 'react-custom-scroll';

import 'react-datepicker/dist/react-datepicker.css';
import 'react-custom-scroll/dist/customScroll.css';
import { makeStyles } from '@material-ui/core/styles';
import styles from './UpcomingBookingsStyles';
const useStyles = makeStyles(styles);

const IN_ONE_MONTH = new Date().setDate(new Date().getDate() + 30);

const UpcomingBookings = ({ bookingDates, lang }) => {
    const classes = useStyles();

    // To handle selected date
    const [date, setDate] = useState(new Date());
    const handleDateChange = useCallback((newDate) => {
        setDate(newDate);
    }, []);

    // Only show dates for which we have bookings
    const filterDate = useCallback((date) => (
        bookingDates.includes(date.toISOString().split('T')[0])
    ), [bookingDates]);

    // Get occurrences from selected date
    const [occs, setOccs] = useState([]);
    useEffect(() => {
        const month = `${date.getMonth() + 1}`.padStart(2, '0');
        const day = `${date.getDate()}`.padStart(2, '0');
        axios.get(`/api/creator/${date.getFullYear()}-${month}-${day}/upcomingBookings`).then(res => {
            setOccs(res.data.occs);
        });
    }, [date]);
    
    return (
        <div className={classes.root}> 
            <div className={classes.shadowSeparator}/>
            <div className={classes.page}>
                <NavRow lang={lang}/>
                <div className={classes.container}>
                    <DatePicker
                    selected={date}
                    onChange={handleDateChange}
                    minDate={new Date()}
                    maxDate={IN_ONE_MONTH}
                    filterDate={filterDate}
                    calendarClassName={classes.datePicker}
                    inline/>
                    <CustomScroll>
                    <div className={classes.bookingsContainer}>
                        <div className={`${classes.tab} ${classes.whiteTab}`}>
                            {getFormattedDate(date)}
                        </div>
                        {occs.map((occ) => {
                            const [fromHour, fromTime, toHour, toTime] = 
                                getTimePieces(occ.timeslot);
                            return (
                                <React.Fragment key={occ._id}>
                                    {occ.experience &&
                                        <h4 className={classes.whiteText}>
                                            {occ.experience}
                                        </h4>}
                                    <div className={`${classes.tab} ${classes.greyTab} ${classes.greyText}`}>
                                        <span className="large-num">
                                            {fromHour}
                                        </span>{fromTime} - 
                                        <span className="large-num">
                                            {toHour}
                                        </span>{toTime}
                                    </div>
                                    {occ.bookings.map((booking) => (
                                        <BookingTab 
                                        key={booking._id} 
                                        booking={booking}/>
                                    ))}
                                </React.Fragment>
                            )
                        })}
                    </div>
                    </CustomScroll>
                </div>
            </div>
        </div>
    );
}

export default UpcomingBookings;