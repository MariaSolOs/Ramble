import React, {useState, useEffect, useCallback} from 'react';
import {useDispatch} from 'react-redux';
import {showError} from '../../../store/actions/ui';
import {useHistory, useParams} from 'react-router-dom';
import axios from '../../../tokenizedAxios';
import {copyMap} from '../../../shared/utilities/scheduleMapHelpers';

import WeeklyCalendar from '../../../components/WeeklyCalendar/WeeklyCalendar';
import Tip from '../../../components/Tip/Tip';

import {makeStyles} from '@material-ui/core/styles';
import styles from './ExpScheduleStyles';
const useStyles = makeStyles(styles);

//Helper function to make a Map from Object
const objToMap = (obj) => {
    const map = new Map();
    for(const key of Object.keys(obj)) {
        map.set(key, obj[key]);
    }
    return map;
}

const ExpSchedule = (props) => {
    const classes = useStyles();

    const dispatch = useDispatch();
    const history = useHistory();
    const {expId} = useParams();

    const [changed, setChanged] = useState(false);
    const [done, setDone] = useState(false);

    //Fetch experience and set schedule
    const [exp, setExp] = useState(null);
    const [schedule, setSchedule] = useState(null);
    useEffect(() => {
        axios.get(`/api/exp/${expId}`)
        .then(res => {
            setExp(res.data.exp);
            setSchedule(objToMap(res.data.exp.avail.schedule));
        }).catch(err => {
            dispatch(showError('We cannot update your availabilities right now.'));
            setTimeout(() => { history.push('/'); }, 4000);
        })
    }, [dispatch, expId, history]);

    const format = {weekday: 'long', month: 'long', day: 'numeric'};
    let inOneMonth = new Date();
    inOneMonth.setMonth(new Date().getMonth() + 1);
    const availTo = new Date(inOneMonth).toLocaleDateString('en-US', format);
    const availFrom = new Date().toLocaleDateString('en-US', format);

    const handleCalChange = useCallback((avail) => {
        setChanged(true);
        setSchedule(copyMap(avail));
    }, []);

    const handleSave = () => {
        axios.patch(`/api/exp/${exp._id}/schedule`, 
        {schedule: Array.from(schedule)})
        .then(res => {
            setDone(true);
        })
        .catch(err => {
            dispatch(showError("We cannot update your schedule right " + 
            'now. Try again later.'));
            setTimeout(() => { history.push('/'); }, 4000);
        });
    }

    return (
        <div className={classes.root}>
            {done? 
            <div className={classes.done}>
                <h3>We've updated your availabilities!</h3>
                <button 
                className={`${classes.button} ${classes.doneButton}`}
                onClick={() => history.push('/creator/dashboard/availabilities')}>
                    Add more time slots
                </button>
                <button 
                className={`${classes.button} ${classes.doneButton}`}
                onClick={() => history.push('/')}>
                    I'm good for now
                </button>
            </div>
            : (exp && schedule) &&
            <div className={classes.content}>
                <h1 className={classes.title}>
                    Schedule for "{exp.title}"
                </h1>
                <h2 className={`${classes.title} date`}>
                    {availFrom} - {availTo}
                </h2>
                <p className={classes.instruction}>
                    These are your current availabilities. Would you like to make
                    any changes for the next period?
                </p>
                <Tip>
                    You'll be able to add specific time slots in your
                    creator dashboard.
                </Tip>
                <div>
                    <WeeklyCalendar
                    avail={schedule}
                    duration={exp.duration}
                    onChange={handleCalChange}/>
                </div>
                <button 
                className={`${classes.button} ${classes.saveButton}`}
                onClick={handleSave}>
                    {changed? 'Save changes' : 'Keep this schedule'}
                </button>
            </div>}
        </div>
    );
}

export default ExpSchedule;