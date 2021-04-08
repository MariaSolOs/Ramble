import React from 'react';
import AlgoliaPlaces from 'algolia-places-react';
import { LocationText as text } from '../SlidesText';

import Switch from '@material-ui/core/Switch';
import InputBase from '@material-ui/core/InputBase';
import HelpIcon from '@material-ui/icons/Help';
import Tooltip from '@material-ui/core/Tooltip';
import Tip from '../../../../components/Tip/Tip';

import { makeStyles } from '@material-ui/core/styles';
import styles from './LocationStyles';
const useStyles = makeStyles(styles);

const Location = ({ location, meetPoint, zoomMeetingId, isZoomExp,
                    zoomMeetingPassword, submitInput, lang }) => {      
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
    const handleZoomSwitch = (e) => {
        submitInput('isZoomExp', e.target.checked);

        //Reset the fields when switching
        if(e.target.checked) {
            submitInput('meetPoint', '');
            submitInput('coordinates', []);
        } else {
            submitInput('zoomMeetingId', '');
            submitInput('zoomMeetingPassword', '');
        }
    }
    const handleZoomInfoChange = (e) => {
        submitInput(e.target.name, e.target.value);
    }

    const handleClear = (type) => () => {
        submitInput(type, '');
    }

    return (
        <>
            <div className={`${classes.location} ${classes.searchContainer}`}>
                <h1 className={classes.title}>{text.title[lang]}</h1>
                <p className={classes.description}>
                    {text.cityQuestion[lang]}
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
            {(location === null || location === '' || isZoomExp) &&
                <div className={classes.onlineInfo}>
                    <h3 className={classes.title}>{text.onlineExp[lang]}</h3>
                    <Switch 
                    color="default"
                    checked={isZoomExp}
                    className={classes.switch}
                    onChange={handleZoomSwitch}/>
                </div>}
            {(location && !isZoomExp)?
                <div className={`${classes.meetPoint} ${classes.searchContainer}`}>
                    <h1 className={`${classes.title} meetPoint`}>
                        {text.meetPoint[lang]}
                    </h1>
                    <p className={classes.description}>
                        {text.meetQuestion[lang]} <br/>
                    </p>
                    <Tip>{text.accessTip[lang]}</Tip>
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
                        {text.sharedRemark[lang]}
                    </p>
                </div> : 
            isZoomExp? 
                <div className={classes.zoomTextfields}>
                    <InputBase 
                    value={zoomMeetingId}
                    name="zoomMeetingId"
                    onChange={handleZoomInfoChange}
                    className="zoom-textfield"
                    placeholder={text.zoomPMI[lang]}
                    endAdornment={
                        <Tooltip
                        title={
                            <span>
                                For help on setting your PMI, check the <a 
                                href="https://support.zoom.us/hc/en-us/articles/203276937-Using-Personal-Meeting-ID-PMI-"
                                target="_blank" 
                                rel="noopener noreferrer">
                                    Zoom docs
                                </a>.
                            </span>}
                        interactive
                        placement="top"
                        classes={{
                            tooltip: classes.tooltip
                        }}>
                            <HelpIcon/>
                        </Tooltip>
                    }/>
                    <InputBase 
                    name="zoomMeetingPassword"
                    value={zoomMeetingPassword}
                    onChange={handleZoomInfoChange}
                    className="zoom-textfield"
                    placeholder={text.zoomPwd[lang]}
                    endAdornment={
                        <Tooltip
                        title={
                            <span>
                                For help on managing your password, check the <a 
                                href="https://support.zoom.us/hc/en-us/articles/115005166483-Managing-your-password"
                                target="_blank" 
                                rel="noopener noreferrer">
                                    Zoom docs
                                </a>.
                            </span>}
                        interactive
                        placement="top"
                        classes={{
                            tooltip: classes.tooltip
                        }}>
                            <HelpIcon/>
                        </Tooltip>
                    }/>
                </div>
                : null}
        </>
    );
}

export default Location;