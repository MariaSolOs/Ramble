import {userTypes as types} from '../actionTypes';

const initialState = {
    isAdmin: false,
    profile: {
        id: null,
        fstName: '',
        lstName: '',      
        photo: '',
        city: '',
        email: '',
        phoneNumber: '',
        birthday: ''
    },
    notifs: [],
    //Creator information
    creator: {
        id: null,
        stripeId: null,
        bio: '',
        bookingRequests: []
    }
}

const authReducer = (state = initialState, action) => {
    switch(action.type) {
        case types.SET_PROFILE: {
            return {
                ...state,
                token: action.token,
                isAdmin: action.isAdmin,
                profile: { ...action.profile },
                notifs: [...action.notifs]
            }
        }
        case types.SET_CREATOR_PROFILE: {
            return {
                ...state,
                creator: {
                    ...action.creatorProfile,
                    bookingRequests: action.creatorProfile.bookingRequests?
                                     action.creatorProfile.bookingRequests :
                                     state.creator.bookingRequests
                }
            }
        }
        case types.DELETE_BOOKING_REQUEST: {
            return {
                ...state,
                creator: {
                    ...state.creator,
                    bookingRequests: state.creator.bookingRequests.filter(req => (
                        req._id !== action.bookingId
                    ))
                }
            }
        }
        case types.ADD_NOTIFICATION: {
            return {
                ...state,
                notifs: [action.notif, ...state.notifs]
            }
        }
        case types.DELETE_NOTIFICATION: {
            return {
                ...state,
                notifs: state.notifs.filter((notif) => 
                    notif._id !== action.notifId
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