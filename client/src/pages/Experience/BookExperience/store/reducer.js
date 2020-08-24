import {useReducer, useCallback} from 'react';
import {steps, actions} from './types';

const initialState = {
    form: {
        date: null,
        timeslot: null,
        spotsLeft: null,
        bookType: null,
        numGuests: null,
        email: '',
        rememberCard: false,
        cardToUse: null,
        promoCode: ''
    },
    step: steps.CALENDAR,
    slotsInfo: [],
    payDone: false,
    payProcessing: false,
    payMsg: ''
}

export default function useBookingReducer() {
    const reducer = useCallback((state, action) => {
        switch(action.type) {
            case actions.SET_STEP:
                return {
                    ...state,
                    step: action.step
                }
            case actions.SET_SLOTS_INFO:
                return {
                    ...state,
                    slotsInfo: action.slotsInfo.slice(0)
                }
            case actions.ADD_INPUT: 
                return {
                    ...state,
                    form: {
                        ...state.form,
                        [action.name]: action.value
                    }
                }
            case actions.PAY_INIT:
                return {
                    ...state,
                    payDone: false,
                    payProcessing: true,
                    payMsg: 'Processing your payment...'
                }
            default: { return state; } 
        }
    }, []);

    return useReducer(reducer, initialState);
}