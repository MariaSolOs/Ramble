import React from 'react';
import {useSelector} from 'react-redux';

import {makeStyles} from '@material-ui/core/styles';
const useStyles = makeStyles(() => ({

}));

const Notifications = (props) => {
    const classes = useStyles();

    const notifs = useSelector(state => state.user.notifications);
    return (
        <ul>
            {notifs.map(notif => (
                <li key={notif._id}>
                    {notif.message}
                </li>
            ))}
        </ul>
    );
}

export default Notifications;