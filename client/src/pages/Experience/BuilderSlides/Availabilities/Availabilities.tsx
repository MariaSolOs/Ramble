import { useEffect } from 'react';
import { v4 as uuid } from 'uuid';
import FullCalendar from '@fullcalendar/react';
import dayGridPlugin from '@fullcalendar/daygrid';
import timeGridPlugin from '@fullcalendar/timegrid';
import interactionPlugin from '@fullcalendar/interaction';

import type { DateSelectArg, EventClickArg, EventInput } from '@fullcalendar/react';
import { useLanguageContext } from 'context/languageContext';
import type { CompletableSlide } from 'models/prop-interfaces';

import Title from 'components/ExperienceBuilderTitle/ExperienceBuilderTitle';
import Subtitle from 'components/ExperienceBuilderSubtitle/ExperienceBuilderSubtitle';
import Tip from 'components/Tip/Tip';

import { makeStyles } from '@material-ui/core/styles';
import styles from './Availabilities.styles';
const useStyles = makeStyles(styles);

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

interface Props extends CompletableSlide {
    slots: EventInput[];
    onSlotsChange: (slots: EventInput[]) => void;
    duration: number;
}

const Availabilities = (props: Props) => {
    const { appText, language } = useLanguageContext();
    const { BuilderSlides_Availabilities: text } = appText;
    const classes = useStyles();

    // Creators must commit to host at least once
    const { onSlideComplete, slots } = props;
    useEffect(() => {
        onSlideComplete(slots.length >= 1);
    }, [onSlideComplete, slots]);

    const handleSelect = (info: DateSelectArg) => {
        if (info.allDay) {
            // When selecting on a date, change view to day grid
            info.view.calendar.changeView('timeGridDay', info.start.toISOString());
        } else {
            // Create new slot
            const newSlot = info as EventInput;
            newSlot.id = uuid();
            props.onSlotsChange([ ...slots, newSlot ]);
        }
    }

    const handleUnselect = (info: EventClickArg) => {
        // Only delete when in day grid mode
        if (info.view.type === 'timeGridDay') {
            props.onSlotsChange(slots.filter(({ id }) =>
                id !== info.event.id
            ));
        }
    }
    
    return (
        <div className={classes.pageContainer}>
            <div className={classes.instructions}>
                <Title>{text.title}</Title>
                <Subtitle className={classes.subtitle}>{text.subtitle}</Subtitle>
                <Tip className={classes.tip}>{text.tip1}</Tip>
                <Tip className={classes.tip}>{text.tip2}</Tip>
                <Tip className={classes.tip}>{text.timezoneMessage}</Tip>
            </div>
            <div className={classes.calendar}>
                <FullCalendar
                plugins={[ 
                    dayGridPlugin,
                    timeGridPlugin,
                    interactionPlugin
                ]}
                // Use Montreal's timezone
                timeZone="America/Toronto"
                locale={language}
                initialView="dayGridMonth"
                selectable
                eventClick={handleUnselect}
                eventTextColor="#2B2B2B"
                eventColor="#ECEBE5"
                events={slots}
                height={500}
                longPressDelay={50}
                eventTimeFormat={{
                    hour: 'numeric',
                    minute: '2-digit',
                    meridiem: 'short'
                }}
                selectAllow={info => {
                    // Allow clicking on a date or a single slot
                    return info.allDay ? 
                        true : isSlotValid(info.start, info.end, props.duration); 
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
                validRange={{ start: new Date() }} 
                fixedWeekCount
                allDaySlot={false}
                slotDuration="00:30"
                // Creators start hosting at 8am, and end at midnight
                slotMinTime="08:00"
                dayMaxEvents={2}
                moreLinkClick={() => 'day'} />
            </div>
        </div>
    );
}

export default Availabilities;