import { useState } from 'react';
import { useParams, useHistory } from 'react-router-dom';
import { useReactiveVar } from '@apollo/client';

import { useGetExperienceQuery } from 'graphql-api';
import { useLanguageContext } from 'context/languageContext';
import useHeartClick from 'hooks/useHeartClick';
import { Experience as ExperienceType } from 'models/experience';
import type { Creator } from 'models/creator';
import { userProfileVar, savedExperiencesVar } from 'store/user-cache';

import Experience from 'components/Experience/Experience';
import ShareExperienceDialog from 'components/ShareExperienceDialog/ShareExperienceDialog';
import GradientButton from 'components/GradientButton/GradientButton';
import Spinner from 'components/Spinner/Spinner';

import { makeStyles } from '@material-ui/core/styles';
import styles from './ViewExperience.styles';
const useStyles = makeStyles(styles);

const ViewExperience = () => {
    const { ViewExperience: text } = useLanguageContext().appText;
    const handleHeartClick = useHeartClick();
    const history = useHistory();
    const classes = useStyles();
    
    // Retrieve experience ID from URL
    const { experienceId } = useParams<{ experienceId: string; }>();
    const isLoggedIn = Boolean(useReactiveVar(userProfileVar).userId);
    const isExpSaved = useReactiveVar(savedExperiencesVar).includes(experienceId);

    // Fetch and initialize experience and creator
    const [experience, setExperience] = useState<ExperienceType>();
    const [creator, setCreator] = useState<Creator>();
    const [openShareDialog, setOpenShareDialog] = useState(false);

    const { loading } = useGetExperienceQuery({
        variables: { id: experienceId },
        onCompleted: ({ experience }) => {
            const { creator, ...experienceInfo } = experience;
            setExperience(new ExperienceType(experienceInfo));
            setCreator({
                name: creator.user.firstName,
                photo: creator.user.photo!,
                bio: creator.bio!
            });
        },
        onError: (error) => console.error(error)
    });

    if (loading || !experience) {
        return <Spinner />
    }

    return (
        <>
            <ShareExperienceDialog 
            open={openShareDialog}
            onClose={() => setOpenShareDialog(false)}
            experienceTitle={experience.title} />
            <Experience
            experience={experience}
            creator={creator!}
            isExperienceSaved={isExpSaved}
            onHeartClick={
                isLoggedIn ?
                    () => handleHeartClick(isExpSaved, experienceId) : undefined
            }
            onShareClick={() => setOpenShareDialog(true)}
            containerClass={classes.experienceContainer} />
            <footer className={classes.footer}>
                <p className={classes.footerPriceInfo}>
                    <span className={classes.footerPrice}>
                        ${experience.pricePerPerson}
                    </span>
                    {experience.isZoomExperience ? 
                        text.perConnection : text.perPerson}
                </p>
                <GradientButton 
                variant="experience" 
                className={classes.bookingButton}
                onClick={() => {
                    history.push(`/experience/booking/${experienceId}`);
                }}>
                    {text.bookExperience}
                </GradientButton>
            </footer>
        </>
    );
}

export default ViewExperience;