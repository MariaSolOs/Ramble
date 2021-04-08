import React, { useEffect, useState } from 'react';
import { DurationText as text } from '../SlidesText';

import TextField from '@material-ui/core/TextField';
import AddCircleIcon from '@material-ui/icons/AddCircle';
import RemoveCircleIcon from '@material-ui/icons/RemoveCircle';
import Tip from '../../../../components/Tip/Tip';

import { makeStyles } from '@material-ui/core/styles';
import styles from './QuickInfosStyles';
const useStyles = makeStyles(styles);

const Duration = ({ duration, submitInput, lang }) => {
    const classes = useStyles();

    // For increase/decrease buttons
    const [currDuration, setCurrDuration] = useState(duration > 0.5? duration : 0.5);
    const increaseDuration = () => setCurrDuration(currDuration + 0.5);
    const decreaseDuration = () => {
        if(currDuration >= 1) { setCurrDuration(currDuration - 0.5); }
    }

    // To format the time nicely
    const getTime = () => {
        const minutes = currDuration - Math.floor(currDuration);
        const hours = Math.floor(currDuration);

        if (hours === 0) { return '30 minutes'; }

        const hoursLabel = hours > 1? text.hours[lang] : text.hour[lang];
        return (`${hours} ${hoursLabel} ${minutes === 0? '' : text.halfHour[lang]}`);
    }

    // Update form value
    useEffect(() => {
        submitInput('duration', currDuration);
    }, [currDuration, submitInput]);
    
    return (
        <>
            <div>
                <h1 className={classes.title}>
                    {text.infos[lang]}
                    <span className={classes.greyCaps}>1 of 4</span>
                </h1>
            </div>
            <div className={classes.formGroup}>
                <h2 className={classes.title}>{text.title[lang]}</h2>
                <p className={classes.description}>{text.question[lang]}</p>
                <Tip>{text.tip[lang]}</Tip>
                <div className={classes.numField}>
                    <TextField
                    classes={{ root: classes.numField_textField_root }}
                    value={getTime()}
                    InputProps={{
                        disableUnderline: true,
                        readOnly: true,
                        classes: { 
                            root: classes.numField_input_root, 
                            input: classes.numField_input_input 
                        }
                    }}/>
                    <div className={classes.numFieldButtons}>
                        <AddCircleIcon onClick={increaseDuration}/>
                        <RemoveCircleIcon onClick={decreaseDuration}/>
                    </div>
                </div>
            </div>
        </>
    );
}

export default Duration;