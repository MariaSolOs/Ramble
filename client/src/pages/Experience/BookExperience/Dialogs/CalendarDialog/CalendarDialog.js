import React from 'react';
import { CalendarDialogText as text } from '../DialogsText';

import Template from '../Template';
import DialogContent from '@material-ui/core/DialogContent';
import CloseIcon from '@material-ui/icons/Close';
import DatePicker from 'react-datepicker';

import 'react-datepicker/dist/react-datepicker.css';
import { makeStyles } from '@material-ui/core/styles';
import styles from './CalendarDialogStyles';
const useStyles = makeStyles(styles);

const getWeekdayKey = (date) => {
    const days = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 
                  'Thursday', 'Friday', 'Saturday'];
    return days[new Date(date).getDay()];
}

const CalendarDialog = (props) => {
    const classes = useStyles();

    //Update date in form
    const handleDateChange = (newDate) => { 
        props.onChange('date', newDate); 
    }

    //For calendar formatting
    const getAvailableDays = (date) => {
        const currDay = getWeekdayKey(date);
        return props.availDays.includes(currDay);
    }


    return (
        <Template 
        open={props.open}
        lang={props.lang}
        nextStep={props.controls.nextStep}
        showContinue
        continueDisabled={!props.date.selec}>
            <div className={classes.header}>
                <CloseIcon onClick={props.controls.goBack} className="closeIcon"/>
                <h5 className="title">
                    {text.title[props.lang][0]}<br/>{text.title[props.lang][1]}
                </h5>
            </div>
            <DialogContent className={classes.content}>
                <DatePicker
                selected={props.date.selec}
                onChange={handleDateChange}
                minDate={props.date.min}
                maxDate={props.date.max}
                filterDate={getAvailableDays}
                calendarClassName={classes.calendar}
                inline/>
            </DialogContent>
        </Template>
    );
}

export default CalendarDialog;
