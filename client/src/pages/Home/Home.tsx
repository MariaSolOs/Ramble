import { useState, useEffect, useRef, useCallback } from 'react';
import { gql, useQuery } from '@apollo/client';
import { useHistory } from 'react-router-dom';

import { useLanguageContext } from '../../context/languageContext';

import InputAdornment from '@material-ui/core/InputAdornment';
import SearchIcon from '@material-ui/icons/Search';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faUsers } from '@fortawesome/free-solid-svg-icons/faUsers';
import Showplace from './Showplace';
import Footer from '../../components/Footer/Footer';
import Autocomplete from '../../components/Autocomplete/Autocomplete';
import PlusMinusInput from '../../components/PlusMinusInput/PlusMinusInput';
import Button from '../../components/GradientButton/GradientButton';

import { makeStyles } from '@material-ui/core/styles';
import styles from './Home.styles';
const useStyles = makeStyles(styles);

interface ExperienceData {
    location: string;
}

const GET_LOCATIONS = gql`
    query getLocations {
        experiences(status: APPROVED) {
            location
        }
    }
`;

const Home = () => {
    const { Home: text } = useLanguageContext().appText;

    const classes = useStyles();

    const [locationList, setLocationList] = useState<string[]>([]);
    const [location, setLocation] = useState('Online');
    const [capacity, setCapacity] = useState(2);

    const history = useHistory();

    const { data, loading } = useQuery<{ experiences: ExperienceData[] }>(GET_LOCATIONS);

    // Display unique list of locations
    useEffect(() => {
        if (!loading && data) {
            const allLocations = data.experiences.map(({ location }) => location);
            setLocationList([ ...new Set(allLocations) ]);
            // Set Montreal as the default
            setLocation('Montréal, Canada');
        }
    }, [loading, data]);

    // When clicking on images, focus searchbar
    const searchRef = useRef<HTMLInputElement>();
    const handleSearchFocus = useCallback(() => {
        if (searchRef.current) {
            searchRef.current.focus();
        }
    }, []);

    return (
        <div className={classes.slide}>
            <div className={classes.slideContent}>
                <div className={classes.searchBody}>
                    <h1 className={classes.title}>{text.searchTitle}</h1>
                    <h5 className={classes.subtitle}>{text.searchSubtitle}</h5>
                    <div className={classes.searchBodyRow}>
                        <Autocomplete
                        options={['Online', ...locationList!]}
                        loading={locationList.length === 0}
                        fullWidth
                        value={location}
                        onChange={(_, value, reason) => {
                            if (reason === 'select-option') {
                                setLocation(value);
                            }
                        }}
                        textfieldprops={{
                            placeholder: text.searchbarPlaceholder,
                            inputRef: searchRef
                        }}
                        inputprops={{
                            startAdornment: (
                                <InputAdornment position="start">
                                    <SearchIcon />
                                </InputAdornment> 
                            )
                        }} />
                    </div>
                    <div className={classes.searchBodyRow}>
                        <PlusMinusInput
                        containerStyles={classes.peopleInput}
                        step={1}
                        minValue={1}
                        value={capacity}
                        onValueChange={val => setCapacity(val)}
                        getLabel={num => 
                            num > 1? text.peopleButtonLabel : text.personButtonLabel 
                        }
                        inputProps={{
                            startAdornment: <FontAwesomeIcon icon={faUsers} />
                        }} />
                        <Button 
                        variant="experience" 
                        className={classes.searchButton}
                        onClick={() => {
                            history.push(
                                `/experience/search?location=${location}&capacity=${capacity}`, {
                                locationList
                            });
                        }}>
                            {text.exploreButton}
                        </Button>
                    </div>
                </div>
                <div className={classes.imageContainer}>
                    <img
                    src={`${process.env.REACT_APP_CLOUDINARY_BASE_URI}c_fill,g_north,h_700,w_550/v1612149396/Ramble/Homepage/cocktailparty.jpg`}
                    alt="Cocktail party"
                    className={classes.image} />
                </div>
            </div>
            <Showplace onImageClick={handleSearchFocus} />
            <Footer />
        </div>
    );
}

export default Home;