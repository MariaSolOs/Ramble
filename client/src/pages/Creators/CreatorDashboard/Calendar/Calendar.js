import React, {useState, useEffect, useCallback} from 'react';
import {connect} from 'react-redux';
import {startLoading, endLoading, showError} from '../../../../store/actions/ui';
import {useHistory, Link} from 'react-router-dom';
import axios from '../../../../tokenizedAxios';
import uuid from 'react-uuid';
import {generateTimeSlots, getFormattedDate} from './helpers';

import NavRow from '../NavRow';
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

    const [experiences, setExperiences] = useState(null);
    const [currExperience, setCurrExperience] = useState(null);
    const [date, setDate] = useState(null);

    /*The original timeslots are saved but we also 
    generate all possible timeslots*/
    const [timeslots, setTimeslots] = useState(null);
    const [origTimeslots, setOrigTimeslots] = useState(null);

    //Fetch creator's experiences
    const {creatorId, startLoading, endLoading, showError} = props;
    const history = useHistory();
    useEffect(() => {
        startLoading();
        axios.get(`/api/creator/${creatorId}/experiences`)
        .then(res => {
            setExperiences(res.data.expInfo);
            if(res.data.expInfo.length > 0) {
                //Default is first experience
                setCurrExperience(res.data.expInfo[0]);
            }
            endLoading();
        })
        .catch(err => {
            endLoading();
            showError("Your calendar isn't available right now.");
            setTimeout(() => { history.push('/'); }, 3000);
        });
    }, [creatorId, startLoading, endLoading, showError, history]);

    //Manage which experience to display
    const handleExpChange = useCallback((exp) => (e) => {
        setCurrExperience(exp);
    }, []);
    useEffect(() => {
        if(currExperience) {
            setDate(new Date(currExperience.occs[0].dateStart));
            setOrigTimeslots(currExperience.exp.avail.schedule[
                days[new Date(currExperience.occs[0].dateStart).getDay()]
            ]);
            setTimeslots(generateTimeSlots(currExperience.exp.duration));
        }
    }, [currExperience]);

    //Manage date change
    const handleDateChange = useCallback((date) => {
        setDate(date);
        if(currExperience.exp.avail.schedule[days[date.getDay()]]) {
            setOrigTimeslots(currExperience.exp.avail.schedule[days[date.getDay()]]);
        } else {
            setOrigTimeslots([]);
        }
    }, [currExperience]);

    //The Creator can add or delete occurrences
    const [addDates, setAddDates] = useState([]);
    const [delDates, setDelDates] = useState([]);
    const handleDeleteSlot = useCallback((slot) => (e) => {

    }, []);
    const handleAddSlot = useCallback((slot) => (e) => {

    }, []);

    console.log(currExperience)

    return (
        <>
        {experiences?
            currExperience? 
            <div className={classes.root}>
                <NavRow/>
                <div className={classes.expNav}>
                    {experiences.map(({exp, occs}) => (
                        <Tooltip 
                        key={exp._id}
                        disableFocusListener
                        placement="top"
                        title={exp.title}
                        classes={{tooltip: classes.tooltip}}>
                            <img 
                            src={exp.images[0]} 
                            alt={exp.title}
                            onClick={handleExpChange({exp, occs})}/>
                        </Tooltip>
                    ))}
                </div>
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
                        minDate={new Date(currExperience.exp.avail.from)}
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
                            {timeslots && timeslots.map(({from, to}) => {
                                const slot = `${from.hour}${from.time}-${to.hour}${to.time}`;
                                return (
                                    <button 
                                    key={uuid()}
                                    className={`${classes.slotButton}
                                                ${origTimeslots.includes(slot) ?
                                                'selected' : 'unselected'}`}
                                    onClick={origTimeslots.includes(slot)? 
                                             handleDeleteSlot(slot) : handleAddSlot(slot)}>
                                        {from.hour}{from.time}<span> - </span>
                                        {to.hour}{to.time}
                                    </button>
                                );
                            })}
                        </div>
                    </div>
                </div>
            </div> : 
            <h1 className={classes.title}>
                <Link to="/experience/new/intro">Start creating</Link>
            </h1> : null}
        </>
    )
}

const mapStateToProps = (state) => ({
    creatorId: state.user.creator.id
});
const mapDispatchToProps = (dispatch) => ({
    startLoading: () => dispatch(startLoading()),
    endLoading: () => dispatch(endLoading()),
    showError: (msg) => dispatch(showError(msg))
});

export default connect(mapStateToProps, mapDispatchToProps)(Calendar);