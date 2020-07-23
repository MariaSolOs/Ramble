import React, {useState, useContext} from 'react';
import {useDispatch} from 'react-redux';
import {useHistory} from 'react-router-dom';
import {fetchExperiences} from '../../../store/actions/experiences';
import useNumberField from '../../../hooks/useNumberField';
import useLocations from '../../../hooks/useLocations';
import {CloudinaryContext} from '../../../context/cloudinaryContext';

//Components and icons
import ReferBox from './ReferBox';
import Autocomplete from '@material-ui/lab/Autocomplete';
import TextField from '@material-ui/core/TextField';
import InputAdornment from '@material-ui/core/InputAdornment';
import SearchIcon from '@material-ui/icons/Search';
import {FontAwesomeIcon} from '@fortawesome/react-fontawesome';
import {faUsers} from '@fortawesome/free-solid-svg-icons/faUsers';

//Styles
import {makeStyles} from '@material-ui/core/styles';
import styles from './LandingStyles';
const useStyles = makeStyles(styles);

const Landing = (props) => {
    const classes = useStyles();

    const cloudinary = useContext(CloudinaryContext);
    const dispatch = useDispatch();
    const cities = useLocations();
    const history = useHistory();

    //For handling the user search queries
    const [location, setLocation] = useState('Montreal, Quebec');
    const handleLocationChange = (event, value, reason) => {
        if(reason === 'reset') { setLocation(value); }
    }
    const [numPeople, NumPeopleField] = useNumberField({
        min: 1, 
        initval: 1,
        step: 1,
        getlabel: num => num > 1? 'People' : 'Person', 
        startadornment: <FontAwesomeIcon icon={faUsers}/>,
    });

    //Redirect to search page when user 'starts exploring'
    const handleSearch = () => {
        dispatch(fetchExperiences(location, numPeople));
        history.push('/experience/search');
    }

    return (
        <div className={classes.root}>
            <div className={classes.body}>
                <h1 className={classes.title}>Experience different.</h1>
                <h5 className={classes.description}>Discover and attend unique experiences</h5>
                <div className={classes.row}>
                    <Autocomplete
                    id="city-search"
                    onInputChange={handleLocationChange}
                    options={cities}
                    loading={Boolean(cities)}
                    classes={{ paper: classes.search_list }}
                    fullWidth
                    renderInput={(params) => (
                        <TextField
                        {...params}
                        classes={{ root: classes.textField_root }}
                        placeholder="Select a city"
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
                        <button className={classes.button} onClick={handleSearch}>
                            Start exploring
                        </button>
                    </div>
                </div>
            <ReferBox/>
            </div>
            <div className={classes.image}>
                <img src={cloudinary.url('Ramble/Homepage/fireBalloon.jpeg', 
                {height: 700, width: 550, crop: 'fill', gravity: 'north', secure: true})}
                alt="Fire balloon"/>
            </div>
        </div>
    );
}

export default Landing;