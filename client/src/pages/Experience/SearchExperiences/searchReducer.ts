import { useCallback, useReducer } from 'react';

import { Experience } from '../../../models/experience';

export interface SearchState {
    location: string;
    capacity: number;
    titleFilter: string;
    allExperiences: Experience[];
    filteredExperiences: Experience[];
}

type Action = 
| { type: 'SET_EXPERIENCES', experiences: Experience[] }
| { type: 'UPDATE_LOCATION', location: string; }
| { type: 'UPDATE_CAPACITY', capacity: number }

export default function useSearchReducer(initialState: SearchState) {
    const reducer = useCallback((state: SearchState, action: Action): SearchState => {
        switch (action.type) {
            case 'SET_EXPERIENCES': 
                return {
                    ...state,
                    allExperiences: action.experiences
                }
            case 'UPDATE_LOCATION': 
                return {
                    ...state,
                    location: action.location
                }
            case 'UPDATE_CAPACITY': 
                return {
                    ...state,
                    capacity: action.capacity
                }
            default: return state;
        }
    }, []);

    return useReducer(reducer, initialState);
}
