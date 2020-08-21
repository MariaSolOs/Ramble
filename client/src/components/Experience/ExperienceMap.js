import React from 'react';

import ReactMapGL, {Marker} from 'react-map-gl';

import {makeStyles} from '@material-ui/core/styles';
import {mapStyles} from './ExperienceStyles';
const useStyles = makeStyles(mapStyles);

const ExperienceMap = (props) => {
    const classes = useStyles();

    return (
        <>
            <h3 className={classes.label}>Location</h3>
            <div className={classes.wrapper}>
                <ReactMapGL
                mapboxApiAccessToken={process.env.REACT_APP_MAPBOX_ACCESS_TOKEN}
                mapStyle="mapbox://styles/mapbox/dark-v9"
                width="100%"
                height={300}
                zoom={11}
                latitude={props.coordinates.lat}
                longitude={props.coordinates.long}>
                    <Marker 
                    latitude={props.coordinates.lat}
                    longitude={props.coordinates.long}>
                        <div className={classes.marker}>
                            <div/>
                        </div>
                    </Marker>
                </ReactMapGL>
            </div>
        </>
    );
}

export default ExperienceMap;