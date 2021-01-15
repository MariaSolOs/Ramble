import React, { useState } from 'react';
import AlgoliaPlaces from 'algolia-places-react';

import Switch from '@material-ui/core/Switch';
import InputBase from '@material-ui/core/InputBase';
import Tip from '../../../../components/Tip/Tip';

import { makeStyles } from '@material-ui/core/styles';
import styles from './LocationStyles';
const useStyles = makeStyles(styles);

const Location = ({ location, meetPoint, submitInput, 
                    zoomMeetingId, zoomMeetingPassword }) => {      
    const classes = useStyles();

    // To format location suggestions
    const showLocSuggestion = (sugg) => {
        const suggAdmin = sugg.administrative? `${sugg.administrative},`: '';
        return `${sugg.name}, ${suggAdmin} ${sugg.country}`;
    }

    // For location changes
    const handleLocationChange = ({suggestion}) => {
        submitInput('location', `${suggestion.value}, ${suggestion.countryCode}`);
    }
    const handleMeetPointChange = ({suggestion}) => {
        submitInput('coordinates', [suggestion.latlng.lat, suggestion.latlng.lng]);
        submitInput('meetPoint', suggestion.value);
    }

    // For Zoom experiences 
    const [isZoomExp, setIsZoomExp] = useState(false);
    const handleZoomSwitch = (e) => {
        setIsZoomExp(e.target.checked);

        if(e.target.checked) {
            submitInput('location', null);
        }
    }
    const handleZoomInfoChange = (zoomField) => (e) => {
        submitInput(zoomField, e.target.value);
    }

    const handleClear = (type) => () => {
        submitInput(type, '');
    }

    return (
        <>
            <div className={`${classes.location} ${classes.searchContainer}`}>
                <h1 className={classes.title}>Location</h1>
                <p className={classes.description}>
                    In which city will your experience take place?
                </p>
                <AlgoliaPlaces
                required
                placeholder=""
                defaultValue={location}
                options={{
                    appId: process.env.REACT_APP_ALGOLIA_APP_ID,
                    apiKey: process.env.REACT_APP_ALGOLIA_API_KEY,
                    type: 'city',
                    aroundLatLngViaIP: false,
                    hitsPerPage: 4,
                    templates: { suggestion: showLocSuggestion },
                }}
                onChange={handleLocationChange}
                onClear={handleClear('location')}/>
            </div>
            {(location === null || location === '' ||
              isZoomExp) &&
                <div className={classes.onlineInfo}>
                    <h3 className={classes.title}>Online experience</h3>
                    <Switch 
                    color="default"
                    className={classes.switch}
                    onChange={handleZoomSwitch}/>
                </div>}
            {location?
                <div className={`${classes.meetPoint} ${classes.searchContainer}`}>
                    <h1 className={`${classes.title} meetPoint`}>Meeting point</h1>
                    <p className={classes.description}>
                        Where exactly will you meet your guests? <br/>
                    </p>
                    <Tip>Choose an easily accessible location.</Tip>
                    <AlgoliaPlaces
                    required
                    placeholder="Enter an address"
                    defaultValue={meetPoint}
                    options={{
                        appId: process.env.REACT_APP_ALGOLIA_APP_ID,
                        apiKey: process.env.REACT_APP_ALGOLIA_API_KEY,
                        type: 'address',
                        hitsPerPage: 4,
                        countries: [location.split(', ').pop()]
                    }}
                    onChange={handleMeetPointChange}
                    onClear={handleClear('meetPoint')}/>
                    <p className={`${classes.description} lower-comment`}>
                        This information will be shared with guests only after booking.
                    </p>
                </div> : 
            isZoomExp? 
                <div className={classes.zoomTextfields}>
                    <InputBase 
                    value={zoomMeetingId}
                    onChange={handleZoomInfoChange(zoomMeetingId)}
                    className="zoom-textfield"/>
                    <InputBase 
                    value={zoomMeetingPassword}
                    onChange={handleZoomInfoChange(zoomMeetingPassword)}
                    className="zoom-textfield"/>
                </div>
                : null}
        </>
    );
}

export default Location;