import { useState, useEffect, useRef, useCallback } from 'react';
import { gql, useQuery } from '@apollo/client';

import { useLanguageContext } from '../../context/languageContext';

import InputAdornment from '@material-ui/core/InputAdornment';
import SearchIcon from '@material-ui/icons/Search';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faUsers } from '@fortawesome/free-solid-svg-icons/faUsers';
import Gallery from './Gallery';
import Autocomplete from '../../components/Autocomplete/Autocomplete';
import PlusMinusInput from '../../components/PlusMinusInput/PlusMinusInput';
import Button from '../../components/GradientButton/GradientButton';
import ReferBox from '../../components/ReferBox/ReferBox';

import { makeStyles } from '@material-ui/core/styles';
import styles from './Home.styles';
const useStyles = makeStyles(styles);

interface ExperienceData {
    location: string;
}

const GET_LOCATIONS = gql`
    query getLocations {
        experiences {
            location
        }
    }
`;

const Home = () => {
    const { Home: text } = useLanguageContext().appText;

    const classes = useStyles();

    const [locations, setLocations] = useState<string[]>([]);
    const [numPeople, setNumPeople] = useState(2);

    const { data, loading } = useQuery<{ experiences: ExperienceData[] }>(GET_LOCATIONS);

    useEffect(() => {
        if (!loading && data) {
            const allLocations = data.experiences.map(({ location }) => location);
            setLocations([ ...new Set(allLocations) ]);
        }
    }, [loading, data]);

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
                        options={['Online', ...locations!]}
                        loading={Boolean(locations)}
                        fullWidth
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
                        value={numPeople}
                        onValueChange={val => setNumPeople(val)}
                        getLabel={num => 
                            num > 1? text.peopleButtonLabel : text.personButtonLabel 
                        }
                        inputProps={{
                            startAdornment: (
                                <FontAwesomeIcon icon={faUsers} />
                            )
                        }} />
                        <Button buttonType="experience" className={classes.searchButton}>
                            {text.exploreButton}
                        </Button>
                    </div>
                    <ReferBox />
                </div>
                <div className={classes.imageContainer}>
                    <img
                    src={`${process.env.REACT_APP_CLOUDINARY_BASE_URI}c_fill,g_north,h_700,w_550/v1612149396/Ramble/Homepage/cocktailparty.jpg`}
                    alt="Cocktail party"
                    className={classes.image} />
                </div>
            </div>
            <Gallery onImageClick={handleSearchFocus} />
        </div>
    );
}

export default Home;