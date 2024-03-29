import { useEffect } from 'react';
import { useHistory } from 'react-router-dom';

import { useLanguageContext } from 'context/languageContext';

import InputBase from '@material-ui/core/InputBase';
import InputAdornment from '@material-ui/core/InputAdornment';
import LocationOnIcon from '@material-ui/icons/LocationOn';
import SearchIcon from '@material-ui/icons/Search';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faUsers } from '@fortawesome/free-solid-svg-icons/faUsers';
import Autocomplete from 'components/Autocomplete/Autocomplete';
import PlusMinusInput from 'components/PlusMinusInput/PlusMinusInput';
import Button from 'components/GradientButton/GradientButton';

import { makeStyles } from '@material-ui/core/styles';
import styles from './Searchbar.styles';
const useStyles = makeStyles(styles);

type Props = {
    location: string;
    locationList: string[];
    onLocationChange: (loc: string) => void;
    capacity: number;
    onCapacityChange: (cap: number) => void;
    titleFilter: string;
    onTitleFilterChange: (title: string) => void;
}

const Searchbar = (props: Props) => {
    const { SearchExperiences_Searchbar: text } = useLanguageContext().appText;
    const history = useHistory();

    const classes = useStyles();

    // To always load the page at the top
    useEffect(() => {
        window.scrollTo(0, 0);
    }, []); 

    return (
        <>
            <div className={classes.searchContainer}>
                <Autocomplete
                className={classes.autocomplete}
                value={props.location}
                loading={props.locationList.length === 0}
                options={['Online', ...props.locationList]}
                onChange={(_, value, reason) => {
                    if (reason === 'select-option') {
                        props.onLocationChange(value);
                    }
                }}
                inputprops={{
                    startAdornment: (
                        <InputAdornment position="start">
                            <LocationOnIcon />
                        </InputAdornment>
                    )
                }} />
                <div className={classes.collapsibleRow}>
                    <PlusMinusInput
                    containerClass={classes.capacityInput}
                    value={props.capacity}
                    step={1}
                    minValue={1}
                    getLabel={num => 
                        num > 1? text.peopleButtonLabel : text.personButtonLabel 
                    }
                    onValueChange={props.onCapacityChange}
                    inputProps={{
                        startAdornment: <FontAwesomeIcon icon={faUsers} />
                    }} />
                    <Button 
                    className={classes.searchButton} 
                    variant="experience"
                    onClick={() => {
                        history.push(`/experience/search?location=${props.location}&capacity=${props.capacity}`);
                    }}>
                        {text.search}
                    </Button>
                </div>
            </div>
            <InputBase
            value={props.titleFilter}
            onChange={event => props.onTitleFilterChange(event.target.value)}
            placeholder={text.titlePlaceholder}
            className={classes.titleSearchbar}
            startAdornment={
                <InputAdornment position="start">
                    <SearchIcon />
                </InputAdornment>
            } />
        </>
    );
}

export default Searchbar;