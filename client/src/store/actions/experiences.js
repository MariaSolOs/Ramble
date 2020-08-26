import {experienceTypes as types} from '../actionTypes';
import axios from '../../tokenizedAxios';

//Clean actions
const setLocations = (locations) => ({
    type: types.SET_LOCATIONS, locations
});
const setExps = (bookedExps, savedExps) => ({
    type: types.SET_EXPS, bookedExps, savedExps
});
const saveExp = (exp) => ({ type: types.SAVE_EXP, exp });
const unsaveExp = (expId) => ({ type: types.UNSAVE_EXP, expId });
export const saveExperienceForm = (form) => ({
    type: types.SAVE_EXPERIENCE_FORM, form
});

export const fetchLocations = () => {
    return dispatch => {
        axios.get('/api/exp/locations')
        .then(res => {
            dispatch(setLocations(res.data.locations));
        }).catch(err => console.log(`FETCH LOCATIONS FAILED: ${err}`));
    }
}

//Get and set user experiences
export const fetchExperiences = () => {
    return dispatch => {
        axios.get('/api/profile/exps')
        .then(res => {
            dispatch(setExps(
                res.data.bookedExperiences,
                res.data.savedExperiences
            ));
        })
        .catch(err => {
            console.log(`FETCH USER EXPS FAILED: ${err}`); 
        })
    }
}

//For saving/unsaving an experience
export const saveExperience = (expId) => {
    return dispatch => {
        axios.post('/api/profile/exps', {expId})
        .then(res => {
            if(res.status === 200) {
                //Update saved experiences
                dispatch(saveExp(res.data.savedExp));
            }
        })
        .catch(err => console.log(`SAVE EXPERIENCE FAILED: ${err}`));
    }
}
export const unsaveExperience = (expId) => {
    return dispatch => {
        axios.delete(`/api/profile/exps/${expId}`)
        .then(res => {
            if(res.status === 200) {
                //Update saved experiences
                dispatch(unsaveExp(expId));  
            }
        })
        .catch(err => console.log(`UNSAVE EXPERIENCE FAILED: ${err}`));
    }
}