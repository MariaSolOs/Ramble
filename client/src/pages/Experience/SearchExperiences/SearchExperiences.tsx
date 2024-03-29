import { useCallback, useEffect } from 'react';
import { useLocation, useHistory } from 'react-router-dom';
import { useReactiveVar } from '@apollo/client';

import { useGetExperiencesQuery, useGetLocationsQuery } from 'graphql-api';
import { useUiContext } from 'context/uiContext';
import useSearchReducer from './searchReducer';
import useHeartClick from 'hooks/useHeartClick';
import { Experience } from 'models/experience';
import type { SearchState } from './searchReducer';
import { userProfileVar, savedExperiencesVar } from 'store/user-cache';

import { TransitionGroup, CSSTransition } from 'react-transition-group';
import Searchbar from './Searchbar';
import ExperienceCard from 'components/ExperienceCard/ExperienceCard';
import Spinner from 'components/Spinner/Spinner';

import { makeStyles } from '@material-ui/core/styles';
import styles from './SearchExperiences.styles';
const useStyles = makeStyles(styles);

const SearchExperiences = () => {
    const classes = useStyles();

    const { uiDispatch } = useUiContext();
    const history = useHistory();
    const location = useLocation();

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
    } = useGetLocationsQuery({
        onCompleted: ({ experiences }) => {
            const allLocations = experiences.map(({ location }) => location);
            searchDispatch({ 
                type: 'SET_LOCATIONS', 
                locations: [ ...new Set(allLocations) ]
            });
        }}
    );

    const {
        error: experiencesError,
        refetch: refetchExperiences
    } = useGetExperiencesQuery({
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

    // Refetch experiences when the URL changes
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
        uiDispatch({
            type: 'OPEN_ERROR_DIALOG',
            message: 'We cannot find your experiences right now...'
        })
        setTimeout(() => {
            history.replace('/');
        }, 3000);
    }

    const isLoggedIn = Boolean(useReactiveVar(userProfileVar).userId);
    const savedExperiencesIds = useReactiveVar(savedExperiencesVar);
    const handleHeartClick = useHeartClick();

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
                                onHeartClick={isLoggedIn ?
                                    () => handleHeartClick(isSaved, exp._id) : undefined
                                } />
                            </div>
                        </CSSTransition>
                    );
                })}
            </TransitionGroup>
        </div>
    );
}

export default SearchExperiences;