import * as types from '../actionTypes';
import axios from '../../tokenizedAxios';

//Clean actions
const authInit = () => ({ type: types.AUTH_INIT });
const setUserData = (token, data) => ({ 
    type: types.SET_USER_DATA, token, data 
});
const setUserExps = (pastExps, savedExps) => ({
    type: types.SET_USER_EXPS, pastExps, savedExps
});
const setMessage = (message) => ({
    type: types.SET_MSG, message
});
const resetUser = () => ({ type: types.RESET_USER });

export const fetchProfile = () => {
    return dispatch => {
        if(!window.localStorage.getItem('token')) { return; }
        dispatch(authInit());
        axios.get('/api/profile')
        .then(res => {
            if(res.status === 200) {
                dispatch(setUserData(res.data.token, res.data.userData));
                if(!res.data.isAdmin) {
                    dispatch(setUserExps(res.data.pastExps, res.data.savedExps)); 
                }        
            } else { dispatch(resetUser()); }
        }).catch(err => { 
            console.log(`FETCH PROFILE FAILED: ${err}`); 
            dispatch(logout());
        });
    }
}

//For admin authentication
export const adminLogin = (adminInfo) => {
    return dispatch => {
        dispatch(authInit());
        axios.post(`/api/auth/admin-login`, adminInfo)
        .then(res => {
            if(res.status === 201 || res.status === 200) {
                window.localStorage.setItem('token', res.data.token);
                dispatch(fetchProfile());
            } else { dispatch(resetUser()); }
        })
        .catch(err => { 
            console.log(`ADMIN AUTH FAILED: ${err}`); 
            dispatch(resetUser());
        });
    }
}

//For email authentication
export const emailAuth = (userInfo, authType) => {
    return dispatch => {
        dispatch(authInit());
        //authtype is login or register
        axios.post(`/api/auth/email-${authType}`, userInfo)
        .then(res => {
            if(res.status === 201 || res.status === 200) {
                window.localStorage.setItem('token', res.data.token);
                dispatch(fetchProfile());
            } else { dispatch(resetUser()); }
        })
        .catch(err => { 
            console.log(`EMAIL AUTH FAILED: ${err}`); 
            if(err.response.status === 409) {
                dispatch(setMessage('Someone is already using that email...'));
            } else {
                dispatch(setMessage('Something went wrong...'));
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
                dispatch(setUserData(res.data.token, res.data.userData));
                dispatch(setMessage(`Hey ${res.data.userData.fstName}! 
                Your profile has been updated.`));
            }
        })
        .catch(err => {
            console.log(`EDIT PROFILE FAILED: ${err}`);
            dispatch(setMessage("Oh no! We couldn't update your profile..."))
        });
    }
}

//For saving/unsaving an experience
export const saveExperience = (expId) => {
    return dispatch => {
        axios.post('/api/profile/exps', {expId})
        .then(res => {
            if(res.status === 200) {
                //Update saved experiences
                dispatch(setUserExps(res.data.pastExps, res.data.savedExps));    
            }
        })
        .catch(err => console.log(`SAVE EXPERIENCE FAILED: ${err}`));
    }
}
export const unsaveExperience = (expId) => {
    return dispatch => {
        axios.delete('/api/profile/exps', {data: {expId}})
        .then(res => {
            if(res.status === 200) {
                //Update saved experiences
                dispatch(setUserExps(res.data.pastExps, res.data.savedExps));    
            }
        })
        .catch(err => console.log(`UNSAVE EXPERIENCE FAILED: ${err}`));
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