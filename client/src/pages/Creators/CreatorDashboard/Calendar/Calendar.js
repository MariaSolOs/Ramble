import React, {useState, useEffect, useCallback} from 'react';
import {Link} from 'react-router-dom';
import uuid from 'react-uuid';
import {generateTimeSlots, getFormattedDate} from './helpers';
import {useDispatch} from 'react-redux';
import {showError} from '../../../../store/actions/ui';
import axios from '../../../../tokenizedAxios';

import NavRow from '../NavRow';
import ExpNav from './ExpNav';
import DatePicker from 'react-datepicker';
import Tooltip from '@material-ui/core/Tooltip';

import 'react-datepicker/dist/react-datepicker.css';
import {makeStyles} from '@material-ui/core/styles';
import styles from './CalendarStyles';
const useStyles = makeStyles(styles);

const days = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 
              'Thursday', 'Friday', 'Saturday'];

const Calendar = (props) => {
    const classes = useStyles();
    const dispatch = useDispatch();

    const [currExperience, setCurrExperience] = useState(null);
    const [date, setDate] = useState(null);
    const [affectedBookings, setAffectedBookings] = useState([]);
    const [changes, setChanges] = useState({});
    const [changesSaved, setChangesSaved] = useState(true);
    //We generate all possible timeslots
    const [timeslots, setTimeslots] = useState(null);

    const {experiences, bookingRequests} = props;
    //Set default experience to the first one
    useEffect(() => {
        if(experiences.length > 0) {
            setCurrExperience(experiences[0]);
        } else { //Return a link to creation
            return (
                <div className={classes.root}>
                    <h1 className={classes.title}>
                        <Link to="/experience/new/intro">
                            Start creating
                        </Link>
                    </h1>
                </div>
            );
        }
    }, [experiences, classes.title, classes.root]);

    //Manage which experience to display
    const handleExpChange = useCallback((exp) => {
        setCurrExperience(exp);
    }, []);
    useEffect(() => {
        if(currExperience && currExperience.occs.length > 0) {
            const initDate = new Date(Math.max(
                new Date(currExperience.occs[0].dateStart),
                new Date()
            ));
            setDate(initDate);
            setTimeslots(generateTimeSlots(currExperience.exp.duration));
            setAffectedBookings(bookingRequests.filter(req => 
                req.experience._id === currExperience.exp._id
            ));
            setChanges(changes => ({
                ...changes,
                [initDate]: {
                    toAdd: currExperience.exp.avail.schedule[
                        days[new Date(currExperience.occs[0].dateStart).getDay()]
                    ],
                    toAdd: Object.keys(currExperience.exp.avail.schedule)
                           .includes(days[initDate.getDay()])?
                           currExperience.exp.avail.schedule[days[initDate.getDay()]] 
                           : [],
                    toDel: []
                }
            }));
        }
    }, [currExperience, bookingRequests]);

    const handleDateChange = useCallback((date) => {
        setDate(date);
        //Check if the weekday exists and update affected bookings
        if(currExperience.exp.avail.schedule[days[date.getDay()]]) {
            setChanges(changes => ({
                ...changes,
                [date]: {
                    toAdd: currExperience.exp.avail.schedule[days[date.getDay()]],
                    toDel: []
                }
            }));
            setAffectedBookings(bookings => bookings.filter(book => 
                book.occurrence.dateStart.toISOString().split('T') === 
                date.toISOString().split('T')
            ));
        } else {
            setChanges(changes => ({
                ...changes,
                [date]: {
                    toAdd: [],
                    toDel: []
                }
            }));
        }
    }, [currExperience]);

    //The Creator can add or delete occurrences
    const handleSlotChange = useCallback((slot, action) => (e) => {
        setChangesSaved(false);
        let addChange, delChange;
        if(action === 'add') {
            addChange = [...changes[date].toAdd, slot];
            delChange = changes[date].toDel.filter(s => s !== slot );
        } else { //action === 'del'
            delChange = [...changes[date].toDel, slot];
            addChange = changes[date].toAdd.filter(s => s !== slot );
        }
        setChanges(changes => ({
            ...changes,
            [date]: {
                toAdd: addChange,
                toDel: delChange
            }
        }));
    }, [date, changes]);
    const handleSaveChanges = useCallback(() => {
        axios.post(`/api/occ/${currExperience.exp._id}`, {
            changes,
            requestsOccs: props.bookingRequests.map(req => req.occurrence._id)
        }).then(res => {
            console.log(res);
            setChangesSaved(true);
        }).catch(err => {
            dispatch(showError("We couldn't update your availabilities..."));
        });
    }, [currExperience, changes, props.bookingRequests, dispatch]);

    //To show the busy occ tooltip
    const [openBusyTooltip, setOpenBusyTooltip] = useState(false);
    const handleOpenBusyTooltip = () => { setOpenBusyTooltip(true); }
    const handleCloseBusyTooltip = () => { setOpenBusyTooltip(false); }

    return (
        <>
        {props.experiences?
            <div className={classes.root}>
               {currExperience &&
                <>
                <NavRow/>
                <ExpNav
                experiences={props.experiences}
                changesSaved={changesSaved}
                onExpChange={handleExpChange}/>
                <div className={classes.body}>
                    <h1 className={classes.title}>{currExperience.exp.title}</h1>
                    <h3 className={classes.subtitle}>
                        Select the dates for which you want to add<br/> 
                        or remove availabilities.
                    </h3>
                    <div className={classes.calendar}>
                        <DatePicker
                        selected={date}
                        onChange={handleDateChange}
                        minDate={new Date(Math.max(
                            new Date(currExperience.exp.avail.from),
                            new Date()
                        ))}
                        maxDate={new Date(currExperience.exp.avail.to)}
                        calendarClassName={classes.datePicker}
                        inline/>
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
                                const selected = (changes[date] && 
                                                  changes[date].toAdd.includes(slot));
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
                    <div className={classes.footer}>
                        <button onClick={handleSaveChanges}>
                            Save changes
                        </button>
                    </div>
                </div>
                </>}
            </div> : null}
        </>
    )
}

export default Calendar;