import {creatorTypes as types} from '../actionTypes';

const initialState = {
    formPending: false,
    bookingRequests: [],
    profile: {
        id: null
    }
}

const authReducer = (state = initialState, action) => {
    switch(action.type) {
        case types.SET_CREATOR_PROFILE: {
            return {
                ...state,
                formPending: false,
                profile: {
                    ...action.profile
                }
            }
        }
        case types.SET_BOOKING_REQUESTS: {
            return {
                ...state,
                formPending: false,
                bookingRequests: action.bookingRequests.slice(0)
            }
        }
        case types.REMOVE_BOOKING: {
            return {
                ...state,
                formPending: false,
                bookingRequests: state.bookingRequests.filter(req => 
                                    req.stripe.id !== action.stripeId
                                )
            }
        }
        case types.CREATOR_FORM_PENDING: {
            return {
                ...initialState,
                formPending: true
            }
        }
        default: { return state; }
    }
}

export default authReducer;