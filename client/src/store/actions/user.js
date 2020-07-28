import * as types from '../actionTypes';

//Axios instance with token in header
import axios from 'axios';
const tokenAxios = () => {
    const instance = axios.create();
    instance.interceptors.request.use((config) => {
        const token = window.localStorage.getItem('token');
        config.headers.Authorization = token ? `JWT ${token}`: '';
        return config;
    });
    return instance;
}

//Clean actions
const authInit = () => ({ type: types.AUTH_INIT });
const setUserData = (token, data) => ({ 
    type: types.SET_USER_DATA, token, data 
});
const setUserExps = (pastExps, savedExps) => ({
    type: types.SET_USER_EXPS, pastExps, savedExps
});
const resetUser = () => ({ type: types.RESET_USER });

export const fetchProfile = () => {
    return dispatch => {
        if(!window.localStorage.getItem('token')) { return; }
        tokenAxios().get('/api/profile')
        .then(res => {
            console.log(res.data)
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
export const adminAuth = (adminInfo, authType) => {
    return dispatch => {
        dispatch(authInit());
        axios.post(`/api/auth/admin-${authType}`, adminInfo)
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
            } else {
                dispatch(resetUser());
            }
        })
        .catch(err => { 
            console.log(`EMAIL AUTH FAILED: ${err}`); 
            dispatch(resetUser());
        });
    }
}

//For editing user info
export const editProfile = (updatedInfo) => {
    return dispatch => {
        tokenAxios().put('/api/profile/edit', updatedInfo)
        .then(res => {
            if(res.status === 201) {
                //Update state with new user data
                dispatch(setUserData(res.data.token, res.data.userData));
            }
        })
        .catch(err => console.log(`EDIT PROFILE FAILED: ${err}`))
    }
}

//For saving/unsaving an experience
export const saveExperience = (expId) => {
    return dispatch => {
        tokenAxios().post('/api/profile/exps', {expId})
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
        tokenAxios().delete('/api/profile/exps', {data: {expId}})
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