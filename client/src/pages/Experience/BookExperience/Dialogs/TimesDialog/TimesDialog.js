import React from 'react';
import uuid from 'react-uuid';
import {getDatePieces} from '../../bookHelpers';

//Components and icons
import Template from '../Template';
import TimeSlot from './TimeSlot';
import DialogContent from '@material-ui/core/DialogContent';
import ChevronLeftIcon from '@material-ui/icons/ChevronLeft';

import {makeStyles} from '@material-ui/core/styles';
import styles from './TimesDialogStyles';
const useStyles = makeStyles(styles);

const TimesDialog = ({open, date, timeslot, onChange, slotsInfo, exp, controls}) => {
    const classes = useStyles();

    const [weekday, month, day, year] = getDatePieces(date);

    //For updating selection
    const handleSelection = (slot, spotsLeft) => (e) => {
        onChange('timeslot', slot);
        onChange('spotsLeft', spotsLeft);
    }

    return (
        <Template 
        open={open} 
        controls={controls} 
        continueDisabled={!timeslot}>
            <div className={classes.header}>
                <ChevronLeftIcon onClick={controls.goBack} className="goBackIcon"/>
                <h5 className="title">What time would suit you best?</h5>
                <h5 className="date">
                    {`${weekday}, ${month} ${day}`}<span>{year}</span>
                </h5>
            </div>
            <DialogContent>
                <div className={classes.timeTable}>
                    {slotsInfo.map(({slot, spotsLeft}) => (
                        <TimeSlot 
                        key={uuid()} 
                        slot={slot} 
                        spotsLeft={spotsLeft}
                        capacity={exp.capacity}
                        selected={slot === timeslot}
                        onClick={handleSelection(slot, spotsLeft)}/>
                    ))}
                </div>
            </DialogContent>
        </Template>
    );
}

export default TimesDialog;