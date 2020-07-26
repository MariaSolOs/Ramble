import axios from 'axios';
import * as types from '../actionTypes';

//Clean actions
const setCities = (cities) => ({ 
    type: types.SET_CITIES, cities 
});
const setExperiences = (experiences) => ({ 
    type: types.SET_EXPERIENCES, experiences
});
const setQuery = (location, numPeople) => ({
    type: types.SET_QUERY, location, numPeople
});

export const fetchCities = () => {
    return (dispatch) => {
        axios.get('/api/exp/cities')
        .then(res => {
            if(res.status === 200) {
                dispatch(setCities(res.data.cities));
            }
        })
        .catch(err => console.log(err));
        //TODO: Handle error
    }
}

export const fetchExperiences = (location, numPeople) => {
    return (dispatch) => {
        dispatch(setQuery(location, numPeople));
        axios.get('/api/exp', { params: { location, numPeople }})
        .then(res => {
            if(res.status === 200) {
                dispatch(setExperiences(res.data.exps));
            }
        })
        .catch(err => console.log(err));
        //TODO: Handle error
    }
}
