import React from 'react';
import uuid from 'react-uuid';
import { TimesDialogText as text } from '../DialogsText';

import Template from '../Template';
import TimeSlot from './TimeSlot';
import DialogContent from '@material-ui/core/DialogContent';
import ChevronLeftIcon from '@material-ui/icons/ChevronLeft';

import { makeStyles } from '@material-ui/core/styles';
import styles from './TimesDialogStyles';
const useStyles = makeStyles(styles);

// To get a nice long date
const getDatePieces = (date) => {
    const format = {weekday: 'long', year: 'numeric', month: 'long', day: 'numeric'};
    const dateString = new Date(date).toLocaleDateString('en-US', format).replace(/,/g, '');
    return dateString.split(' ');
}

// For sorting the timeslots
const slotSort = (slot1, slot2) => {
    const from1 = slot1.slot.split('-')[0];
    const from2 = slot2.slot.split('-')[0];

    const hour1 = +from1.slice(0, from1.length - 2).replace(':30', '.5');
    const hour2 = +from2.slice(0, from2.length - 2).replace(':30', '.5');
    const time1 = from1.slice(from1.length - 2, from1.length);
    const time2 = from2.slice(from2.length - 2, from2.length);

    if(time1 === 'AM' && time2 === 'PM') { return -1; }
    if(time2 === 'AM' && time1 === 'PM') {
        if(hour1 === 12) { return -1; }
        return 1;
    }
    if(hour1 < hour2) { return -1; }
    if(hour2 < hour1) { return 1; }
    return 0;
}

const TimesDialog = (props) => {
    const classes = useStyles();

    const [weekday, month, day, year] = getDatePieces(props.date);

    //For updating selection
    const handleSelection = (slot, spotsLeft) => (e) => {
        props.onChange('timeslot', slot);
        props.onChange('spotsLeft', spotsLeft);
    }

    props.slotsInfo.sort(slotSort);

    return (
        <Template 
        open={props.open} 
        lang={props.lang}
        nextStep={props.controls.nextStep} 
        showContinue
        continueDisabled={!props.timeslot}>
            <div className={classes.header}>
                <ChevronLeftIcon onClick={props.controls.goBack} className="goBackIcon"/>
                <h5 className="title">{text.title[props.lang]}</h5>
                <h5 className="date">
                    {`${weekday}, ${month} ${day}`}<span>{year}</span>
                </h5>
            </div>
            <DialogContent>
                <div className={classes.timeTable}>
                    {props.slotsInfo.map(({slot, spotsLeft}) => (
                        <TimeSlot 
                        key={uuid()} 
                        slot={slot} 
                        spotsLeft={spotsLeft}
                        capacity={props.expCapacity}
                        selected={slot === props.timeslot}
                        onClick={handleSelection(slot, spotsLeft)}/>
                    ))}
                </div>
            </DialogContent>
        </Template>
    );
}

export default TimesDialog;