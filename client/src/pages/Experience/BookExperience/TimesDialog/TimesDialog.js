import React from 'react';
import uuid from 'react-uuid';
import {getDatePieces} from '../bookHelpers';

//Components and icons
import TimeSlot from './TimeSlot';
import Dialog from '@material-ui/core/Dialog';
import DialogContent from '@material-ui/core/DialogContent';
import ChevronLeftIcon from '@material-ui/icons/ChevronLeft';

import {makeStyles} from '@material-ui/core/styles';
import styles from './TimesDialogStyles';
const useStyles = makeStyles(styles);

const TimesDialog = ({open, date, timeslot, onChange, slotsInfo, exp, controls}) => {
    const classes = useStyles();

    const [weekday, month, day, year] = getDatePieces(date);

    //For updating selection
    const handleSelection = (slot) => (e) => {
        onChange('timeslot', {...slot});
    }

    return (
        <Dialog open={open} onClose={controls.goBack} disableBackdropClick
        classes={{ paper: classes.paper }}
        maxWidth="xs" fullWidth>
            <div className={classes.header}>
                <ChevronLeftIcon onClick={controls.goBack} className="goBackIcon"/>
                <h5 className="title">What time would suit you best?</h5>
                <h5 className="date">{`${weekday}, ${month} ${day}`}<span>{year}</span></h5>
            </div>
            <DialogContent>
                <div className={classes.timeTable}>
                    {slotsInfo.map(({slot, spotsLeft}) => (
                        <TimeSlot 
                        key={uuid()} 
                        slot={slot} 
                        spotsLeft={spotsLeft}
                        capacity={exp.capacity}
                        selected={slot === timeslot.slot}
                        onClick={handleSelection({slot, spotsLeft})}/>
                    ))}
                </div>
            <button onClick={controls.nextStep}
            className={`${classes.continueButton} 
                        ${!timeslot.slot && 'disabled'}`}
            disabled={!timeslot}>
                Continue
            </button>
            </DialogContent>
        </Dialog>
    );
}

export default TimesDialog;