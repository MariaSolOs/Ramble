import { uiTypes as types } from '../actionTypes';

const initialState = {
    loading: false,
    message: '',
    messageComponent: '',
    language: 'en'
}

const uiReducer = (state = initialState, action) => {
    switch(action.type) {
        case types.START_LOADING: {
            return {
                ...state,
                loading: true
            }
        }
        case types.END_LOADING: {
            return {
                ...state,
                loading: false
            }
        }
        case types.SHOW_ERROR: {
            return {
                ...state,
                loading: false,
                message: action.message,
                messageComponent: 'ErrorDialog'
            }
        }
        case types.SHOW_SNACKBAR: {
            return {
                ...state,
                loading: false,
                message: action.message,
                messageComponent: 'Snackbar'
            }
        }
        case types.MESSAGE_SHOWN: {
            return {
                ...state,
                message: '',
                messageComponent: ''
            }
        }
        case types.SET_LANGUAGE: {
            return {
                ...state,
                language: action.language
            }
        }
        default: { return state; }
    }
}

export default uiReducer;