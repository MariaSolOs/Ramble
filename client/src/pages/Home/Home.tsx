import { useState } from 'react';
import { useQuery, gql } from '@apollo/client';
import { useHistory } from 'react-router-dom';
import { v4 as uuid } from 'uuid';

import { useLanguageContext } from '../../context/languageContext';

import Showplace from './Showplace';
import Footer from '../../components/Footer/Footer';
import Spinner from '../../components/Spinner/Spinner';
import ExperienceCard from '../../components/ExperienceCard/ExperienceCard';
import Button from '../../components/GradientButton/GradientButton';
import { Experience } from '../../models/experience';
import type { Experienceable, ExperienceCard as ExperienceCardType } from '../../models/experience';

import { makeStyles } from '@material-ui/core/styles';
import styles from './Home.styles';
const useStyles = makeStyles(styles);

const GET_EXPERIENCES = gql`
    query getExperiences {
        experiences(location: "Montréal, Canada", capacity: 2, status: APPROVED) {
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

const GRID_IMAGE_BASE_URL = `${process.env.REACT_APP_CLOUDINARY_BASE_URI}dpr_auto,q_auto/v1592259933/Ramble/Homepage/creatorGrid`;

const Home = () => {
    const { Home: text } = useLanguageContext().appText;

    const history = useHistory();

    const classes = useStyles();

    const [experiences, setExperiences] = useState<ExperienceCardType[]>([]);

    const { loading } = useQuery<{ experiences: Experienceable[] }>(GET_EXPERIENCES, {
        onCompleted: ({ experiences }) => {
            // Get the 4 experiences with the highest ratings
            const bestExperiences = experiences.slice().sort((e1, e2) => 
                e1.ratingValue - e2.ratingValue
            ).splice(0, 4);

            setExperiences(bestExperiences.map(exp => new Experience(exp).getCardInfo()));
        }
    });

    return (
        <div className={classes.slide}>
            {loading && <Spinner />}
            <div className={classes.gridContainer}>
                <div className={classes.grid}>
                    {new Array(5).fill(0).map((_, index) => (
                        <figure key={uuid()} className={`${classes.gridItem} grid-item-${index + 1}`}>
                            <img
                            src={`${GRID_IMAGE_BASE_URL}${index + 1}.png`}
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
            <div className={classes.experiences}>
                {experiences.map(exp => 
                    <ExperienceCard
                    key={exp._id} 
                    experience={exp}
                    containerClass={classes.experienceCard} />
                )}
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