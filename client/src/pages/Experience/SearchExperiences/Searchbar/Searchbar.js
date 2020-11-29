import React, {useState} from 'react';
import useNumberField from '../../../../hooks/useNumberField/useNumberField';
import useLocations from '../../../../hooks/useLocations';

//Components and icons
import Autocomplete from '@material-ui/lab/Autocomplete';
import TextField from '@material-ui/core/TextField';
import InputBase from '@material-ui/core/InputBase';
import InputAdornment from '@material-ui/core/InputAdornment';
import LocationOnIcon from '@material-ui/icons/LocationOn';
import SearchIcon from '@material-ui/icons/Search';
import {FontAwesomeIcon} from '@fortawesome/react-fontawesome';
import {faUsers} from '@fortawesome/free-solid-svg-icons/faUsers';

//Styles
import {makeStyles} from '@material-ui/core/styles';
import styles from './SearchbarStyles';
const useStyles = makeStyles(styles);

const Searchbar = (props) => {
    const classes = useStyles();

    const locations = useLocations();
    //For updating location and numPeople changes
    const [location, setLocation] = useState(props.location || 'Montreal, Canada');
    const handleLocationChange = (event, value, reason) => {
        if(reason === 'reset') { setLocation(value); }
    }
    const [numPeople, NumPeopleField] = useNumberField({
        min: 1, 
        step: 1,
        initval: props.numPeople || 1,
        getlabel: num => num > 1? 'People' : 'Person',  
        startadornment: <FontAwesomeIcon icon={faUsers}/>,
    });

    //For new search queries, call parents function to update gallery
    const handleNewQuery = () => {
        props.onQueryChange(location, numPeople);
    }
    const handleNewTitle = (e) => { props.onTitleChange(e.target.value); }
    
    return (
        <div className={classes.root}>
            <div>
                <div className="locSearchbar">
                    <Autocomplete
                    id="location-query"
                    value={location}
                    loading={Boolean(locations)}
                    options={locations}
                    onInputChange={handleLocationChange}
                    classes={{ paper: classes.search_list }}
                    renderInput={(params) => (
                        <TextField
                        {...params}
                        classes={{ root: classes.textField_root }}
                        InputProps={{
                            ...params.InputProps,
                            disableUnderline: true,
                            classes: { root: classes.input_root },
                            startAdornment: <InputAdornment position="start">
                                                <LocationOnIcon/>
                                            </InputAdornment>
                        }}/>
                    )}/>
                </div>
                <div className="numField">{NumPeopleField}</div>
                <button className={classes.button} onClick={handleNewQuery}>
                    Search
                </button>
            </div>
            <div>
                <InputBase
                value={props.title}
                onChange={handleNewTitle}
                className={classes.titleSearch}
                placeholder="Search experiences"
                startAdornment={<InputAdornment>
                                    <SearchIcon/>
                                </InputAdornment>}/>
            </div>
        </div>
    );
}

export default Searchbar;