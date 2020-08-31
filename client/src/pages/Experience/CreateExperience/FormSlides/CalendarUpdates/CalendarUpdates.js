import React from 'react';

//Components and icons
import Tip from '../../../../../components/Tip/Tip';
import DatePicker from 'react-datepicker';

//Styles
import 'react-datepicker/dist/react-datepicker.css';
import {makeStyles} from '@material-ui/core/styles';
import styles from './CalendarUpdatesStyles';
const useStyles = makeStyles(styles);

const CalendarUpdates = ({startDate, submitInput}) => {
    const classes = useStyles();

    let inOneMonth = new Date();
    inOneMonth.setMonth(new Date().getMonth() + 1);

    //Update values in form
    const handleDateChange = (date) => {
        submitInput('startDate', date);
    }

    //TODO: Change the title of this slide
    return (
        <div style={{ overflowY: 'scroll' }}>
            <h1 className={classes.title}>Availability updates</h1>
            <div>
                <p className={classes.description}>
                    When would you like to start hosting your experience?
                </p>
                <Tip className={classes.tip}>
                    A month after this date, you'll have to update 
                    your schedule for the following month.
                </Tip>
                <Tip className={classes.tip}>
                    In your creator dashboard, you'll be able to add time slots for
                    a certain date, or remove them if no bookings have been made yet.
                </Tip>
                <DatePicker
                selected={startDate}
                onChange={handleDateChange}
                minDate={new Date()}
                maxDate={inOneMonth}
                calendarClassName={classes.calendar}
                inline/>
            </div>
        </div>
    );
}

export default CalendarUpdates;