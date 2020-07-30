import React, {useState, useEffect} from 'react';
import axios from 'axios';

export const LocationContext = React.createContext({
    locations: []
});

export const LocationProvider = (props) => {
    const [locations, setLocations] = useState([]);

    //Fetch cities from database
    useEffect(() => {
        let mounted = true;
        axios.get('/api/exp/locations')
        .then(res => {
            if(res.status === 200 && mounted) {
                setLocations(res.data.locations);
            }
        }).catch(err => console.log(err));
        return () => mounted = false;
    }, []);

    return (
        <LocationContext.Provider value={locations}>
            {props.children}
        </LocationContext.Provider>
    )
}