import React, {useCallback} from 'react';
import {useSelector} from 'react-redux';
import axios from '../../tokenizedAxios';

import Fab from '@material-ui/core/Fab';
import CheckIcon from '@material-ui/icons/Check';
import HighlightOffIcon from '@material-ui/icons/HighlightOff';
import EventBusyIcon from '@material-ui/icons/EventBusy';

import {makeStyles} from '@material-ui/core/styles';
import styles from './NotificationsStyles';
const useStyles = makeStyles(styles);

const timeRegex = /((1[0-2]|[1-9])(:30)?([AP][M]))/g;

const Notifications = (props) => {
    const classes = useStyles();

    const getNotifIcon = useCallback((notif) => {
        switch(notif.category) {
            case 'Creator-ExperienceReminder':
                const time = notif.message.match(timeRegex)[0];
                return time.slice(0, -2);
            case 'Creator-ExperienceDecision': 
                return <CheckIcon fontSize="large"/>
            case 'User-BookingRejected': 
                return <EventBusyIcon fontSize="large"/>
            default: 
                return <CheckIcon fontSize="large"/>
        }
    }, []); 
    
    const notifs = useSelector(state => state.user.notifs);
    const deleteNotif = useCallback((notifId) => (e) => {
        axios.delete(`/api/profile/notifs/${notifId}`);
    }, []);

    return (
        <div className={classes.root}>
            <div className={classes.shadowSeparator}/>
            <ul className={classes.notifList}>
            {notifs.map(notif => (
                <li 
                key={notif._id}
                className={classes.notif}>
                    <Fab classes={{root: classes.notifIcon}}
                    disableRipple>
                        {getNotifIcon(notif)}
                    </Fab>
                    {notif.message}
                    <HighlightOffIcon 
                    classes={{root: classes.deleteIcon}}
                    onClick={deleteNotif(notif._id)}/>
                </li>
            ))}
            </ul>
        </div>
    );
}

export default Notifications;