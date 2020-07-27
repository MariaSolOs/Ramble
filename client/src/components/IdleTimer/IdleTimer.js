import React, {useState, useRef} from 'react';
import {useDispatch} from 'react-redux';
import {logout} from '../../store/actions/user';
import ReactIdleTimer from 'react-idle-timer';

import IdleDialog from './IdleDialog';

const IdleTimer = (props) => {
    //Manage idle modal
    const [showDialog, setShowDialog] = useState(false);
    const handleClose = () => { setShowDialog(false); }

    const [isTimedOut, setIsTimedOut] = useState(false);
    const idleTimer = useRef();
    //For logging out idle user
    const dispatch = useDispatch();

    //Function to call on user action
    const onAction = (e) => { 
        setIsTimedOut(false); 
        setShowDialog(false);
    }

    const onIdle = (e) => {
        if(!isTimedOut) {
            idleTimer.current.reset();
            setIsTimedOut(true);
        } else {
            setShowDialog(true);
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
            <ReactIdleTimer
            ref={idleTimer}
            element={document}
            onIdle={onIdle}
            onAction={onAction}
            debounce={250}
            timeout={1000 * 60 * 10}/>
            <IdleDialog
            open={showDialog}
            handleClose={handleClose}/>
        </>
    );
}

export default IdleTimer;