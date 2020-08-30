import React, {useState, useEffect} from 'react';
import {useDispatch} from 'react-redux';
import {showError} from '../../../../store/actions/ui';
import {useHistory, useParams} from 'react-router-dom';
import axios from '../../../../tokenizedAxios';

import WeeklyCalendar from '../../../../components/WeeklyCalendar/WeeklyCalendar';

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

//TODO: Finish this
const ExpSchedule = (props) => {
    const classes = useStyles();

    const dispatch = useDispatch();
    const history = useHistory();
    const {id} = useParams();

    //Fetch experience and set schedule
    const [exp, setExp] = useState(null);
    const [schedule, setSchedule] = useState(null);
    useEffect(() => {
        axios.get(`/api/exp/${id}`)
        .then(res => {
            console.log(res.data)
            setExp(res.data.exp);
            setSchedule(objToMap(res.data.exp.avail.schedule));
        }).catch(err => {
            dispatch(showError('We cannot update your availabilities right now.'));
            setTimeout(() => { history.push('/'); }, 4000);
        })
    }, [dispatch, id, history]);

    const handleCalChange = () => {

    }

    return (
        <div className={classes.root}>
            {(exp && schedule) &&
            <WeeklyCalendar
            avail={schedule}
            duration={exp.duration}
            onChange={handleCalChange}/>}
        </div>
    );
}

export default ExpSchedule;