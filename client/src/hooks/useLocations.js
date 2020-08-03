import {useEffect} from 'react';
import {useDispatch, useSelector} from 'react-redux';
import {fetchLocations} from '../store/actions/experiences';

export default function useLocations(props) {
    const dispatch = useDispatch();

    //Fetch cities from database if not loaded
    const locations = useSelector(state => state.exp.locations);
    useEffect(() => {
        if(!locations) { dispatch(fetchLocations()); } 
    }, [locations, dispatch]);

    return locations;
}