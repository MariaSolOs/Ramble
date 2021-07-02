import { useReducer, useCallback } from 'react';

interface BookingState {
    step: BookingStep;
}

export type BookingStep = 'dateAndTime' | 'bookingType' | 'payment';

type Action = 
| { type: 'SET_STEP'; step: BookingStep; }

const initialState: BookingState = {
    step: 'dateAndTime'
}

export default function useBookingReducer() {
    const reducer = useCallback((state: BookingState, action: Action): BookingState => {
        switch (action.type) {
            case 'SET_STEP':
                return {
                    ...state,
                    step: action.step
                }
            default: return state;
        }
    }, []);

    return useReducer(reducer, initialState);
}