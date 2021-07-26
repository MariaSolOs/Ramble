import { useState } from 'react';
import { useHistory } from 'react-router-dom';
import { v4 as uuid } from 'uuid';
import { useReactiveVar } from '@apollo/client';

import { useGetExperiencesQuery } from 'graphql-api';
import useTokenStorage from 'hooks/useTokenStorage';
import useHeartClick from 'hooks/useHeartClick';
import { useLanguageContext } from 'context/languageContext';
import { userProfileVar, savedExperiencesVar } from 'store/user-cache';

import Showplace from './Showplace';
import Footer from 'components/Footer/Footer';
import Spinner from 'components/Spinner/Spinner';
import ExperienceCard from 'components/ExperienceCard/ExperienceCard';
import Button from 'components/GradientButton/GradientButton';
import { Experience } from 'models/experience';
import type { ExperienceCard as ExperienceCardType } from 'models/experience';

import { makeStyles } from '@material-ui/core/styles';
import styles from './Home.styles';
const useStyles = makeStyles(styles);

const GRID_IMAGE_BASE_URL = `${process.env.REACT_APP_CLOUDINARY_BASE_URI}dpr_auto,q_auto/v1592259933/Ramble/Homepage/creatorGrid`;

const Home = () => {
    const { Home: text } = useLanguageContext().appText;
    const classes = useStyles();
    const history = useHistory();

    const [experiences, setExperiences] = useState<ExperienceCardType[]>([]);

    const { loading } = useGetExperiencesQuery({
        variables: { 
            location: 'Montréal, Canada', capacity: 2
        },
        onCompleted: ({ experiences }) => {
            // TODO: Optimize this by getting featured experiences
            // Get the 4 experiences with the highest ratings
            const bestExperiences = experiences.slice().sort((e1, e2) => 
                e1.ratingValue - e2.ratingValue
            ).splice(0, 4);
    
            setExperiences(bestExperiences.map(Experience.getCardInfo));
        }
    });

    const isLoggedIn = Boolean(useReactiveVar(userProfileVar).userId);
    const savedExperiencesIds = savedExperiencesVar();
    const handleHeartClick = useHeartClick();

    // Save the auth state when opening new tabs
    useTokenStorage(isLoggedIn);

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
                            onHeartClick={isLoggedIn ? 
                                () => handleHeartClick(isSaved, exp._id) : undefined
                            } />
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