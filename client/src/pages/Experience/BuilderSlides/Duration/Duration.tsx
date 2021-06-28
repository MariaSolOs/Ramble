import { useEffect, useCallback } from 'react';

import { useLanguageContext } from 'context/languageContext';
import type { CompletableSlide } from 'models/prop-interfaces';

import Title from 'components/ExperienceBuilderTitle/ExperienceBuilderTitle';
import Subtitle from 'components/ExperienceBuilderSubtitle/ExperienceBuilderSubtitle';
import Tip from 'components/Tip/Tip';
import InputBase from '@material-ui/core/InputBase';
import AddCircleIcon from '@material-ui/icons/AddCircle';
import RemoveCircleIcon from '@material-ui/icons/RemoveCircle';

import { makeStyles } from '@material-ui/core/styles';
import styles from './Duration.styles';
const useStyles = makeStyles(styles);

interface Props extends CompletableSlide {
    duration: number;
    onDurationChange: (duration: number) => void;
}

// Duration is increased/decreased by 30 minutes
const DURATION_STEP = 0.5;

const Duration = (props: Props) => {
    const { BuilderSlides_Duration: text } = useLanguageContext().appText;
    const classes = useStyles();

    const { duration, onSlideComplete } = props;
    useEffect(() => {
        onSlideComplete(duration >= DURATION_STEP);
    }, [duration, onSlideComplete]);

    // To format the time nicely
    const getDurationText = useCallback(() => {
        const hours = Math.floor(duration);
        const minutes = duration - Math.floor(duration);

        if (hours === 0) { 
            return '30 minutes'; 
        }

        const hoursLabel = hours > 1 ? text.hours : text.hour;
        const minutesLabel = minutes === 0 ? '' : text.halfHour;
        return (`${hours} ${hoursLabel} ${minutesLabel}`);
    }, [duration, text]);

    return (
        <>
            <Title>{text.title}</Title>
            <Subtitle>{text.subtitle}</Subtitle>
            <Tip className={classes.tip}>{text.tip}</Tip>
            <div className={classes.fieldContainer}>
                <InputBase 
                readOnly
                value={getDurationText()} 
                className={classes.textfield} />
                <div className={classes.fieldButtons}>
                    <AddCircleIcon 
                    className={classes.fieldButton}
                    onClick={() => props.onDurationChange(duration + DURATION_STEP)} />
                    <RemoveCircleIcon
                    className={classes.fieldButton}
                    onClick={() => {
                        // When decreasing, make sure the minimum is 30 minutes
                        if (duration >= 1) {
                            props.onDurationChange(duration - DURATION_STEP);
                        }
                    }} />
                </div>
            </div>
        </>
    );
}

export default Duration;