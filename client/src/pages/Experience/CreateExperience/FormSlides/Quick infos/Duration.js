import React, {useEffect, useState} from 'react';

//Components
import TextField from '@material-ui/core/TextField';
import AddCircleIcon from '@material-ui/icons/AddCircle';
import RemoveCircleIcon from '@material-ui/icons/RemoveCircle';
import Tip from '../../../../../components/Tip';

//Styles
import {makeStyles} from '@material-ui/core/styles';
import styles from './QuickInfosStyles';
const useStyles = makeStyles(styles);

const Duration = ({duration, submitInput}) => {
    const classes = useStyles();

    //For increase/decrease buttons
    const [currDuration, setCurrDuration] = useState(duration > 1? duration : 1);
    const increaseDuration = () => setCurrDuration(currDuration + 0.5);
    const decreaseDuration = () => {
        if(currDuration > 1) { setCurrDuration(currDuration - 0.5); }
    }

    //To format the time nicely
    const getTime = () => {
        const minutes = currDuration - Math.floor(currDuration);
        const hours = Math.floor(currDuration);
        const hoursLabel = hours > 1? 'hours' : 'hour';
        return (`${hours} ${hoursLabel} ${minutes === 0? '' : ' and 30 minutes'}`);
    }

    //Update form value
    useEffect(() => {
        submitInput('duration', currDuration);
    }, [currDuration, submitInput]);
    
    return (
        <>
            <div>
                <h1 className={classes.title}>
                    Quick Infos
                    <span className={classes.greyCaps}>1 of 4</span>
                </h1>
            </div>
            <div className={classes.formGroup}>
                <h2 className={classes.title}>Duration</h2>
                <p className={classes.description}>How long is your experience?</p>
                <Tip>Most experiences are between 1 to 3 hours.</Tip>
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