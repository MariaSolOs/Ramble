import React from 'react';
import {getWeekdayKey} from '../bookHelpers';

//Components
import Dialog from '@material-ui/core/Dialog';
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
        <Dialog open={open} onClose={controls.goBack} 
        classes={{ paper: classes.paper }}
        maxWidth="xs" fullWidth disableBackdropClick>
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
            <button onClick={controls.nextStep}
            className={`${classes.continueButton} ${!date.selec && 'disabled'}`}
            disabled={!date.selec}>
                Continue
            </button>
            </DialogContent>
        </Dialog>
    );
}

export default React.memo(CalendarDialog);
