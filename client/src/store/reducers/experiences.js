import * as types from '../actionTypes';

const initialState = {
    location: '', //User's requested location
    numPeople: 0, //User's requested number of people
    experiences: [], //Experiences satisfying the above
    cities: [], //Cities available in database
}

const experienceReducer = (state = initialState, action) => {
    switch(action.type) {
        case types.SET_CITIES: 
            return {
                ...state,
                cities: action.cities.slice(0)
            }
        case types.SET_QUERY: 
            return {
                ...state,
                location: action.location,
                numPeople: action.numPeople
            }
        case types.SET_EXPERIENCES: 
            return {
                ...state,
                experiences: action.experiences.slice(0)
            }
        default: { return state; }
    }
}

export default experienceReducer;