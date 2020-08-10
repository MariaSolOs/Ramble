import React, {useCallback} from 'react';
import {connect} from 'react-redux';
import {deleteNotification} from '../../store/actions/user';

import Fab from '@material-ui/core/Fab';
import CheckIcon from '@material-ui/icons/Check';
import HighlightOffIcon from '@material-ui/icons/HighlightOff';

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
            default: 
                return <CheckIcon fontSize="large"/>
        }
    }, []);   

    return (
        <div className={classes.root}>
            <div className={classes.shadowSeparator}/>
            <ul className={classes.notifList}>
            {props.notifs.map(notif => (
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
                    onClick={props.deleteNotif(notif._id)}/>
                </li>
            ))}
            </ul>
        </div>
    );
}

const mapStateToProps = (state) => ({
    notifs: state.user.notifs
});
const mapDispatchToProps = (dispatch) => ({
    deleteNotif: (notifId) => (e) => dispatch(deleteNotification(notifId))
});

export default connect(mapStateToProps, mapDispatchToProps)(Notifications);