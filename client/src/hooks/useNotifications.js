import {useEffect} from 'react';
import socketIOClient from 'socket.io-client';
import {useDispatch, useSelector} from 'react-redux';
import {deleteNotif, addNotif} from '../store/actions/user';

export default function useNotifications() {
    const userId = useSelector(state => state.user.profile.id);
    const dispatch = useDispatch();

    useEffect(() => {
        const token = window.localStorage.getItem('token');
        if(!token) { return; }
        const socket = socketIOClient(process.env.REACT_APP_SERVER, 
                       {path: '/ramble/socket.io', query: {token}});
        socket.on('notifAdded', (newNotif) => {
            if(userId === newNotif.user) {
                dispatch(addNotif(newNotif));
            }
        });
        socket.on('notifDeleted', (notifId) => {
            dispatch(deleteNotif(notifId));
        });
        return () => { socket.disconnect(); }
    }, [dispatch, userId]);
}
