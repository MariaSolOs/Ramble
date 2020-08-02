import React from 'react';

//Components and icons
import TextField from '../../../../../components/Input/TextField';
import MenuItem from '@material-ui/core/MenuItem';
import DatePicker from 'react-datepicker';
import KeyboardArrowDownIcon from '@material-ui/icons/KeyboardArrowDown';

//Styles
import 'react-datepicker/dist/react-datepicker.css';
import {makeStyles} from '@material-ui/core/styles';
import styles from './TimeframeStyles';
const useStyles = makeStyles(styles);

const Timeframe = ({timeframe, updateFreq, submitInput}) => {
    const classes = useStyles();

    let inOneMonth = new Date();
    inOneMonth.setMonth(new Date().getMonth() + 1);

    //Update values in form
    const handleDateChange = (timeframe) => {
        submitInput('timeframe', timeframe);
    }
    const handleFreqChange = (e) => {
        submitInput('scheduleUpdateFreq', e.target.value);
    }

    return (
        <>
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
            <DatePicker
            selected={timeframe[0]}
            startDate={timeframe[0]}
            endDate={timeframe[1]}
            onChange={handleDateChange}
            minDate={new Date()}
            maxDate={inOneMonth}
            calendarClassName={classes.calendar}
            selectsRange
            inline/>
        </div>
        </>
    );
}

export default Timeframe;