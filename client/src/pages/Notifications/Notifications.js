import React, {useCallback} from 'react';
import {useSelector} from 'react-redux';
import {useHistory} from 'react-router-dom';
import axios from '../../tokenizedAxios';

import Fab from '@material-ui/core/Fab';
import HighlightOffIcon from '@material-ui/icons/HighlightOff';
import EventBusyIcon from '@material-ui/icons/EventBusy';
import {FontAwesomeIcon} from '@fortawesome/react-fontawesome';
import {faCheckCircle} from '@fortawesome/free-solid-svg-icons/faCheckCircle';
import {faTasks} from '@fortawesome/free-solid-svg-icons/faTasks';
import {faStar} from '@fortawesome/free-regular-svg-icons/faStar';

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
            case 'Creator-ExperienceApproved': 
                return <FontAwesomeIcon icon={faCheckCircle}/>
            case 'Creator-ExperienceRejected': 
                return <FontAwesomeIcon icon={faTasks}/>
            case 'User-BookingRejected': 
                return <EventBusyIcon/>
            case 'User-ExperienceReview': 
                return <FontAwesomeIcon icon={faStar}/>
            default: 
                return <FontAwesomeIcon icon={faCheckCircle}/>
        }
    }, []); 
    
    const notifs = useSelector(state => state.user.notifs);
    const removeNotif = useCallback((notifId) => (e) => {
        e.stopPropagation();
        axios.delete(`/api/profile/notifs/${notifId}`);
    }, []);

    //For review notifs, go to the experience page and review
    const history = useHistory();

    return (
        <div className={classes.root}>
            <div className={classes.shadowSeparator}/>
            <div className="body">
                <h1 className={classes.title}>Notifications</h1>
                <ul className={classes.notifList}>
                {notifs.length > 0?
                    notifs.map(notif => {
                        const reviewNotif = notif.category === 'User-ExperienceReview';
                        const handleClick = (e) => {
                            if(reviewNotif) {
                                history.push(`/experience/review/${notif.expToReview}`);
                            }
                        }
                        return (
                            <li 
                            key={notif._id}
                            className={`${classes.notif} 
                                        ${reviewNotif && 'link-notif'}`}
                            onClick={handleClick}>
                                <Fab classes={{root: classes.notifIcon}}
                                disableRipple>
                                    {getNotifIcon(notif)}
                                </Fab>
                                {notif.message}
                                <HighlightOffIcon 
                                classes={{root: classes.deleteIcon}}
                                onClick={removeNotif(notif._id)}/>
                            </li>
                        );
                    }) : 
                    <h3 className={classes.title}>
                        You're up to date!
                    </h3>}
                </ul>
            </div>
        </div>
    );
}

export default Notifications;