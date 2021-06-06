import { useCallback, useEffect } from 'react';
import { useQuery, gql } from '@apollo/client';
import { useLocation, useHistory } from 'react-router-dom';

import useSearchReducer from './searchReducer';
import { useAppSelector, useAppDispatch } from '../../../hooks/redux';
import { openErrorDialog } from '../../../store/uiSlice';
import { saveExperience, unsaveExperience } from '../../../store/userSlice';
import { Experience } from '../../../models/experience';
import type { SearchState } from './searchReducer';
import type { Experienceable } from '../../../models/experience';

import { TransitionGroup, CSSTransition } from 'react-transition-group';
import Searchbar from './Searchbar';
import ExperienceCard from '../../../components/ExperienceCard/ExperienceCard';
import Spinner from '../../../components/Spinner/Spinner';

import { makeStyles } from '@material-ui/core/styles';
import styles from './SearchExperiences.styles';
const useStyles = makeStyles(styles);

const GET_LOCATIONS = gql`
    query getLocations {
        experiences {
            location
        }
    }
`;

const FETCH_EXPERIENCES = gql`
    query getExperiences($location: String!, $capacity: Int) {
        experiences(location: $location, capacity: $capacity) {
            _id
            title
            images
            pricePerPerson
            ratingValue
            numberOfRatings
            location
            zoomPMI
        }
    }
`;

type LocationData = { location: string; }[];

type ExperiencesVariables = {
    location: string;
    capacity: number;
}

const SearchExperiences = () => {
    const classes = useStyles();

    const history = useHistory();
    const location = useLocation();
    const dispatch = useAppDispatch();

    // Retrieve experiences from URL
    const query = new URLSearchParams(location.search);
    const locationQuery = query.get('location')!;
    const capacityQuery = +query.get('capacity')!;

    const initialState: SearchState = {
        locationList: [],
        location: locationQuery, 
        capacity: capacityQuery,
        titleFilter: '',
        allExperiences: [],
        filteredExperiences: []
    }
    const [searchState, searchDispatch] = useSearchReducer(initialState);

    const { 
        loading: locationsLoading 
    } = useQuery<{ experiences: LocationData }>(GET_LOCATIONS, {
        onCompleted: ({ experiences }) => {
            const allLocations = experiences.map(({ location }) => location);
            searchDispatch({ 
                type: 'SET_LOCATIONS', 
                locations: [ ...new Set(allLocations) ]
            });
        }
    });

    const { 
        error: experiencesError,
        refetch: refetchExperiences
    } = useQuery<{ experiences: Experienceable[] }, ExperiencesVariables>(FETCH_EXPERIENCES, {
        variables: { location: locationQuery, capacity: capacityQuery },
        onCompleted: ({ experiences }) => {
            searchDispatch({ 
                type: 'SET_EXPERIENCES', 
                location: locationQuery,
                capacity: capacityQuery,
                experiences: experiences.map(Experience.getCardInfo)
            });
        }
    });

    // To avoid infinite loops, manage capacity with a callback
    const handleCapacityChange = useCallback((capacity: number) => {
        searchDispatch({ type: 'UPDATE_CAPACITY', capacity });
    }, [searchDispatch]);

    // Refetch experiences when the  changes
    useEffect(() => {
        refetchExperiences();
    }, [locationQuery, capacityQuery, refetchExperiences]);

    useEffect(() => {
        /* For a smoother effect, wait until user stops writing before
           updating the gallery. */
        const timeout = setTimeout(() => {
            let filteredExperiences = searchState.allExperiences;

            if (searchState.titleFilter.length > 0) {
                filteredExperiences = searchState.allExperiences.filter(exp => 
                    exp.title.toLowerCase().includes(searchState.titleFilter.toLowerCase())
                );
            }

            searchDispatch({ type: 'SET_FILTERED_EXPERIENCES', filteredExperiences });
        }, 500);

        return () => clearTimeout(timeout);
    }, [searchDispatch, searchState.titleFilter, searchState.allExperiences]);

    // When experiences cannot be loaded, show message and go to the homepage
    if (experiencesError) {
        dispatch(openErrorDialog({
            message: 'We cannot find your experiences right now...'
        }));
        setTimeout(() => {
            history.replace('/');
        }, 3000);
    }

    const isLoggedIn = useAppSelector(state => state.user.isLoggedIn);
    const savedExperiencesIds = useAppSelector(state => state.user.savedExperiences);

    const handleHeartClick = useCallback((isSaved: boolean, experienceId: string) => {
        if (isSaved) {
            dispatch(unsaveExperience({ experienceId }));
        } else {
            dispatch(saveExperience({ experienceId }));
        }
    }, [dispatch]);

    /* If the user has a token in session storage, it will be lost when going
       to a new tab, and so we temporarily store it in local storage. */
    useEffect(() => {
        const tokenInSessionStorage = sessionStorage.getItem('ramble-token');
        if (tokenInSessionStorage) {
            localStorage.setItem('ramble-redirect_page_token', tokenInSessionStorage);
        }
    }, [isLoggedIn]);

    return (
        <div className={classes.root}>
            {locationsLoading && <Spinner />}
            <Searchbar
            location={searchState.location}
            locationList={searchState.locationList}
            onLocationChange={location => {
                searchDispatch({ type: 'UPDATE_LOCATION', location });
            }}
            capacity={searchState.capacity}
            onCapacityChange={handleCapacityChange}
            titleFilter={searchState.titleFilter}
            onTitleFilterChange={titleFilter => {
                searchDispatch({ type: 'UPDATE_TITLE_FILTER', titleFilter })
            }} />
            <TransitionGroup className={classes.experiences}>
                {searchState.filteredExperiences.map((exp, index) => {
                    const isSaved = savedExperiencesIds.includes(exp._id);

                    return (
                        <CSSTransition
                        key={exp._id}
                        timeout={300}
                        classNames={{
                            enter: classes.cardFadeOut,
                            enterActive: classes.cardFadeIn,
                            exit: classes.cardFadeIn,
                            exitActive: classes.cardFadeOut
                        }}>
                            <div style={{ transitionDelay: `${index * 70}ms` }}>
                                <ExperienceCard
                                experience={exp}
                                containerClass={classes.experienceCard}
                                isSaved={isLoggedIn ? isSaved : undefined}
                                onHeartClick={() => handleHeartClick(isSaved, exp._id)}
                                linkProps={{
                                    to: `/experience/view/${exp._id}`,
                                    target: '_blank',
                                    rel: 'noopener noreferrer'
                                }} />
                            </div>
                        </CSSTransition>
                    );
                })}
            </TransitionGroup>
        </div>
    );
}

export default SearchExperiences;