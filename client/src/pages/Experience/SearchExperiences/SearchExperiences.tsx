import { useEffect, useCallback } from 'react';
import { useQuery, gql } from '@apollo/client';
import { useLocation, useHistory } from 'react-router-dom';

import useSearchReducer from './searchReducer';
import { useLanguageContext } from '../../../context/languageContext';
import { useAppDispatch } from '../../../hooks/redux';
import { openErrorDialog } from '../../../store/uiSlice';
import type { SearchState } from './searchReducer';
import type { Experience } from '../../../models/experience';

import InputAdornment from '@material-ui/core/InputAdornment';
import LocationOnIcon from '@material-ui/icons/LocationOn';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faUsers } from '@fortawesome/free-solid-svg-icons/faUsers';
import Autocomplete from '../../../components/Autocomplete/Autocomplete';
import PlusMinusInput from '../../../components/PlusMinusInput/PlusMinusInput';
import Spinner from '../../../components/Spinner/Spinner';
import Button from '../../../components/GradientButton/GradientButton';

import { makeStyles } from '@material-ui/core/styles';
import styles from './SearchExperiences.styles';
const useStyles = makeStyles(styles);

const FETCH_EXPERIENCES = gql`
    query getExperiences($location: String!, $capacity: Int) {
        experiences(location: $location, capacity: $capacity, status: APPROVED) {
            _id
            title
            images
            pricePerPerson
            ratingValue
            numberOfRatings
            location
            zoomPMI
            creator {
                _id
            }
        }
    }
`;
type ExperiencesVariables = {
    location: string;
    capacity: number;
}

const SearchExperiences = () => {
    const { SearchExperiences: text } = useLanguageContext().appText;

    const classes = useStyles();

    const history = useHistory();
    const location = useLocation<{ locationList: string[] }>();
    const dispatch = useAppDispatch();

    // Retrieve experiences from URL
    const query = new URLSearchParams(location.search);
    const locationQuery = query.get('location')!;
    const capacityQuery = +query.get('capacity')!;

    const initialState: SearchState = {
        location: locationQuery, 
        capacity: capacityQuery,
        titleFilter: '',
        allExperiences: [],
        filteredExperiences: []
    }
    const [searchState, searchDispatch] = useSearchReducer(initialState);

    const { 
        loading, 
        error, 
        data
    } = useQuery<{ experiences: Experience[] }, ExperiencesVariables>(FETCH_EXPERIENCES, {
        variables: { location: locationQuery, capacity: capacityQuery }
    });

    // Initialize the gallery with fetched experiences
    useEffect(() => {
        if (!loading && data) {
            searchDispatch({
                type: 'SET_EXPERIENCES',
                experiences: data.experiences
            });
        }
    }, [loading, data, searchDispatch]);

    // To avoid infinite loops, manage capacity with a callback
    const handleCapacityChange = useCallback((capacity: number) => {
        searchDispatch({ type: 'UPDATE_CAPACITY', capacity });
    }, [searchDispatch]);

    if (loading) {
        return <Spinner />
    }

    if (error) {
        dispatch(openErrorDialog({
            message: 'We cannot find your experiences right now...'
        }));
        setTimeout(() => {
            history.replace('/');
        }, 3000);
    }

    return (
        <div className={classes.root}>
            <div className={classes.searchContainer}>
                <Autocomplete
                className={classes.autocomplete}
                value={searchState.location}
                options={['Online', ...location.state.locationList]}
                onChange={(_, value, reason) => {
                    if (reason === 'select-option') {
                        searchDispatch({
                            type: 'UPDATE_LOCATION',
                            location: value
                        });
                    }
                }}
                inputprops={{
                    startAdornment: (
                        <InputAdornment position="start">
                            <LocationOnIcon />
                        </InputAdornment>
                    )
                }} />
                <PlusMinusInput
                containerStyles={classes.capacityInput}
                value={searchState.capacity}
                step={1}
                minValue={1}
                getLabel={num => 
                    num > 1? text.peopleButtonLabel : text.personButtonLabel 
                }
                onValueChange={handleCapacityChange}
                inputProps={{
                    startAdornment: <FontAwesomeIcon icon={faUsers} />
                }} />
                <Button className={classes.searchButton} variant="experience">
                    {text.search}
                </Button>
            </div>
        </div>
    );
}

export default SearchExperiences;