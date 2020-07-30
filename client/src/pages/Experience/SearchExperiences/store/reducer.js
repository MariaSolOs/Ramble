import {useReducer, useCallback} from 'react';
import * as types from './actionTypes';

const initialState = {
    location: '', //User's requested location
    numPeople: 0, //User's requested number of people
    experiences: [], //Experiences satisfying the above,
    expsByTitle: [] //Filter by title
}

export default function useSearchReducer() {
    const reducer = useCallback((state = initialState, action) => {
        switch(action.type) {
            case types.SET_QUERY: 
                return {
                    ...state,
                    location: action.location,
                    numPeople: action.numPeople
                }
            case types.SET_EXPERIENCES: 
                return {
                    ...state,
                    experiences: action.experiences.slice(0),
                    expsByTitle: action.experiences.slice(0)
                }
            case types.SET_EXPS_BY_TITLE: {
                return {
                    ...state,
                    expsByTitle: action.experiences.slice(0)
                }
            }
            default: { return state; }
        }
    }, []);

    return useReducer(reducer, initialState);
}
