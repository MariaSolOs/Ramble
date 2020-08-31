import React, {useState, useEffect, useCallback} from 'react';
import uuid from 'react-uuid';
import {generateTimeSlots, getFormattedDate} from './helpers';
import {useDispatch} from 'react-redux';
import {showError, showSnackbar} from '../../../../store/actions/ui';
import axios from '../../../../tokenizedAxios';

import NavRow from '../NavRow/NavRow';
import ExpNav from './ExpNav';
import DatePicker from 'react-datepicker';
import Tooltip from '@material-ui/core/Tooltip';

import 'react-datepicker/dist/react-datepicker.css';
import {makeStyles} from '@material-ui/core/styles';
import styles from './CalendarStyles';
const useStyles = makeStyles(styles);

const Calendar = (props) => {
    const classes = useStyles();
    const dispatch = useDispatch();

    const [affectedBookings, setAffectedBookings] = useState([]);
    const [changes, setChanges] = useState({
        toAdd: [],
        toDel: []
    });
    const [changesSaved, setChangesSaved] = useState(true);
    //We generate all possible timeslots
    const [timeslots, setTimeslots] = useState(null);

    const {exp, date, bookingRequests, onDateChange} = props;
    //Get occurrences 
    useEffect(() => {
        axios.get(`/api/occ/${exp._id}`,
        {params: {date: date.toISOString().split('T')[0]}})
        .then(res => {
            setTimeslots(generateTimeSlots(exp.duration));
            setAffectedBookings(bookingRequests.filter(req => 
                (req.experience._id === exp._id) &&
                (req.occurrence.dateStart.split('T')[0] === 
                 date.toISOString().split('T')[0])
            ));
            const originalSlots = res.data.occs.map(occ => occ.timeslot);
            setChanges(changes => ({
                ...changes,
                toAdd: [...originalSlots]
            }));
        }).catch(err => {
            console.log(err)
            dispatch(showError('Your calendar is not available right now.'));
        });
    }, [exp, date, dispatch, bookingRequests]);

    const handleDateChange = useCallback((date) => {
        onDateChange(date);
    }, [onDateChange]);

    //The Creator can add or delete occurrences
    const handleSlotChange = useCallback((slot, action) => (e) => {
        setChangesSaved(false);
        let addChange, delChange;
        if(action === 'add') {
            addChange = [...changes.toAdd, slot];
            delChange = changes.toDel.filter(s => s !== slot);
        } else { //action === 'del'
            delChange = [...changes.toDel, slot];
            addChange = changes.toAdd.filter(s => s !== slot);
        }
        setChanges({toAdd: [...addChange], toDel: [...delChange]});
    }, [changes]);

    const handleSaveChanges = useCallback(() => {
        axios.post(`/api/occ/${exp._id}`, {
            changes,
            date,
            requestsOccs: bookingRequests.map(req => req.occurrence._id)
        }).then(res => {
            console.log(res);
            setChangesSaved(true);
            dispatch(showSnackbar('Your calendar was updated.'));
        }).catch(err => {
            dispatch(showError("We couldn't update your availabilities..."));
        });
    }, [exp, date, changes, bookingRequests, dispatch]);

    //To show the busy occ tooltip
    const [openBusyTooltip, setOpenBusyTooltip] = useState(false);
    const handleOpenBusyTooltip = () => { setOpenBusyTooltip(true); }
    const handleCloseBusyTooltip = () => { setOpenBusyTooltip(false); }

    //To show save message before changing date 
    const [openSaveCalMsg, setOpenSaveCalMsg] = useState(false);
    const handleOpenSaveCalMsg = () => {
        if(!changesSaved) {
            setOpenSaveCalMsg(true); 
        }
        setTimeout(() => setOpenSaveCalMsg(false), 5000);
    }

    return (
        <div className={classes.root}>
            <NavRow/>
            <ExpNav
            experiences={props.createdExps}
            changesSaved={changesSaved}
            onExpChange={props.onExpChange}/>
            <div className={classes.body}>
                <h1 className={classes.title}>{exp.title}</h1>
                <h3 className={classes.subtitle}>
                    Select the dates for which you want to add<br/> 
                    or remove availabilities.
                </h3>
                <div className={classes.calendar}>
                    <div onClick={handleOpenSaveCalMsg}>
                        <div style={{ pointerEvents: !changesSaved && 'none' }}>
                            <DatePicker
                            selected={date}
                            onChange={handleDateChange}
                            minDate={new Date()}
                            maxDate={new Date(exp.avail.to)}
                            calendarClassName={classes.datePicker}
                            inline/>
                        </div>
                    </div>
                    <div className={classes.shadowSeparator}/>
                    <div style={{ width: 300 }}>
                        <h3 className={classes.subtitle}>
                            {getFormattedDate(date)}
                        </h3>
                        <p className={classes.instruction}>
                            Select the time slots you want to add or remove for 
                            this date.
                        </p>
                        {timeslots && timeslots.map(slot => {
                        if(affectedBookings.map(book => book.occurrence.timeslot)
                        .includes(slot)) {
                            return (
                                <Tooltip
                                PopperProps={{disablePortal: true}}
                                open={openBusyTooltip}
                                onClose={handleCloseBusyTooltip}
                                disableFocusListener
                                disableHoverListener
                                disableTouchListener
                                placement="top"
                                title="You already have bookings for this time slot"
                                classes={{tooltip: classes.tooltip}}>
                                    <button 
                                    className={`${classes.slotButton} disabled`}
                                    onClick={handleOpenBusyTooltip}
                                    onMouseLeave={handleCloseBusyTooltip}>
                                        {slot.split('-')[0]}<span> - </span>
                                        {slot.split('-')[1]}
                                    </button>
                                </Tooltip>
                            );
                        } else {
                            const selected = changes.toAdd.includes(slot);
                            return (
                                <button 
                                key={uuid()}
                                className={`${classes.slotButton}
                                            ${selected ?  
                                             'selected': 'unselected'}`}
                                onClick={selected? 
                                         handleSlotChange(slot, 'del') : 
                                         handleSlotChange(slot, 'add')}>
                                    {slot.split('-')[0]}<span> - </span>
                                    {slot.split('-')[1]}
                                </button>
                            );
                        }})}
                    </div>
                </div>
                <div style={{height: 33}}>
                    {openSaveCalMsg && 
                        <span 
                        className={classes.instruction} 
                        style={{fontSize: '0.85rem'}}>
                            Please save changes before picking<br/>
                            another date.
                        </span>}
                </div>
                <div className={classes.footer}>
                    <button onClick={handleSaveChanges}>
                        Save changes
                    </button>
                </div>
            </div>
        </div>
    );
}

export default Calendar;