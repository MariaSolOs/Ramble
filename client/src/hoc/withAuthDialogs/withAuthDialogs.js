import React, {useReducer} from 'react';
import {useSelector} from 'react-redux';
import {useLocation} from 'react-router-dom';

import SignUpDialog from './Dialogs/SignUpDialog';
import SignUpWithEmailDialog from './Dialogs/SignUpWithEmailDialog';
import LogInDialog from './Dialogs/LogInDialog';

const initialState = {
    showSignUpDialog: false,
    showEmailDialog: false,
    showLogInDialog: false,
}
    
const reducer = (state, action) => {
    switch(action.type) {
        case 'TOGGLE_SIGNUP_DIALOG':
            return {
                ...state,
                showSignUpDialog: action.show,
                showEmailDialog: action.show? false : state.showEmailDialog,
                showLogInDialog: action.show? false : state.showLogInDialog
            }
        case 'TOGGLE_LOGIN_DIALOG':
            return {
                ...state,
                showLogInDialog: action.show,
                showSignUpDialog: action.show? false : state.showSignUpDialog,
                showEmailDialog: action.show? false : state.showEmailDialog
            }
        case 'TOGGLE_EMAIL_DIALOG':
            return {
                ...state,
                showEmailDialog: action.show,
                showSignUpDialog: action.show? false : state.showSignUpDialog,
                showLogInDialog: action.show? false : state.showLogInDialog
            }
        default: { return state; }
    }
}

const mapDispatch = (dispatch) => ({
    openSignUpDialog: () => dispatch({type: 'TOGGLE_SIGNUP_DIALOG', show: true}),    
    openEmailDialog: () => dispatch({type: 'TOGGLE_EMAIL_DIALOG', show: true}),
    openLogInDialog: () => dispatch({type: 'TOGGLE_LOGIN_DIALOG', show: true}),
    closeSignUpDialog: () => dispatch({type: 'TOGGLE_SIGNUP_DIALOG', show: false}),
    closeEmailDialog: () => dispatch({type: 'TOGGLE_EMAIL_DIALOG', show: false}),
    closeLogInDialog: () => dispatch({type: 'TOGGLE_LOGIN_DIALOG', show: false}),
});

const withAuthDialogs = (Component) => (props) => {
    const isAuth = useSelector(state => state.user.data.id !== null);

    const [state, dispatch] = useReducer(reducer, initialState);
    const actions = mapDispatch(dispatch);

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