import { useReducer, useCallback } from 'react';
import type { EventInput } from '@fullcalendar/react';
import { DateTime } from 'luxon';

import type { 
    ExperienceViewFragment as ExperienceData,
    GetOccurrencesQuery as OccurrencesData
} from 'graphql-api';
import { Experience } from 'models/experience';
import type { BookingType, Fees } from 'models/experience-occurrence';
import type { Creator } from 'models/creator';
import { TIMEZONE_CONFIG } from 'models/experience-occurrence';

interface BookingState {
    step: BookingStep;
    experience?: Experience;
    creator?: Creator;
    occurrences: Map<string, Occurrence[]>;
    canContinue: boolean;
    loading: boolean;
    form: {
        date?: string;
        timeslot?: Occurrence;
        bookingType?: BookingType;
        numGuests: number;
        zipCode: string;
        email: string; // Email address to send the receipt to
        fees: Fees;
    }
}

const BOOKING_STEPS = [
    'date',
    'time',
    'bookingType',
    'payment'
] as const;
export type BookingStep = typeof BOOKING_STEPS[number];

export type Occurrence = EventInput & {
    dateStart: DateTime;
    dateEnd: DateTime;
    spotsLeft: number;
}

type Action = 
| { type: 'SET_EXPERIENCE'; experienceData: ExperienceData; }
| { type: 'SET_OCCURRENCES'; occurrences: OccurrencesData; }
| { type: 'SET_DATE'; date: string; }
| { type: 'SET_TIMESLOT'; timeslot: Occurrence; }
| { type: 'SET_BOOKING_TYPE'; bookingType: BookingType; }
| { type: 'SET_NUM_GUESTS'; numGuests: number; }
| { type: 'SET_ZIP_CODE'; zipCode: string; }
| { type: 'SET_EMAIL'; email: string; }
| { type: 'SET_FEES'; fees: Fees; }
| { type: 'SET_CAN_CONTINUE'; value: boolean; }
| { type: 'INIT_SUBMIT'; }
| { type: 'GO_BACK'; }
| { type: 'GO_TO_NEXT_STEP' }

const initialState: BookingState = {
    step: 'date',
    occurrences: new Map(),
    canContinue: false,
    loading: false,
    form: {
        numGuests: 2,
        zipCode: '',
        email: '',
        fees: {
            subTotalString: '',
            serviceFee: 0,
            withServiceFee: 0,
            taxGST: 0,
            taxQST: 0,
            totalPrice: 0
        }
    }
}

export default function useBookingReducer() {
    const reducer = useCallback((state: BookingState, action: Action): BookingState => {
        switch (action.type) {
            case 'SET_EXPERIENCE':
                const { creator, ...experienceInfo } = action.experienceData;
                return {
                    ...state,
                    experience: new Experience(experienceInfo),
                    creator: {
                        name: creator.user.firstName,
                        photo: creator.user.photo!,
                        bio: creator.bio
                    }
                }
            case 'SET_OCCURRENCES':
                const occurrences = new Map<string, Occurrence[]>();
                for (const occ of action.occurrences.occurrences) {
                    const start = DateTime.fromISO(occ.dateStart, TIMEZONE_CONFIG);
                    const end = DateTime.fromISO(occ.dateEnd, TIMEZONE_CONFIG);
                    const dateKey = start.toISODate();
                    const value: Occurrence = { 
                        id: occ._id, 
                        start: start.toISO(), 
                        end: end.toISO(),
                        dateStart: start,
                        dateEnd: end,
                        spotsLeft: occ.spotsLeft
                    }
                    
                    if (occurrences.has(dateKey)) {
                        occurrences.get(dateKey)!.push(value);
                    } else {
                        occurrences.set(dateKey, [value]);
                    }
                }

                // Sort the occurrences chronologically 
                for (const [, occList] of occurrences) {
                    occList.sort((occ1, occ2) => 
                        +occ1.dateStart - +occ2.dateStart
                    );
                }

                return {
                    ...state,
                    occurrences
                }
            case 'SET_DATE':
                return {
                    ...state,
                    form: {
                        ...state.form,
                        date: action.date,
                        timeslot: undefined,
                        bookingType: undefined
                    }
                }
            case 'SET_TIMESLOT':
                return {
                    ...state,
                    form: {
                        ...state.form,
                        timeslot: action.timeslot,
                        bookingType: undefined
                    }
                }
            case 'SET_BOOKING_TYPE':
                return {
                    ...state,
                    form: {
                        ...state.form,
                        bookingType: action.bookingType
                    }
                }
            case 'SET_NUM_GUESTS':
                return {
                    ...state,
                    form: {
                        ...state.form,
                        numGuests: action.numGuests,
                        bookingType: 'public'
                    }
                }
            case 'SET_EMAIL':
                return {
                    ...state,
                    form: {
                        ...state.form,
                        email: action.email
                    }
                }
            case 'SET_ZIP_CODE': 
                return {
                    ...state,
                    form: {
                        ...state.form,
                        zipCode: action.zipCode
                    }
                }
            case 'SET_FEES': 
                return {
                    ...state,
                    form: {
                        ...state.form,
                        fees: action.fees
                    }
                }
            case 'SET_CAN_CONTINUE':
                return {
                    ...state,
                    canContinue: action.value
                }
            case 'INIT_SUBMIT':
                return {
                    ...state,
                    loading: true
                }
            case 'GO_BACK': 
                const currentIdx = BOOKING_STEPS.indexOf(state.step);
                return {
                    ...state,
                    step: BOOKING_STEPS[Math.max(0, currentIdx - 1)]
                }
            case 'GO_TO_NEXT_STEP': 
                const nextIdx = BOOKING_STEPS.indexOf(state.step) + 1;
                return {
                    ...state,
                    step: BOOKING_STEPS[Math.min(BOOKING_STEPS.length - 1, nextIdx)]
                }
            default: return state;
        }
    }, []);

    return useReducer(reducer, initialState);
}