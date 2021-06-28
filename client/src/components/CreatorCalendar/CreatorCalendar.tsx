import FullCalendar from '@fullcalendar/react';
import type { 
    DateSelectArg, 
    EventClickArg, 
    EventInput,
    CalendarOptions
} from '@fullcalendar/react';
import dayGridPlugin from '@fullcalendar/daygrid';
import timeGridPlugin from '@fullcalendar/timegrid';
import interactionPlugin from '@fullcalendar/interaction';

import { useLanguageContext } from 'context/languageContext';

import { makeStyles } from '@material-ui/core/styles';
import styles from './CreatorCalendar.styles';
const useStyles = makeStyles(styles);

// Creators start hosting at 8am, and end at midnight
const START_TIME = 8;
const END_TIME = 24;

/**
 * @param time - Number of hours
 * @returns The duration formatted as hh:mm
 */
const getFormattedTime = (time: number) => {
    const hours = Math.floor(time).toString();
    const halfHour = time - Math.floor(time);

    return `${hours.padStart(2, '0')}:${halfHour === 0.5 ? '30' : '00'}`;
}

/**
 * @param duration - The experience's duration
 * @returns - The latest possible slot time, and the number of slots
 */
const getSlotMaxTime = (duration: number) => {
    let start = START_TIME, end = START_TIME, i = 0;
    for (; 
         start + duration <= END_TIME; 
         start += duration, end = start + duration, i += 1
    ) {}
    return { maxTime: getFormattedTime(end), numSlots: i }
}

/**
 * @param time1 - Start time of the slot
 * @param time2 - End time of the slot
 * @param numHours - The experience's duration in hours
 * @returns True if the slot has a valid duration
 */
const isSlotValid = (time1: Date, time2: Date, numHours: number) => {
    const hours = Math.floor(numHours);
    const halfHour = numHours - Math.floor(numHours);

    let ms = hours * 60 * 60 * 1000;
    if (halfHour) {
        ms += 30 * 60 * 1000;
    }

    return time2.getTime() - time1.getTime() === ms;
}

type Props = {
    slotDuration: number;
    containerClassName: string;
    onSelect: (slot: EventInput) => void;
    onUnselect: (slot: EventClickArg) => void;
    extraOptions?: CalendarOptions;
}

export type StyleProps = {
    numSlots: number;
}

const CreatorCalendar = (props: Props) => {
    const { CreatorCalendar: text } = useLanguageContext().appText;
    const { maxTime, numSlots } = getSlotMaxTime(props.slotDuration);
    const classes = useStyles({ numSlots });

    const handleSelect = (info: DateSelectArg) => {
        if (info.allDay) {
            // When selecting on a date, change view to day grid
            info.view.calendar.changeView('timeGridDay', info.start.toISOString());
        } else {
            // Report to parent
            props.onSelect(info);
        }
    }

    const handleUnselect = (info: EventClickArg) => {
        // Only delete when in day grid mode
        if (info.view.type === 'timeGridDay') {
            props.onUnselect(info);
        }
    }
    
    return (
        <div className={`${classes.calendar} ${props.containerClassName}`}>
            <FullCalendar
            plugins={[ 
                dayGridPlugin,
                timeGridPlugin,
                interactionPlugin
            ]}
            // Use Montreal's timezone
            timeZone="America/Toronto"
            initialView="dayGridMonth"
            selectable
            eventClick={handleUnselect}
            eventTextColor="#2B2B2B"
            eventColor="#ECEBE5"
            eventTimeFormat={{
                hour: 'numeric',
                minute: '2-digit',
                meridiem: 'short'
            }}
            selectAllow={info => {
                // Allow clicking on a date or a single slot
                return info.allDay ? 
                    true : isSlotValid(info.start, info.end, props.slotDuration); 
            }}
            select={handleSelect}
            headerToolbar={{
                center: 'dayGridMonth timeGridDay',
                end: 'prev next'
            }}
            buttonText={{
                today: text.today,
                month: text.month,
                day: text.day
            }}
            validRange={{ start: new Date()}} 
            fixedWeekCount
            allDaySlot={false}
            slotDuration={getFormattedTime(props.slotDuration)}
            // Begin hosting at 8am
            slotMinTime={getFormattedTime(START_TIME)}
            slotMaxTime={maxTime}
            { ...props.extraOptions } />
        </div>
    );
}

export default CreatorCalendar;