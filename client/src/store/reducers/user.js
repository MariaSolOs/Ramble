import {userTypes as types} from '../actionTypes';

const initialState = {
    token: null,
    isAdmin: false,
    isCreator: false,
    userData: {},
    creatorData: {}
}

const authReducer = (state = initialState, action) => {
    switch(action.type) {
        case types.SET_USER_DATA: {
            return {
                ...state,
                token: action.token,
                isAdmin: action.isAdmin,
                isCreator: action.isCreator,
                userData: { ...action.userData },
            }
        }
        case types.SET_CREATOR_DATA: {
            return {
                ...state,
                creatorData: { ...action.creatorData },
            }
        }
        case types.RESET_USER: {
            return { ...initialState }
        }
        default: { return state; }
    }
}

export default authReducer;