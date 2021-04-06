import React from 'react';
import { useSelector } from 'react-redux';
import { useLocation } from 'react-router-dom';
import useAuthDialogReducer from './reducer';

import SignUpDialog from '../../components/Dialogs/AuthDialogs/SignUpDialog';
import SignUpWithEmailDialog from '../../components/Dialogs/AuthDialogs/SignUpWithEmailDialog';
import LogInDialog from '../../components/Dialogs/AuthDialogs/LogInDialog';
import ForgotPwdDialog from '../../components/Dialogs/AuthDialogs/ForgotPwdDialog';

const withAuthDialogs = (Component) => (props) => {
    const isAuth = useSelector(state => state.user.profile.id !== null);
    const lang = useSelector(state => state.ui.language);

    const [state, actions] = useAuthDialogReducer();

    // To remember in which page we were when the user authenticates
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
                currentRoute={pathname}
                lang={lang}/>
                <SignUpWithEmailDialog
                open={state.showEmailDialog}
                onClose={actions.closeEmailDialog} 
                switchToLogin={actions.openLogInDialog}
                currentRoute={pathname}
                lang={lang}/>
                <LogInDialog 
                open={state.showLogInDialog} 
                onClose={actions.closeLogInDialog}
                openForgotPwdDialog={actions.openForgotPwdDialog}
                currentRoute={pathname}
                lang={lang}/>
                <ForgotPwdDialog
                open={state.showForgotPwdDialog}
                onClose={actions.closeForgotPwdDialog}
                lang={lang}/>
                <Component {...props} dialogActions={actions}/>
            </>}
        </>
    );
}

export default withAuthDialogs;