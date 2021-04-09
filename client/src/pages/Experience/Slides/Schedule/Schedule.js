import React from 'react';
import { copyMap } from '../../../../shared/utilities/scheduleMapHelpers';
import { ScheduleText as text } from '../SlidesText';

import Tip from '../../../../components/Tip/Tip';
import WeeklyCalendar from '../../../../components/WeeklyCalendar/WeeklyCalendar';

import { makeStyles } from '@material-ui/core/styles';
import styles from './ScheduleStyles';
const useStyles = makeStyles(styles);

const Schedule = ({ schedule, duration, submitInput, lang }) => {
    const classes = useStyles();

    const handleChange = (avail) => {
        submitInput('availabilities', copyMap(avail));
    }

    return (
        <>
            <h1 className={classes.title}>{text.title[lang]}</h1>
            <p className={classes.description}>{text.desc[lang]}</p>
            <div className={classes.tips}>
                <Tip>{text.tip1[lang]}</Tip>
                <Tip>{text.tip2[lang]}</Tip>
            </div>
            <p className={classes.description}>{text.pickInst[lang]}</p>
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