import { useReducer, useCallback } from 'react';

// Action types
const TOGGLE_SIGNUP_DIALOG = 'TOGGLE_SIGNUP_DIALOG';
const TOGGLE_LOGIN_DIALOG = 'TOGGLE_LOGIN_DIALOG';
const TOGGLE_EMAIL_DIALOG = 'TOGGLE_EMAIL_DIALOG';
const TOGGLE_FORGOT_PWD_DIALOG = 'TOGGLE_FORGOT_PWD_DIALOG';

const initialState = {
    showSignUpDialog: false,
    showEmailDialog: false,
    showLogInDialog: false,
    showForgotPwdDialog: false
}
    
const reducer = (state, action) => {
    switch(action.type) {
        case TOGGLE_SIGNUP_DIALOG:
            return {
                ...state,
                showSignUpDialog: action.show,
                showEmailDialog: action.show? false : state.showEmailDialog,
                showLogInDialog: action.show? false : state.showLogInDialog,
                showForgotPwdDialog: action.show? false : state.showForgotPwdDialog
            }
        case TOGGLE_LOGIN_DIALOG:
            return {
                ...state,
                showLogInDialog: action.show,
                showSignUpDialog: action.show? false : state.showSignUpDialog,
                showEmailDialog: action.show? false : state.showEmailDialog,
                showForgotPwdDialog: action.show? false : state.showForgotPwdDialog
            }
        case TOGGLE_EMAIL_DIALOG:
            return {
                ...state,
                showEmailDialog: action.show,
                showSignUpDialog: action.show? false : state.showSignUpDialog,
                showLogInDialog: action.show? false : state.showLogInDialog,
                showForgotPwdDialog: action.show? false : state.showForgotPwdDialog
            }
        case TOGGLE_FORGOT_PWD_DIALOG:
            return {
                ...state,
                showForgotPwdDialog: action.show,
                showSignUpDialog: action.show? false : state.showSignUpDialog,
                showEmailDialog: action.show? false : state.showEmailDialog,
                showLogInDialog: action.show? false : state.showLogInDialog
            }
        default: { return state; }
    }
}

const mapDispatch = (dispatch) => ({
    openSignUpDialog: () => dispatch({type: TOGGLE_SIGNUP_DIALOG, show: true}),    
    openEmailDialog: () => dispatch({type: TOGGLE_EMAIL_DIALOG, show: true}),
    openLogInDialog: () => dispatch({type: TOGGLE_LOGIN_DIALOG, show: true}),
    closeSignUpDialog: () => dispatch({type: TOGGLE_SIGNUP_DIALOG, show: false}),
    closeEmailDialog: () => dispatch({type: TOGGLE_EMAIL_DIALOG, show: false}),
    closeLogInDialog: () => dispatch({type: TOGGLE_LOGIN_DIALOG, show: false}),
    openForgotPwdDialog: () => dispatch({type: TOGGLE_FORGOT_PWD_DIALOG, show: true}),
    closeForgotPwdDialog: () => dispatch({type: TOGGLE_FORGOT_PWD_DIALOG, show: false})
});

export default function useAuthDialogReducer() {
    const [state, dispatch] = useReducer(reducer, initialState);
    const actions = useCallback(mapDispatch(dispatch), []);
    return [state, actions];
}