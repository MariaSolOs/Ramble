import {userTypes as types} from '../actionTypes';
import {startLoading, endLoading, showError, showSnackbar} from './ui';
import axios from '../../tokenizedAxios';

//Clean actions
const setProfile = (token, isAdmin, profile) => ({ 
    type: types.SET_PROFILE, token, isAdmin, profile
});
const setCreatorProfile = (creatorProfile) => ({
    type: types.SET_CREATOR_PROFILE, creatorProfile
});

const resetUser = () => ({ type: types.RESET_USER });

//For fetching user data
export const fetchUserProfile = () => {
    return dispatch => {
        if(!window.localStorage.getItem('token')) { return; }
        dispatch(startLoading());
        axios.get('/api/profile')
        .then(res => {
            if(res.status === 200) {
                dispatch(setProfile(
                    res.data.token,
                    res.data.isAdmin,
                    res.data.userData
                )); 
                if(res.data.isCreator) {
                    axios.get('/api/creator')
                    .then(res => {
                        console.log(res)
                        dispatch(setCreatorProfile(res.data.profile));  
                        dispatch(endLoading());
                    }).catch(err => { 
                        console.log(`FETCH CREATOR PROFILE FAILED: ${err}`); 
                        dispatch(endLoading());
                    });
                } else { dispatch(endLoading()); }      
            } else { dispatch(resetUser()); }
        })
        .catch(err => {
            console.log(`FETCH PROFILE FAILED: ${err}`); 
            dispatch(endLoading());
            dispatch(logout());
        });
    }
}

//For admin authentication
export const adminLogin = (adminInfo) => {
    return dispatch => {
        dispatch(startLoading());
        axios.post(`/api/auth/admin-login`, adminInfo)
        .then(res => {
            if(res.status === 201 || res.status === 200) {
                dispatch(fetchUserProfile());
            } else { dispatch(resetUser()); }
            window.localStorage.setItem('redirectURL', '/admin');
        })
        .catch(err => { 
            console.log(`ADMIN AUTH FAILED: ${err}`); 
            dispatch(resetUser());
        });
        dispatch(endLoading());  
    }
}

//For email authentication
export const emailAuth = (userInfo, authType) => {
    return dispatch => {
        dispatch(startLoading());
        //authtype is login or register
        axios.post(`/api/auth/email-${authType}`, userInfo)
        .then(res => {
            if(res.status === 201 || res.status === 200) {
                dispatch(fetchUserProfile());
            } else { dispatch(resetUser()); }
            dispatch(endLoading());  
        })
        .catch(err => { 
            console.log(`EMAIL AUTH FAILED: ${err}`); 
            if(err.response.status === 409) {
                dispatch(showError('Someone is already using that email...'));
            } else {
                dispatch(showError('Something went wrong...'));
            }
            dispatch(resetUser());
        });
    }
}

//For editing user info
export const editProfile = (updatedInfo) => {
    return dispatch => {
        axios.put('/api/profile/edit', updatedInfo)
        .then(res => {
            if(res.status === 201) {
                //Update state with new user data
                dispatch(setProfile(
                    res.data.token,
                    res.data.isAdmin,
                    res.data.userData
                )); 
                dispatch(showSnackbar(`Hey ${res.data.userData.fstName}! 
                Your profile has been updated.`));
            }
        })
        .catch(err => {
            console.log(`EDIT PROFILE FAILED: ${err}`);
            dispatch(showError("We couldn't update your profile..."));
        });
    }
}

export const upgradeToCreator = (creatorInfo) => {
    return dispatch => {
        axios.post('/api/creator', creatorInfo)
        .then(res => {  
            dispatch(setCreatorProfile(res.data.profile));
        })
        .catch(err => {
            console.log(`CREATOR CREATION FAILED: ${err}`);
            dispatch(showError("We couldn't submit your form..."));
        });
    }
}

export const logout = () => {
    return dispatch => {
        window.localStorage.removeItem('token');
        window.localStorage.setItem('redirectURL', '/');
        axios.get('/api/auth/logout');
        dispatch(resetUser());
    }
}