import * as types from '../actionTypes';

const initialState = {
    loading: false,
    token: null,
    data: {},
    pastExps: [],
    savedExps: []
}

const authReducer = (state = initialState, action) => {
    switch(action.type) {
        case types.AUTH_INIT: {
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
                data: { ...action.data },
            }
        }
        case types.SET_USER_EXPS: {
            return {
                ...state,
                pastExps: action.pastExps.slice(0),
                savedExps: action.savedExps.slice(0)
            }
        }
        case types.RESET_USER: {
            return { ...initialState }
        }
        default: { return state; }
    }
}

export default authReducer;