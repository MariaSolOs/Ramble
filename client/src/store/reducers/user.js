import {userTypes as types} from '../actionTypes';

const initialState = {
    loading: false,
    message: '',
    token: null,
    userData: {},
    creatorData: {},
    pastExps: [],
    savedExps: []
}

const authReducer = (state = initialState, action) => {
    switch(action.type) {
        case types.LOAD_PROFILE: {
            return {
                ...initialState,
                loading: true
            }
        }
        case types.SET_USER_DATA: {
            return {
                ...state,
                loading: false,
                token: action.token,
                userData: { ...action.data },
            }
        }
        case types.SET_CREATOR_DATA: {
            return {
                ...state,
                creatorData: { ...action.data },
            }
        }
        case types.SET_USER_EXPS: {
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
        case types.SET_MSG: {
            return {
                ...state,
                message: action.message
            }
        }
        case types.RESET_USER: {
            return { ...initialState }
        }
        default: { return state; }
    }
}

export default authReducer;