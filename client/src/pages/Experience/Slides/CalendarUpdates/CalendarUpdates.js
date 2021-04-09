import React from 'react';
import { CalendarUpdatesText as text } from '../SlidesText';

import Tip from '../../../../components/Tip/Tip';
import DatePicker from 'react-datepicker';

import 'react-datepicker/dist/react-datepicker.css';
import { makeStyles } from '@material-ui/core/styles';
import styles from './CalendarUpdatesStyles';
const useStyles = makeStyles(styles);

const CalendarUpdates = ({ startDate, submitInput, lang }) => {
    const classes = useStyles();

    let inOneMonth = new Date();
    inOneMonth.setMonth(new Date().getMonth() + 1);

    const handleDateChange = (date) => {
        submitInput('startDate', date);
    }

    return (
        <div style={{ overflowY: 'scroll' }}>
            <h1 className={classes.title}>{text.title[lang]}</h1>
            <div>
                <p className={classes.description}>{text.desc[lang]}</p>
                <Tip className={classes.tip}>{text.tip1[lang]}</Tip>
                <Tip className={classes.tip}>{text.tip2[lang]}</Tip>
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