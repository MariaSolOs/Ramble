import {useReducer, useCallback} from 'react';
import {actions} from './types';

const initialState = {
    bookingRequests: null,
    createdExps: null,
    editExp: null,
    editDate: ''
}

export default function useDashboardReducer() {
    const reducer = useCallback((state, action) => {
        switch(action.type) {
            case actions.SET_BOOKING_REQUESTS:
                return {
                    ...state,
                    bookingRequests: action.requests.slice(0)
                }
            case actions.DELETE_BOOKING_REQUEST: 
                return {
                    ...state,
                    bookingRequests: state.bookingRequests.filter(req => 
                                        req._id !== action.id
                                    )
                }
            case actions.SET_CREATED_EXPS:
                return {
                    ...state,
                    createdExps: action.exps.slice(0)
                }
            case actions.SET_EDITING_EXP: 
                return {
                    ...state,
                    editExp: action.exp,
                    editDate: action.date
                }
            case actions.CHANGE_EDIT_EXP: 
                return {
                    ...state,
                    editExp: action.exp
                }
            case actions.CHANGE_EDIT_DATE: 
                return {
                    ...state,
                    editDate: action.date
                }
            default: { return state; } 
        }
    }, []);

    return useReducer(reducer, initialState);
}