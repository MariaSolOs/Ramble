import React from 'react';

//Components and icons
import TextField from '../../../../../components/Input/TextField';
import MenuItem from '@material-ui/core/MenuItem';
import DateRangePicker from '@wojtekmaj/react-daterange-picker';
import ChevronLeftIcon from '@material-ui/icons/ChevronLeft';
import ChevronRightIcon from '@material-ui/icons/ChevronRight';
import KeyboardArrowDownIcon from '@material-ui/icons/KeyboardArrowDown';

//Styles
import {makeStyles} from '@material-ui/core/styles';
import styles from './TimeframeStyles';
const useStyles = makeStyles(styles);

//For calendar formatting
const getWeekdays = (locale, date) => (
    ['S', 'M', 'T', 'W', 'T', 'F', 'S'][date.getDay()]
);

const Timeframe = ({timeframe, updateFreq, submitInput}) => {
    const classes = useStyles();

    //Update values in form
    const handleDateChange = (newDate) => {
        submitInput('timeframe', newDate);
    }
    const handleFreqChange = (e) => {
        submitInput('scheduleUpdateFreq', e.target.value);
    }

    return (
        <>
        <h1 className={classes.title}>Availability updates</h1>
        <div style={{ marginBottom: 60 }}>
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
                    <MenuItem value='weekly'>Weekly</MenuItem>
                    <MenuItem value='biweekly'>Biweekly</MenuItem>
                    <MenuItem value='monthly'>Monthly</MenuItem>
                </TextField>
            </div>
        </div>
        <div className={classes.field}>
            <p className={classes.description}>
                For which dates will you have these availabilities?
            </p>
            <DateRangePicker 
            value={timeframe}
            className={classes.timeframe}
            calendarClassName={classes.calendar}
            formatShortWeekday={getWeekdays}
            prevLabel={<ChevronLeftIcon/>}
            nextLabel={<ChevronRightIcon/>}
            prev2Label={null}
            next2Label={null}
            minDate={new Date()}
            minDetail="year"
            rangeDivider="to"
            clearIcon={null}
            onChange={handleDateChange}/>
        </div>
        </>
    );
}

export default Timeframe;