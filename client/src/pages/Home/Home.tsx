import { useState, useCallback } from 'react';
import { useQuery, gql } from '@apollo/client';
import { useHistory } from 'react-router-dom';
import { v4 as uuid } from 'uuid';

import useTokenStorage from 'hooks/useTokenStorage';
import { useAppSelector, useAppDispatch } from 'hooks/redux';
import { saveExperience, unsaveExperience } from 'store/userSlice';
import { useLanguageContext } from 'context/languageContext';

import Showplace from './Showplace';
import Footer from 'components/Footer/Footer';
import Spinner from 'components/Spinner/Spinner';
import ExperienceCard from 'components/ExperienceCard/ExperienceCard';
import Button from 'components/GradientButton/GradientButton';
import { Experience } from 'models/experience';
import type { Experienceable, ExperienceCard as ExperienceCardType } from 'models/experience';

import { makeStyles } from '@material-ui/core/styles';
import styles from './Home.styles';
const useStyles = makeStyles(styles);

const GET_EXPERIENCES = gql`
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

type ExperiencesVariables = {
    location: string;
    capacity: number;
}

const GRID_IMAGE_BASE_URL = `${process.env.REACT_APP_CLOUDINARY_BASE_URI}dpr_auto,q_auto/v1592259933/Ramble/Homepage/creatorGrid`;

const Home = () => {
    const history = useHistory();
    const dispatch = useAppDispatch();
    const { Home: text } = useLanguageContext().appText;
    const classes = useStyles();

    const [experiences, setExperiences] = useState<ExperienceCardType[]>([]);

    const { loading } = useQuery<{ experiences: Experienceable[] }, ExperiencesVariables>(GET_EXPERIENCES, {
        variables: { location: 'Montréal, Canada', capacity: 2 },
        onCompleted: ({ experiences }) => {
            // Get the 4 experiences with the highest ratings
            const bestExperiences = experiences.slice().sort((e1, e2) => 
                e1.ratingValue - e2.ratingValue
            ).splice(0, 4);

            setExperiences(bestExperiences.map(Experience.getCardInfo));
        }
    });

    const isLoggedIn = useAppSelector(state => state.user.isLoggedIn);
    const savedExperiencesIds = useAppSelector(state => state.user.savedExperiences);
    // Save the auth state when opening new tabs
    useTokenStorage(isLoggedIn);
    
    const handleHeartClick = useCallback((isSaved: boolean, experienceId: string) => {
        if (isSaved) {
            dispatch(unsaveExperience({ experienceId }));
        } else {
            dispatch(saveExperience({ experienceId }));
        }
    }, [dispatch]);

    return (
        <div className={classes.slide}>
            {loading && <Spinner />}
            <div className={classes.gridContainer}>
                <div className={classes.grid}>
                    {new Array(5).fill(0).map((_, index) => (
                        <figure key={uuid()} className={`${classes.gridItem} grid-item-${index + 1}`}>
                            <img
                            src={`${GRID_IMAGE_BASE_URL}${index + 1}.jpg`}
                            alt={`Experience grid: Item ${index}`}
                            className={classes.gridImg} />
                        </figure>
                    ))}
                    <figure className={classes.titleFigure}>
                        <h5 className={classes.gridTitle}>
                            {text.experienceTitle}
                        </h5>
                    </figure>
                </div>
                <h2 className={classes.title}>
                    {text.experienceTitle}
                </h2>
            </div>
            <div className={classes.divider} />
            <div className={classes.experienceContainer}>
                <h3 className={classes.discoverTitle}>
                    {text.discoverTitle}
                </h3>
                <div className={classes.experiences}>
                    {experiences.map(exp => {
                        const isSaved = savedExperiencesIds.includes(exp._id);

                        return (
                            <ExperienceCard
                            key={exp._id} 
                            experience={exp}
                            containerClass={classes.experienceCard}
                            isSaved={isLoggedIn ? isSaved : undefined}
                            onHeartClick={() => handleHeartClick(isSaved, exp._id)}
                            linkProps={{
                                to: `/experience/view/${exp._id}`,
                                target: '_blank',
                                rel: 'noopener noreferrer'
                            }} />
                        )}
                    )}
                </div>
            </div>
            <Button 
            variant="experience" 
            className={classes.searchButton}
            onClick={() => {
                history.push('/experience/search?location=Montréal, Canada&capacity=2');
            }}>
                {text.seeAllButton}
            </Button>
            <Showplace />
            <Footer />
        </div>
    );
}

export default Home;