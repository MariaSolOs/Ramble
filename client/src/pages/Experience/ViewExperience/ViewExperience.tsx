import { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { useQuery, gql } from '@apollo/client';

import { useLanguageContext } from '../../../context/languageContext';
import { useAppSelector, useAppDispatch } from '../../../hooks/redux';
import { fetchProfile } from '../../../store/userSlice';
import { Experience as ExperienceType } from '../../../models/experience';
import { Creator } from '../../../models/creator';
import type { Experienceable } from '../../../models/experience';
import type { Creatable } from '../../../models/creator';
import Experience from '../../../components/Experience/Experience';
import GradientButton from '../../../components/GradientButton/GradientButton';
import Spinner from '../../../components/Spinner/Spinner';

import { makeStyles } from '@material-ui/core/styles';
import styles from './ViewExperience.styles';
const useStyles = makeStyles(styles);

const GET_EXPERIENCE = gql`
    query getExp($id: String!) {
        experience(id: $id) {
            _id
            title
            description
            images
            location
            latitude
            longitude
            categories
            ageRestriction
            duration
            languages
            includedItems
            toBringItems
            capacity
            zoomPMI
            pricePerPerson
            creator {
                bio
                user {
                    photo
                    firstName
                }
            }
        }
    }
`;

type ExperienceQuery = Omit<Experienceable, 'creator'> & { creator: Creatable };

type ExperienceVariables = { id: string; }

const ViewExperience = () => {
    const { ViewExperience: text } = useLanguageContext().appText;
    const dispatch = useAppDispatch();
    
    // Retrieve experience ID from URL
    const { experienceId } = useParams<{ experienceId: string; }>();
    
    const isLoggedIn = useAppSelector(state => state.user.isLoggedIn);
    const isExpSaved = useAppSelector(state => 
        state.user.savedExperiences.includes(experienceId)
    );

    const classes = useStyles();

    // Fetch and initialize experience
    const [experience, setExperience] = useState<ExperienceType>();
    const { loading } = useQuery<{ experience: ExperienceQuery }, ExperienceVariables>(GET_EXPERIENCE, {
        variables: { id: experienceId },
        onCompleted: ({ experience }) => {
            setExperience(new ExperienceType({
                ...experience,
                creator: new Creator(experience.creator)
            }));
        }
    });

    /* If applicable, remove the temporary token and authenticate the user
       in the new tab. */
    useEffect(() => {
        const tempToken = localStorage.getItem('ramble-redirect_page_token');

        if (tempToken) {
            localStorage.removeItem('ramble-redirect_page_token');
            sessionStorage.setItem('ramble-token', tempToken);
            dispatch(fetchProfile());
        }
    }, [dispatch]);

    if (loading || !experience) {
        return <Spinner />
    }

    return (
        <>
            <Experience
            experience={experience}
            isExperienceSaved={isExpSaved}
            isUserLoggedIn={isLoggedIn}
            containerClass={classes.experienceContainer} />
            <div className={classes.footer}>
                <p className={classes.footerPriceInfo}>
                    <span className={classes.footerPrice}>
                        ${experience.pricePerPerson}
                    </span>
                    {experience.isZoomExperience ? 
                        text.perConnection : text.perPerson}
                </p>
                <GradientButton variant="experience" className={classes.bookingButton}>
                    {isLoggedIn ? text.bookExperience : text.seeDates}
                </GradientButton>
            </div>
        </>
    );
}

export default ViewExperience;