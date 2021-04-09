import React from 'react';
import { ExperienceMapText as text } from './ExperienceText';

import ReactMapGL, {Marker} from 'react-map-gl';

import { makeStyles } from '@material-ui/core/styles';
import { mapStyles } from './ExperienceStyles';
const useStyles = makeStyles(mapStyles);

const ExperienceMap = ({ coordinates, lang }) => {
    const classes = useStyles();

    return (
        <>
            <h3 className={classes.label}>{text.location[lang]}</h3>
            <div className={classes.wrapper}>
                <ReactMapGL
                mapboxApiAccessToken={process.env.REACT_APP_MAPBOX_ACCESS_TOKEN}
                mapStyle="mapbox://styles/mapbox/dark-v9"
                width="100%"
                height={300}
                zoom={11}
                latitude={coordinates.lat}
                longitude={coordinates.long}>
                    <Marker 
                    latitude={coordinates.lat}
                    longitude={coordinates.long}>
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