import { useState } from 'react';
import { useHistory } from 'react-router-dom';
import { v4 as uuid } from 'uuid';
import { useReactiveVar } from '@apollo/client';

import { useGetExperiencesQuery } from 'graphql-api';
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

const GRID_IMAGES = [
    `${process.env.REACT_APP_CLOUDINARY_BASE_URI}dpr_auto,q_auto/v1628201003/Ramble/Homepage/homeGrid1.jpg`,
    `${process.env.REACT_APP_CLOUDINARY_BASE_URI}dpr_auto,q_auto/v1628200960/Ramble/Homepage/homeGrid2.jpg`,
    `${process.env.REACT_APP_CLOUDINARY_BASE_URI}dpr_auto,q_auto/v1628200812/Ramble/Homepage/homeGrid3.jpg`,
    `${process.env.REACT_APP_CLOUDINARY_BASE_URI}dpr_auto,q_auto/v1628201061/Ramble/Homepage/homeGrid4.jpg`,
    `${process.env.REACT_APP_CLOUDINARY_BASE_URI}dpr_auto,q_auto/v1628200898/Ramble/Homepage/homeGrid5.jpg`
] as const;

const FEATURED_EXPERIENCES_IDS = [
    '610acbb332b5150004b20c9f',
    '60c50206daa7aa0017ca9c61', 
    '6069e90709d1ae00172f4ea4',
    '610c38c8e608d800042db49a'
];

const Home = () => {
    const { Home: text } = useLanguageContext().appText;
    const classes = useStyles();
    const history = useHistory();

    const [experiences, setExperiences] = useState<ExperienceCardType[]>([]);

    const { loading } = useGetExperiencesQuery({
        onCompleted: ({ experiences }) => {
            // Get the 4 experiences with the highest ratings
            const bestExperiences = experiences.slice().filter(({ _id }) => 
                FEATURED_EXPERIENCES_IDS.includes(_id)
            );  
    
            setExperiences(bestExperiences.map(Experience.getCardInfo));
        }
    });

    const isLoggedIn = Boolean(useReactiveVar(userProfileVar).userId);
    const savedExperiencesIds = savedExperiencesVar();
    const handleHeartClick = useHeartClick();

    return (
        <div className={classes.slide}>
            {loading && <Spinner />}
            <div className={classes.gridContainer}>
                <div className={classes.grid}>
                    {GRID_IMAGES.map((url, index) => (
                        <figure key={uuid()} className={`${classes.gridItem} grid-item-${index + 1}`}>
                            <img
                            src={url}
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