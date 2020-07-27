import * as types from '../actionTypes';

const initialState = {
    data: {
        token: null,
        fstName: '',
        lstName: '',
        photo: '',
        city: '',
        email: '',
        phoneNumber: '',
        birthday: ''
    },
    pastExps: [],
    savedExps: [],
}

const authReducer = (state = initialState, action) => {
    switch(action.type) {
        case types.SET_PROFILE: {
            return {
                ...state,
                data: { ...action.userData },
            }
        }
        case types.SET_USER_EXPS: {
            return {
                ...state,
                pastExps: action.pastExps.slice(0),
                savedExps: action.savedExps.slice(0)
            }
        }
        case types.LOGOUT_USER: {
            return { ...initialState }
        }
        default: { return state; }
    }
}

export default authReducer;