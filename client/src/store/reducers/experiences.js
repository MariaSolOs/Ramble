import {experienceTypes as types} from '../actionTypes';

const initialState = {
    locations: null,
    pastExps: null,
    savedExps: null
}

const authReducer = (state = initialState, action) => {
    switch(action.type) {
        case types.SET_LOCATIONS: {
            return {
                ...state,
                locations: action.locations.slice(0)
            }
        }
        case types.SET_EXPS: {
            return {
                ...state,
                pastExps: action.pastExps.slice(0),
                savedExps: action.savedExps.slice(0)
            }
        }
        case types.SAVE_EXP: {
            return {
                ...state,
                savedExps: [...state.savedExps, action.exp]
            }
        }
        case types.UNSAVE_EXP: {
            const newExps = state.savedExps.filter(exp => 
                                exp._id !== action.expId
                            );
            return {
                ...state,
                savedExps: newExps
            }
        }
        default: { return state; }
    }
}

export default authReducer;