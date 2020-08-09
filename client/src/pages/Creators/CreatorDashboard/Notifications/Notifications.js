import React from 'react';
import {useSelector} from 'react-redux';

import Fab from '@material-ui/core/Fab';

import {makeStyles} from '@material-ui/core/styles';
const useStyles = makeStyles(() => ({
    notifList: {
        listStyle: 'none',
        padding: 0
    },
    notif: {
        fontFamily: 'Helvetica, sans-serif',
        fontWeight: 'bold',
        letterSpacing: '-0.05rem',
        color: '#ECEBE5',
        fontSize: '1.15rem',
        lineHeight: 2,
        marginBottom: '1rem'
    },
    notifIcon: {
        fontWeight: 'bold',
        marginRight: '1rem'
    }
}));

const timeRegex = /((1[0-2]|[1-9])(:30)?([AP][M]))/g;

const Notifications = (props) => {
    const classes = useStyles();

    const notifs = useSelector(state => state.user.notifications);

    const getNotifIcon = (notif) => {
        switch(notif.category) {
            case 'Creator-ExperienceReminder':
                const time = notif.message.match(timeRegex)[0];
                console.log(time);
                return time;
            //default: ;
        }
    }

    return (
        <ul className={classes.notifList}>
            {notifs.map(notif =>     (
                <li 
                key={notif._id}
                className={classes.notif}>
                    <Fab classes={{ root: classes.notifIcon }}>
                        {getNotifIcon(notif)}
                    </Fab>
                    {notif.message}
                </li>
            ))}
        </ul>
    );
}

export default Notifications;