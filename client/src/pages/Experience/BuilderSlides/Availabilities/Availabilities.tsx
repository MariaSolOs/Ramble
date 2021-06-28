import { useEffect } from 'react';
import { v4 as uuid } from 'uuid';

import { useLanguageContext } from 'context/languageContext';
import type { CompletableSlide } from 'models/prop-interfaces';

import Title from 'components/ExperienceBuilderTitle/ExperienceBuilderTitle';
import Subtitle from 'components/ExperienceBuilderSubtitle/ExperienceBuilderSubtitle';
import Tip from 'components/Tip/Tip';
import CreatorCalendar from 'components/CreatorCalendar/CreatorCalendar';
import type { EventInput, EventClickArg } from '@fullcalendar/react';

import { makeStyles } from '@material-ui/core/styles';
import styles from './Availabilities.styles';
const useStyles = makeStyles(styles);

interface Props extends CompletableSlide {
    slots: EventInput[];
    onSlotsChange: (slots: EventInput[]) => void;
    duration: number;
}

const Availabilities = (props: Props) => {
    const { BuilderSlides_Availabilities: text } = useLanguageContext().appText;
    const classes = useStyles();
    
    // Creators must commit to host at least once
    const { onSlideComplete, slots } = props;
    useEffect(() => {
        onSlideComplete(slots.length >= 1);
    }, [onSlideComplete, slots]);

    const handleSelect = (newSlot: EventInput) => {
        newSlot.id = uuid();
        props.onSlotsChange([ ...slots, newSlot ]);
    }

    const handleUnselect = (slot: EventClickArg) => {
        props.onSlotsChange(slots.filter(({ id }) =>
            id !== slot.event.id
        ));
    }
    
    return (
        <div className={classes.pageContainer}>
            <div className={classes.instructions}>
                <Title>{text.title}</Title>
                <Subtitle className={classes.subtitle}>{text.subtitle}</Subtitle>
                <Tip>{text.tip1}</Tip>
                <Tip>{text.tip2}</Tip>
            </div>
            <div>
                <CreatorCalendar
                slotDuration={props.duration}
                containerClassName={classes.calendar}
                onSelect={handleSelect}
                onUnselect={handleUnselect}
                extraOptions={{
                    events: slots,
                    height: 500
                }} />
            </div>
        </div>
    );
}

export default Availabilities;