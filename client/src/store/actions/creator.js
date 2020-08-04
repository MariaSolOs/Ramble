import {creatorTypes as types} from '../actionTypes';
import {startLoading, endLoading, showError, showSnackbar} from './ui';
import {logout} from './user';
import axios from '../../tokenizedAxios';

//Clean actions
const setCreatorProfile = (profile) => ({
    type: types.SET_CREATOR_PROFILE, profile
});
const setBookingRequests = (bookingRequests) => ({ 
    type: types.SET_BOOKING_REQUESTS, bookingRequests
});
const removeBooking = (stripeId) => ({
    type: types.REMOVE_BOOKING, stripeId
});

//For fetching creator data
export const fetchCreatorProfile = () => {
    return dispatch => {
        dispatch(startLoading());
        axios.get('/api/creator')
        .then(res => {
            dispatch(setCreatorProfile(res.data.profile));  
            dispatch(endLoading());     
        }).catch(err => { 
            console.log(`FETCH CREATOR PROFILE FAILED: ${err}`); 
            dispatch(endLoading());
            dispatch(logout());
        });
    }
}

//Get, accept and decline booking requests
export const fetchBookingRequests = () => {
    return dispatch => {
        dispatch(startLoading());
        axios.get('/api/creator/bookingRequests')
        .then(res => {
            dispatch(setBookingRequests(res.data.bookingRequests));
            dispatch(endLoading());     
        }).catch(err => { 
            console.log(`FETCH BOOKING REQUESTS FAILED: ${err}`); 
            dispatch(endLoading());
        });
    }
}
export const handleRequestAction = (stripeId, action) => {
    return dispatch => {
        //Action is either capture or cancel
        axios.post(`/api/stripe/payment-intent/${action}`, {stripeId})
        .then(res => {
            dispatch(removeBooking(stripeId));
            const decision = action === 'capture'? 'approved' : 'canceled';
            dispatch(showSnackbar(`The booking was ${decision}`));
        })
        .catch(err => {
            console.log(`REQUEST DECISION FAILED: ${err}`);
            dispatch(showError("We couldn't process your decision..."));
        });
    }
}

export const updateToCreator = (creatorInfo) => {
    return dispatch => {
        dispatch(startLoading());
        axios.post('/api/creator', creatorInfo)
        .then(res => {  
            dispatch(showSnackbar(`Thank you for your submission! 
            We'll rewiew it ASAP so that you can start creating...`));
        })
        .catch(err => {
            console.log(`CREATOR CREATION FAILED: ${err}`);
            dispatch(showError("We couldn't submit your form..."));
        });
    }
}
