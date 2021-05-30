import React, { useState } from 'react';
import { useHistory } from 'react-router-dom';
import { useSelector } from 'react-redux';
import useNumberField from '../../../hooks/useNumberField/useNumberField';
import useLocations from '../../../hooks/useLocations';
import { landingText as text } from '../HomeText';

import ReferBox from '../../../components/ReferBox/ReferBox';
import Autocomplete from '@material-ui/lab/Autocomplete';
import TextField from '@material-ui/core/TextField';
import InputAdornment from '@material-ui/core/InputAdornment';
import SearchIcon from '@material-ui/icons/Search';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faUsers } from '@fortawesome/free-solid-svg-icons/faUsers';

import { makeStyles } from '@material-ui/core/styles';
import styles from './LandingStyles';
const useStyles = makeStyles(styles);

const Landing = (props) => {
    const classes = useStyles();
    const lang = useSelector(state => state.ui.language);
    const locations = useLocations();
    const history = useHistory();

    // For handling the user search queries
    const [location, setLocation] = useState('');
    const handleLocationChange = (_, value, reason) => {
        if(reason === 'reset') { setLocation(value); }
    }
    const [numPeople, NumPeopleField] = useNumberField({
        min: 1, 
        initval: 2,
        step: 1,
        getlabel: num => num > 1? text.peopleLabel[lang] : text.personLabel[lang], 
        startadornment: <FontAwesomeIcon icon={faUsers}/>,
    });

    // Redirect to search page when user 'starts exploring'
    const handleSearch = () => {
        history.push(`/experience/search?location=${location}&numPeople=${numPeople}`);
    }

    const codeUsed = useSelector(state => 
                        state.user.profile.promoCode.usedBy.length > 0
                    );

    return (
        <div className={classes.root}>
            <div className={classes.body}>
                <h1 className={classes.title}>{text.title[lang]}</h1>
                <h5 className={classes.description}>{text.discover[lang]}</h5>
                <div className={classes.row}>
                    <Autocomplete
                    id="location-search"
                    onInputChange={handleLocationChange}
                    options={['Online', ...locations] || []}
                    loading={Boolean(locations)}
                    classes={{ paper: classes.search_list }}
                    fullWidth
                    renderInput={(params) => (
                        <TextField
                        {...params}
                        classes={{ root: classes.textField_root }}
                        placeholder={text.searchbar[lang]}
                        inputRef={props.searchRef}
                        InputProps={{
                            ...params.InputProps,
                            disableUnderline: true,
                            classes: { root: classes.input_root },
                            startAdornment: <InputAdornment position="start">
                                                <SearchIcon/>
                                            </InputAdornment>
                        }}/>
                    )}/>
                </div>
                <div className={classes.row}>
                    <div className="people-field">
                        {NumPeopleField}
                    </div>
                    <div className="explore-button">
                        <button 
                        className={classes.button} 
                        onClick={handleSearch}
                        disabled={location === ''}>
                            {text.exploreButton[lang]}
                        </button>
                    </div>
                </div>
            {!codeUsed && <ReferBox/>}
            </div>
            <div className={classes.image}>
                <img src="https://res.cloudinary.com/dxod7etqu/image/upload/v1593715700/Ramble/Homepage/fireBalloon.png"
                alt="Fire balloon"/>
            </div>
        </div>
    );
}

export default Landing;