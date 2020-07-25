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
import {makeStyles} from '@material-ui/core/styles';
import styles from './CalendarDialogStyles';
const useStyles = makeStyles(styles);

const CalendarDialog = (props) => {
    const classes = useStyles();

    //Update date in form
    const handleDateChange = (newDate) => { 
        props.onChange('date', newDate.toISOString()); 
    }

    //For calendar formatting
    const getWeekdays = (locale, date) => (
        ['S', 'M', 'T', 'W', 'T', 'F', 'S'][date.getDay()]
    );
    const getDisabledTiles = ({date}) => {
        const currDay = getWeekdayKey(date);
        return !props.availDays.includes(currDay);
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
            <DialogContent>
                <Calendar onChange={handleDateChange}
                className={classes.calendar}
                formatShortWeekday={getWeekdays}
                prevLabel={<ChevronLeftIcon/>}
                nextLabel={<ChevronRightIcon/>}
                prev2Label={null}
                next2Label={null}
                minDate={props.date.min}
                maxDate={props.date.max}
                tileDisabled={getDisabledTiles}/> 
            </DialogContent>
        </Template>
    );
}

export default CalendarDialog;
