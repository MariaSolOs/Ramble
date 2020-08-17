import React, {useState} from 'react';
import {useHistory} from 'react-router-dom';
import useNumberField from '../../../hooks/useNumberField';
import useLocations from '../../../hooks/useLocations';

//Components and icons
import ReferBox from '../../../components/ReferBox/ReferBox';
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

    const locations = useLocations();
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
        history.push(`/experience/search?location=${location}&numPeople=${numPeople}`);
    }

    return (
        <div className={classes.root}>
            <div className={classes.body}>
                <h1 className={classes.title}>Experience different.</h1>
                <h5 className={classes.description}>Discover and attend unique experiences</h5>
                <div className={classes.row}>
                    <Autocomplete
                    id="location-search"
                    onInputChange={handleLocationChange}
                    options={locations || []}
                    loading={Boolean(locations)}
                    classes={{ paper: classes.search_list }}
                    fullWidth
                    renderInput={(params) => (
                        <TextField
                        {...params}
                        classes={{ root: classes.textField_root }}
                        placeholder="Select a city"
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
                        <button className={classes.button} onClick={handleSearch}>
                            Start exploring
                        </button>
                    </div>
                </div>
            <ReferBox shareUrl={process.env.REACT_APP_SERVER}/>
            </div>
            <div className={classes.image}>
                <img src={`https://res.cloudinary.com/${process.env.REACT_APP_CLOUDINARY_CLOUDNAME}/image/upload/c_fill,g_north,h_700,w_550/v1/Ramble/Homepage/fireBalloon.jpeg`}
                alt="Fire balloon"/>
            </div>
        </div>
    );
}

export default Landing;