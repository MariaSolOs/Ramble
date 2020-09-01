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
        emailVerified: false,
        phoneNumber: '',
        birthday: '',
        promoCode: {
            code: '',
            usedBy: []
        }
    },
    notifs: [],
    //Creator information
    creator: {
        id: null,
        stripeId: null,
        bio: '',
        numBookings: 0
    }
}

const authReducer = (state = initialState, action) => {
    switch(action.type) {
        case types.SET_PROFILE: {
            return {
                ...state,
                token: action.token,
                isAdmin: action.isAdmin,
                profile: { 
                    ...action.profile,
                    promoCode: action.isAdmin? state.profile.promoCode :
                               action.profile.promoCode
                },
                notifs: action.notifs? [...action.notifs] :
                        state.notifs
            }
        }
        case types.SET_CREATOR_PROFILE: {
            return {
                ...state,
                creator: {...action.creatorProfile}
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
        case types.SET_NUM_BOOKINGS: {
            return {
                ...state,
                creator: {
                    ...state.creator,
                    numBookings: action.operation === 'inc'? 
                                 state.creator.numBookings + 1 :
                                 action.operation === 'dec'?
                                 state.creator.numBookings - 1 : 
                                 state.creator.numBookings
                }
            }
        }
        case types.RESET_USER: {
            return { ...initialState }
        }
        default: { return state; }
    }
}

export default authReducer;