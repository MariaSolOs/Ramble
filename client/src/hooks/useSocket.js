import {useEffect} from 'react';
import socketIOClient from 'socket.io-client';
import {useDispatch, useSelector} from 'react-redux';
import {deleteNotif, addNotif, setNumBookings} from '../store/actions/user';

export default function useSocket() {
    const userId = useSelector(state => state.user.profile.id);

    const creatorId = useSelector(state => state.user.creator.id);

    const dispatch = useDispatch();

    useEffect(() => {
        //Initialize socket
        const token = window.localStorage.getItem('token');
        if(!token) { return; }
        const socket = socketIOClient(process.env.REACT_APP_SERVER, 
                       {path: '/ramble/socket.io', query: {token}});

        //Notifications               
        socket.on('notifAdded', (newNotif) => {
            if(userId === newNotif.user) {
                dispatch(addNotif(newNotif));
            }
        });
        socket.on('notifDeleted', (notifId) => {
            dispatch(deleteNotif(notifId));
        });

        //Bookings
        socket.on('bookingAdded', (affectedCreator) => {
            if(affectedCreator === creatorId) {
                dispatch(setNumBookings('inc'));
            }
        });
        
        return () => { socket.disconnect(); }
    }, [userId, creatorId, dispatch]);
}