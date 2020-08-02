import {uiTypes as types} from '../actionTypes';

const initialState = {
    loading: false,
    message: '',
    component: ''
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
                component: 'ErrorDialog'
            }
        }
        case types.SHOW_SNACKBAR: {
            return {
                ...state,
                loading: false,
                message: action.message,
                component: 'Snackbar'
            }
        }
        case types.MESSAGE_SHOWN: {
            return {
                ...state,
                message: '',
                component: ''
            }
        }
        default: { return state; }
    }
}

export default uiReducer;