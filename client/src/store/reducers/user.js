import {userTypes as types} from '../actionTypes';

const initialState = {
    token: null,
    isAdmin: false,
    profile: {
        fstName: '',
        lstName: '',      
        photo: '',
        city: '',
        email: '',
        phoneNumber: '',
        birthday: ''
    },
    //Creator information
    creator: {
        id: null,
        stripeId: null,
        bio: ''
    },
    notifications: []
}

const authReducer = (state = initialState, action) => {
    switch(action.type) {
        case types.SET_PROFILE: {
            return {
                ...state,
                token: action.token,
                isAdmin: action.isAdmin,
                profile: { ...action.profile },
            }
        }
        case types.SET_CREATOR_PROFILE: {
            return {
                ...state,
                creator: {
                    ...action.creatorProfile
                }
            }
        }
        case types.SET_NOTIFICATIONS: {
            return {
                ...state,
                notifications: action.notifications.slice(0)
            }
        }
        case types.RESET_USER: {
            return { ...initialState }
        }
        default: { return state; }
    }
}

export default authReducer;