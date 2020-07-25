import React from 'react';
import {getWeekdayKey} from '../../bookHelpers';

//Components
import Template from '../Template';
import DialogContent from '@material-ui/core/DialogContent';
import CloseIcon from '@material-ui/icons/Close';
import ChevronLeftIcon from '@material-ui/icons/ChevronLeft';
import ChevronRightIcon from '@material-ui/icons/ChevronRight';
import Calendar from 'react-calendar';

//Styles
import 'react-calendar/dist/Calendar.css';
import {makeStyles} from '@material-ui/core/styles';
import styles from './CalendarDialogStyles';
const useStyles = makeStyles(styles);

const CalendarDialog = ({open, date, onChange, controls, availDays}) => {
    const classes = useStyles();

    //Update date in form
    const handleDateChange = (newDate) => { 
        onChange('date', newDate.toISOString()); 
    }

    //For calendar formatting
    const getWeekdays = (locale, date) => (
        ['S', 'M', 'T', 'W', 'T', 'F', 'S'][date.getDay()]
    );
    const getDisabledTiles = ({activeStartDate, date, view}) => {
        const currDay = getWeekdayKey(date);
        return !availDays.includes(currDay);
    }

    return (
        <Template 
        open={open}
        controls={controls}
        showContinue
        continueDisabled={!date.selec}>
            <div className={classes.header}>
                <CloseIcon onClick={controls.goBack} className="closeIcon"/>
                <h5 className="title">We know why.<br/>Question is when?</h5>
            </div>
            <DialogContent>
                <Calendar onChange={handleDateChange}
                className={classes.calendar}
                formatShortWeekday={getWeekdays}
                prevLabel={<ChevronLeftIcon/>}
                nextLabel={<ChevronRightIcon/>}
                prev2Label={null}
                next2Label={null}
                minDate={date.min}
                maxDate={date.max}
                tileDisabled={getDisabledTiles}/> 
            </DialogContent>
        </Template>
    );
}

export default CalendarDialog;
