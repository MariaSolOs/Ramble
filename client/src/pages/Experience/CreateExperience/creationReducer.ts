import { useReducer, useCallback } from 'react';

import { CREATION_STEPS } from 'models/experience';
import type { CreationStep, Category } from 'models/experience';

interface CreationState {
    currentStep: CreationStep;
    currentStepIdx: number;
    stepsCompleted: number;
    canContinue: boolean;
    form: {
        isOnlineExperience?: boolean;
        location: string;
        zoomMeetingId: string;
        zoomMeetingPassword: string;
        meetingPoint: string;
        coordinates?: string[];
        title: string;
        categories: Category[];
        planning: string;
        duration: number; // In hours
        languages: string[];
        capacity: number;
        isAgeRestricted: boolean;
        ageRequired?: number; 
        images: [string, string, string, string];
        included: string[];
        toBring: string[];
        pricePerPerson: number;
        privatePrice?: number;
        currency: 'CAD' | 'USD';
    }
}

// Form fields that have a string as a value
export type StringField = 
| 'location'
| 'zoomMeetingId'
| 'zoomMeetingPassword'
| 'meetingPoint'
| 'title'
| 'planning'
| 'currency';

// Form fields that have a boolean as a value
export type BooleanField = 'isOnlineExperience' | 'isAgeRestricted';

// Form fields that have a numerical value
export type NumberField = 
| 'duration' 
| 'capacity' 
| 'ageRequired' 
| 'pricePerPerson'
| 'privatePrice';

const initialState: CreationState = {
    currentStep: 'location',
    currentStepIdx: 0,
    stepsCompleted: 0,
    canContinue: false,
    form: {
        location: '',
        meetingPoint: '',
        zoomMeetingId: '',
        zoomMeetingPassword: '',
        title: '',
        categories: [],
        planning: '',
        duration: 1,
        languages: [],
        capacity: 10,
        isAgeRestricted: false,
        images: ['', '', '', ''],
        included: [],
        toBring: [],
        pricePerPerson: 0,
        currency: 'CAD'
    }
}

type Action = 
| { type: 'GO_TO_NEXT_STEP'; }
| { type: 'GO_TO_PREV_STEP'; }
| { type: 'GO_TO_STEP'; stepIdx: number; }
| { type: 'SET_STRING_FIELD'; field: StringField; value: string; }
| { type: 'SET_BOOLEAN_FIELD'; field: BooleanField; value: boolean; }
| { type: 'SET_NUMBER_FIELD'; field: NumberField; value: number; }
| { type: 'SET_CATEGORY'; value: Category; remove: boolean; }
| { type: 'SET_LANGUAGES'; value: string[]; }
| { type: 'SET_CAN_CONTINUE'; value: boolean; }

export default function useCreationReducer() {
    const reducer = useCallback((state: CreationState, action: Action): CreationState => {
        switch (action.type) {
            case 'GO_TO_NEXT_STEP':
                const nextIdx = (state.currentStepIdx + 1) % CREATION_STEPS.length;
                return {
                    ...state,
                    currentStepIdx: nextIdx,
                    currentStep: CREATION_STEPS[nextIdx],
                    stepsCompleted: Math.max(state.stepsCompleted, nextIdx)
                }
            case 'GO_TO_PREV_STEP':
                const prevIdx = Math.max(0, state.currentStepIdx - 1);
                return {
                    ...state,
                    currentStepIdx: prevIdx,
                    currentStep: CREATION_STEPS[prevIdx]
                }
            case 'GO_TO_STEP':
                return {
                    ...state,
                    currentStepIdx: action.stepIdx,
                    currentStep: CREATION_STEPS[action.stepIdx]
                }
            case 'SET_STRING_FIELD':
            case 'SET_BOOLEAN_FIELD':
            case 'SET_NUMBER_FIELD':
                return {
                    ...state,
                    form: {
                        ...state.form,
                        [action.field]: action.value
                    }
                }
            case 'SET_CATEGORY':
                return {
                    ...state,
                    form: {
                        ...state.form,
                        categories: action.remove ? 
                            state.form.categories.filter(categ => categ !== action.value) :
                            state.form.categories.length < 2 ?
                            [ ...state.form.categories, action.value ] :
                            state.form.categories
                    }
                }
            case 'SET_LANGUAGES':
                return {
                    ...state,
                    form: {
                        ...state.form,
                        languages: action.value
                    }
                }
            case 'SET_CAN_CONTINUE':
                return {
                    ...state,
                    canContinue: action.value
                }
            default: return state;
        }
    }, []);

    return useReducer(reducer, initialState);
}