import React, {useCallback} from 'react';
import {useSelector} from 'react-redux';
import axios from '../../tokenizedAxios';

import Fab from '@material-ui/core/Fab';
import HighlightOffIcon from '@material-ui/icons/HighlightOff';
import EventBusyIcon from '@material-ui/icons/EventBusy';
import {FontAwesomeIcon} from '@fortawesome/react-fontawesome';
import {faCheckCircle} from '@fortawesome/free-solid-svg-icons/faCheckCircle';

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
                return <FontAwesomeIcon icon={faCheckCircle}/>
            case 'User-BookingRejected': 
                return <EventBusyIcon/>
            default: 
                return <FontAwesomeIcon icon={faCheckCircle}/>
        }
    }, []); 
    
    const notifs = useSelector(state => state.user.notifs);
    const removeNotif = useCallback((notifId) => (e) => {
        axios.delete(`/api/profile/notifs/${notifId}`);
    }, []);

    return (
        <div className={classes.root}>
            <div className={classes.shadowSeparator}/>
            <div className="body">
                <h1 className={classes.title}>Notifications</h1>
                <ul className={classes.notifList}>
                {notifs.length > 0?
                    notifs.map(notif => (
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
                            onClick={removeNotif(notif._id)}/>
                        </li>
                    )) : 
                    <h3 className={classes.title}>
                        You're up to date!
                    </h3>}
                </ul>
            </div>
        </div>
    );
}

export default Notifications;