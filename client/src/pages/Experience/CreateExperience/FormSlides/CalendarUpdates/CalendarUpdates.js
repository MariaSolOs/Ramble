import React from 'react';

//Components and icons
import TextField from '../../../../../components/Input/TextField';
import Tip from '../../../../../components/Tip';
import MenuItem from '@material-ui/core/MenuItem';
import DatePicker from 'react-datepicker';
import KeyboardArrowDownIcon from '@material-ui/icons/KeyboardArrowDown';

//Styles
import 'react-datepicker/dist/react-datepicker.css';
import {makeStyles} from '@material-ui/core/styles';
import styles from './CalendarUpdatesStyles';
const useStyles = makeStyles(styles);

//TODO: Make this to fixed monthly
const CalendarUpdates = ({startDate, updateFreq, submitInput}) => {
    const classes = useStyles();

    let inOneMonth = new Date();
    inOneMonth.setMonth(new Date().getMonth() + 1);

    //Update values in form
    const handleDateChange = (date) => {
        submitInput('startDate', date);
    }
    const handleFreqChange = (e) => {
        submitInput('scheduleUpdateFreq', e.target.value);
    }

    return (
        <div style={{ overflowY: 'scroll' }}>
            <h1 className={classes.title}>Availability updates</h1>
            <div style={{ marginBottom: 20 }}>
                <p className={classes.description}>
                    At which frequency would you like to update your availabilities?
                </p>
                <div className={classes.input}>
                    <TextField 
                    select 
                    value={updateFreq}
                    onChange={handleFreqChange}
                    SelectProps={{
                        MenuProps: {
                            classes: { paper: classes.select_menu },
                            getContentAnchorEl: null,
                            anchorOrigin: {
                                vertical: 'bottom',
                                horizontal: 'right'
                            }
                        },
                        IconComponent: KeyboardArrowDownIcon
                    }}>
                        <MenuItem value='weekly'>Every week</MenuItem>
                        <MenuItem value='biweekly'>Every two weeks</MenuItem>
                        <MenuItem value='monthly'>Every month</MenuItem>
                    </TextField>
                </div>
            </div>
            <div>
                <p className={classes.description}>
                    When would you like to start hosting your experience?
                </p>
                <Tip className={classes.tip}>
                    A week / two weeks / a month after this date, you'll have to update 
                    your schedule for the next week / two weeks / month.
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