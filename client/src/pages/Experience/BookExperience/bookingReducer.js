import {useReducer, useCallback} from 'react';
import * as steps from './steps';

//Actions
const SET_STEP = 'SET_STEP';
const SET_SLOTS_INFO = 'SET_SLOTS_INFO';
const PAY_INIT = 'PAY_INIT';
const PAY_PROCESSING = 'PAY_PROCESSING';
const PAY_COMPLETE = 'PAY_COMPLETE';

const initialState = {
    step: steps.CALENDAR,
    slotsInfo: [],
    payDone: false,
    payProcessing: false,
    payMsg: '',
}
const reducer = (state, action) => {
    switch(action.type) {
        case SET_STEP:
            return {
                ...state,
                step: action.step
            }
        case PAY_INIT:
            return {
                ...state,
                payDone: false,
                payProcessing: true,
                payMsg: 'Processing your payment...'
            }
        case PAY_COMPLETE: 
            return {
                ...state,
                payDone: true,
                payProcessing: false,
                payMsg: action.msg
            }
        case SET_SLOTS_INFO:
            return {
                ...state,
                slotsInfo: action.slotsInfo.slice(0)
            }
        default: { return state; } 
    }
}

const mapDispatch = (dispatch) => ({
    setStep: (step) => () => dispatch({type: SET_STEP, step}),
    setSlotsInfo: (slotsInfo) => dispatch({type: SET_SLOTS_INFO, slotsInfo}),
    payInit: () => dispatch({type: PAY_INIT}),
    payProcessing: () => dispatch({type: PAY_PROCESSING}),
    payComplete: (msg) => dispatch({type: PAY_COMPLETE, msg})
});

export default function useBookingReducer() {
    //console.log('heee')
    const [state, dispatch] = useReducer(reducer, initialState);
    const actions = useCallback(mapDispatch(dispatch), []);
    return [state, actions];
}