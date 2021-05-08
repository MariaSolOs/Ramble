import React, { useEffect, useState } from 'react';
import uuid from 'react-uuid';
import { getTimeSlots, slotSort } from './helpers';

import Collapse from '@material-ui/core/Collapse';

import { makeStyles } from '@material-ui/core/styles';
import styles from './WeeklyCalendarStyles';
const useStyles = makeStyles(styles);

const days = {
    en: ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday', 'Sunday'],
    fr: ['Lundi', 'Mardi', 'Mercredi', 'Jeudi', 'Vendredi', 'Samedi', 'Dimanche']
}

const WeeklyCalendar = ({ avail, duration, onChange }) => {
    const classes = useStyles();

    // Generate timeslots 
    const [timeslots, setTimeslots] = useState();
    useEffect(() => {
        const generated = getTimeSlots(+duration);
        setTimeslots(generated);
    }, [duration]);

    // For keeping track of the expanded days
    const expandedDays = Array.from(avail.keys());
    const handleShowSlots = (e) => {
        if(!expandedDays || !expandedDays.includes(e.target.value)) {
            avail.set(e.target.value, []);
        } else {
            avail.delete(e.target.value);
        }
        onChange(avail);
    }

    // For keeping track of selected times 
    const handleSelectSlot = (day, slot) => () => {
        const selected = avail.get(day);
        const newSelection = selected.includes(slot)? 
                                selected.filter(t => t !== slot) :
                                [...selected, slot];
        newSelection.sort(slotSort);
        avail.set(day, newSelection);
        if (avail.get(day).length === 0) {
            avail.delete(day);
        }
        onChange(avail);
    }

    let lang = window.localStorage.getItem('lang');
    if (!lang) { lang = 'en'; }

    return (
        <div className={classes.weekSlots}>
            {timeslots && days['en'].map((day, i) => (
                <div key={day}>    
                    <button 
                    className={`day-button 
                               ${avail.has(day)? classes.selectedButton
                                : classes.unselectedButton}`} 
                    value={day}
                    onClick={handleShowSlots}>
                        {days[lang][i]}
                    </button>
                    <Collapse
                    in={avail.has(day)}
                    component="ul"
                    timeout={500}>
                    {timeslots.map(slot => (
                        <li key={uuid()}>
                        <button
                        className={avail.has(day) && 
                                   avail.get(day).includes(slot)?
                                   classes.selectedButton : classes.unselectedButton}
                        onClick={handleSelectSlot(day, slot)}>
                            {slot.split('-')[0]}<span> - </span>{slot.split('-')[1]}
                        </button>
                        </li>
                    ))}
                    </Collapse>
                </div>
            ))}
        </div>
    );
}

export default WeeklyCalendar;