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
    notifs: []
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
                notifs: action.notifs.slice(0)
            }
        }
        case types.DELETE_NOTIFICATION: {
            return {
                ...state,
                notifs: state.notifs.filter(notif => 
                            notif._id !== action.id
                        )
            }
        }
        case types.RESET_USER: {
            return { ...initialState }
        }
        default: { return state; }
    }
}

export default authReducer;