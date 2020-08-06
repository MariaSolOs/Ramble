import React, {useEffect, useState} from 'react';
import uuid from 'react-uuid';
import * as helpers from '../../helpers';

//Components
import Tip from '../../../../../components/Tip';
import Collapse from '@material-ui/core/Collapse';

//Styles 
import {makeStyles} from '@material-ui/core/styles';
import styles from './ScheduleStyles';
const useStyles = makeStyles(styles);

const days = ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday', 'Sunday'];

const WeekSlots = ({avail, onChange, slots}) => {
    const classes = useStyles();

    //For keeping track of the expanded days
    const expandedDays = Array.from(avail.keys());
    const handleShowSlots = (e) => {
        if(!expandedDays || !expandedDays.includes(e.target.value)) {
            avail.set(e.target.value, []);
        } else {
            avail.delete(e.target.value);
        }
        onChange('availabilities', helpers.copyMap(avail));
    }

    //For keeping track of selected times 
    const handleSelectSlot = (day, slot) => () => {
        const selected = avail.get(day);
        const newSelection = selected.includes(slot)? 
                             selected.filter(t => t !== slot) :
                             [...selected, slot];
        avail.set(day, newSelection);
        onChange('availabilities', helpers.copyMap(avail));
    }

    return (
        <div className={classes.weekSlots}>
            {days.map(day => (
                <div key={day}>    
                    <button 
                    className={`day-button 
                               ${avail.has(day)? classes.selectedButton
                                : classes.unselectedButton}`} 
                    value={day}
                    onClick={handleShowSlots}>
                        {day}
                    </button>
                    <Collapse
                    in={avail.has(day)}
                    component="ul"
                    timeout={500}>
                    {slots.map(({from, to}) => {
                        const slot = `${from.hour}${from.time}-${to.hour}${to.time}`;
                        return (
                            <li key={uuid()}>
                            <button
                            className={avail.has(day) && 
                                       avail.get(day).includes(slot)?
                                       classes.selectedButton : classes.unselectedButton}
                            onClick={handleSelectSlot(day, slot)}>
                                <span>{from.hour}</span>{from.time}&emsp;-&emsp;
                                <span>{to.hour}</span>{to.time}
                            </button>
                            </li>
                        );
                    })}
                    </Collapse>
                </div>
            ))}
        </div>
    );
}

const Schedule = ({schedule, duration, submitInput}) => {
    const classes = useStyles();
    
    //Generate timeslots 
    const [timeslots, setTimeslots] = useState();
    useEffect(() => {
        const generated = helpers.getTimeSlots(+duration);
        setTimeslots(generated);
    }, [duration]);

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
            {timeslots && <WeekSlots 
                          avail={schedule} 
                          onChange={submitInput} 
                          slots={timeslots}/>}
        </>
    );
}

export default Schedule;