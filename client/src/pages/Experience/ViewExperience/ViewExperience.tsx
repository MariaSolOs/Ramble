import { useState, useEffect } from 'react';
import { useParams, useHistory } from 'react-router-dom';

import { updateToken } from 'utils/auth';
import { useGetExperienceQuery, useGetCoreProfileLazyQuery } from 'graphql-api';
import { useLanguageContext } from 'context/languageContext';
import { useAppSelector, useAppDispatch } from 'hooks/redux';
import useHeartClick from 'hooks/useHeartClick';
import { setProfile } from 'store/userSlice';
import { openSignUpDialog } from 'store/uiSlice';
import { Experience as ExperienceType } from 'models/experience';
import type { Creator } from 'models/creator';

import Experience from 'components/Experience/Experience';
import ShareExperienceDialog from 'components/ShareExperienceDialog/ShareExperienceDialog';
import GradientButton from 'components/GradientButton/GradientButton';
import Spinner from 'components/Spinner/Spinner';

import { makeStyles } from '@material-ui/core/styles';
import styles from './ViewExperience.styles';
const useStyles = makeStyles(styles);

const ViewExperience = () => {
    const { ViewExperience: text } = useLanguageContext().appText;
    const dispatch = useAppDispatch();
    const handleHeartClick = useHeartClick();
    const history = useHistory();
    
    // Retrieve experience ID from URL
    const { experienceId } = useParams<{ experienceId: string; }>();
    
    const isLoggedIn = useAppSelector(state => state.user.isLoggedIn);
    const isExpSaved = useAppSelector(state => 
        state.user.savedExperiences.includes(experienceId)
    );

    const classes = useStyles();

    // Fetch and initialize experience and creator
    const [experience, setExperience] = useState<ExperienceType>();
    const [creator, setCreator] = useState<Creator>();
    const [openShareDialog, setOpenShareDialog] = useState(false);

    // For logging the user back 
    const [fetchProfile] = useGetCoreProfileLazyQuery({
        onCompleted: ({ me }) => {
            /* If we reach this point, the user for sure 
                didn't choose the "remember me option", so save
                token in session storage. */
            updateToken(me.token!, false);
            dispatch(setProfile(me));
        }
    });

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

    /* If applicable, remove the temporary token and authenticate the user
       in the new tab. */
    useEffect(() => {
        const tempToken = localStorage.getItem('ramble-redirect_page_token');

        if (tempToken) {
            localStorage.removeItem('ramble-redirect_page_token');
            sessionStorage.setItem('ramble-token', tempToken);
            fetchProfile();
        }
    }, [fetchProfile]);

    const handleBookingClick = () => {
        if (isLoggedIn) {
            history.push(`/experience/booking/${experienceId}`);
        } else {
            dispatch(openSignUpDialog());
        }
    }

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
            onHeartClick={() => handleHeartClick(isExpSaved, experienceId)}
            onShareClick={() => setOpenShareDialog(true)}
            containerClass={classes.experienceContainer} />
            <div className={classes.footer}>
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
                onClick={handleBookingClick}>
                    {text.bookExperience}
                </GradientButton>
            </div>
        </>
    );
}

export default ViewExperience;