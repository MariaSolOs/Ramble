import React from 'react';
import {copyMap} from '../../../../shared/utilities/scheduleMapHelpers';

//Components
import Tip from '../../../../components/Tip/Tip';
import WeeklyCalendar from '../../../../components/WeeklyCalendar/WeeklyCalendar';

//Styles 
import {makeStyles} from '@material-ui/core/styles';
import styles from './ScheduleStyles';
const useStyles = makeStyles(styles);

const Schedule = ({schedule, duration, submitInput}) => {
    const classes = useStyles();

    const handleChange = (avail) => {
        submitInput('availabilities', copyMap(avail));
    }

    return (
        <>
            <h1 className={classes.title}>Schedule</h1>
            <p className={classes.description}>
                Set a frequency at which you would like to host your experience.
            </p>
            <div className={classes.tips}>
                <Tip>
                    Consider your weekly schedule. Set realistic availabilities during which you are sure to be free.
                </Tip>
                <Tip>
                    Try to pick times of the day that are suitable for your type of experience.
                </Tip>
            </div>
            <p className={classes.description}>
                Pick the days of the week and time slots for which guests can book your experience.
            </p>
            <div style={{marginBottom: '10%'}}>
                <WeeklyCalendar
                avail={schedule} 
                duration={duration}
                onChange={handleChange}/>
            </div>
        </>
    );
}

export default Schedule;