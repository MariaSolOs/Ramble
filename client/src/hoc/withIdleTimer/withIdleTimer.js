import React, {useState, useRef} from 'react';
import {useDispatch} from 'react-redux';
import {logout} from '../../store/actions/user';
import IdleTimer from 'react-idle-timer';

import IdleModal from './IdleModal';

const withIdleTimer = (App) => (props) => {
    //Only used when the user is logged in
    if(!props.isAuth) { return <App {...props}/>; }

    //Manage idle modal
    const [showModal, setShowModal] = useState(false);
    const handleClose = () => { setShowModal(false); }

    const [isTimedOut, setIsTimedOut] = useState(false);
    const idleTimer = useRef();
    //For logging out idle user
    const dispatch = useDispatch();

    //Function to call on user action
    const onAction = (e) => { 
        setIsTimedOut(false); 
        setShowModal(false);
    }

    const onIdle = (e) => {
        if(!isTimedOut) {
            idleTimer.current.reset();
            setIsTimedOut(true);
        } else {
            setShowModal(true);
            //Wait 1 minute
            setTimeout(() => {
                //If still idle, logout
                if(idleTimer.current.isIdle()) {
                    idleTimer.current.reset();
                    dispatch(logout());
                }
            }, 60 * 1000);
        }
    }

    return (
        <>
            <IdleTimer
            ref={idleTimer}
            element={document}
            onIdle={onIdle}
            onAction={onAction}
            debounce={250}
            timeout={1000 * 60 * 10}/>
            <IdleModal
            open={showModal}
            handleClose={handleClose}/>
            <App {...props}/>
        </>
    );
}

export default withIdleTimer;