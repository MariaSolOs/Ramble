import * as types from '../actionTypes';

//Axios instance for profile API
import axios from 'axios';
const userAxios = () => {
    const instance = axios.create();
    instance.interceptors.request.use((config) => {
        const token = window.localStorage.getItem('token');
        config.headers.Authorization = token ? `JWT ${token}`: '';
        return config;
    });
    return instance;
}

//Clean actions
const setProfile = (userData) => ({ 
    type: types.SET_PROFILE, userData 
});
const setUserExps = (pastExps, savedExps) => ({
    type: types.SET_USER_EXPS, pastExps, savedExps
});
const logoutUser = () => ({ 
    type: types.LOGOUT_USER 
});

export const fetchProfile = () => {
    return dispatch => {
        userAxios().get('/api/profile')
        .then(res => {
            if(res.status === 200) {
                dispatch(setProfile(res.data.userData)); 
                dispatch(setUserExps(res.data.pastExps, res.data.savedExps));          
            }
        })
        .catch(err => { 
            console.log(`FETCH PROFILE FAILED: ${err}`); 
            dispatch(logout());
        });
    }
}
//TODO: Replace userid by token

//For email authentication
export const emailAuth = (userInfo, authType) => {
    return dispatch => {
        //authtype is login or register
        axios.post(`/api/${authType}/email`, userInfo)
        .then(res => {
            if(res.status === 201 || res.status === 200) {
                window.localStorage.setItem('token', res.data.token);
                dispatch(fetchProfile());
            }
        })
        .catch(err => { console.log(`EMAIL AUTH FAILED: ${err}`); })
    }
}

//For editing user info
export const editProfile = (updatedInfo) => {
    return dispatch => {
        userAxios().put('/api/profile/edit', updatedInfo)
        .then(res => {
            if(res.status === 201) {
                //Update state with new user data
                dispatch(setProfile(res.data.userData))
            }
        })
        .catch(err => console.log(`EDIT PROFILE FAILED: ${err}`))
    }
}

//For saving/unsaving an experience
export const saveExperience = (expId) => {
    return dispatch => {
        userAxios().post('/api/profile/exps', {expId})
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
        userAxios().delete('/api/profile/exps', {data: {expId}})
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
        axios.get('/api/profile/logout');
        dispatch(logoutUser());
    }
}