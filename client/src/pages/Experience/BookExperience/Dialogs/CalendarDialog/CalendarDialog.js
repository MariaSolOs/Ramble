import React from 'react';

//Components
import Template from '../Template';
import DialogContent from '@material-ui/core/DialogContent';
import CloseIcon from '@material-ui/icons/Close';
import DatePicker from 'react-datepicker';

//Styles
import 'react-datepicker/dist/react-datepicker.css';
import {makeStyles} from '@material-ui/core/styles';
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
        nextStep={props.controls.nextStep}
        showContinue
        continueDisabled={!props.date.selec}>
            <div className={classes.header}>
                <CloseIcon onClick={props.controls.goBack} className="closeIcon"/>
                <h5 className="title">We know why.<br/>Question is when?</h5>
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
