import {useEffect} from 'react';
import {useDispatch, useSelector} from 'react-redux';
import {fetchCities} from '../store/actions/experiences';

export default function useLocations(props) {
    const dispatch = useDispatch();

    //Fetch cities from database if not loaded
    const cities = useSelector(state => state.exp.cities);
    useEffect(() => {
        if(cities.length === 0) { dispatch(fetchCities()); } 
    }, [cities, dispatch]);

    return cities;
}