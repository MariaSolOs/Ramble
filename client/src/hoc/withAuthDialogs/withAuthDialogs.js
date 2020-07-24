import React from 'react';
import {useSelector} from 'react-redux';
import {useLocation} from 'react-router-dom';
import useAuthDialogReducer from './authDialogReducer';

import SignUpDialog from './Dialogs/SignUpDialog';
import SignUpWithEmailDialog from './Dialogs/SignUpWithEmailDialog';
import LogInDialog from './Dialogs/LogInDialog';

const withAuthDialogs = (Component) => (props) => {
    const isAuth = useSelector(state => state.user.data.id !== null);

    const [state, actions] = useAuthDialogReducer();

    /*To remember in which page we were when the user 
    authenticates with Facebook/Google*/
    const {pathname} = useLocation();
    return (
        <>
            {isAuth ? <Component {...props}/> : 
            <>
                <SignUpDialog 
                open={state.showSignUpDialog} 
                onClose={actions.closeSignUpDialog}
                switchToLogin={actions.openLogInDialog}
                openEmailDialog={actions.openEmailDialog}
                currentRoute={pathname}/>
                <SignUpWithEmailDialog
                open={state.showEmailDialog}
                onClose={actions.closeEmailDialog} 
                switchToLogin={actions.openLogInDialog}/>
                <LogInDialog 
                open={state.showLogInDialog} 
                onClose={actions.closeLogInDialog}
                currentRoute={pathname}/>
                <Component {...props} dialogActions={actions}/>
            </>}
        </>
    );
}

export default withAuthDialogs;