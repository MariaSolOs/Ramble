import { useEffect } from 'react';

import { useGetUserExperiencesLazyQuery } from 'graphql-api';
import { useLanguageContext } from 'context/languageContext';
import useTokenStorage from 'hooks/useTokenStorage';
import { Experience } from 'models/experience';

import Spinner from 'components/Spinner/Spinner';
import ExperienceCard from 'components/ExperienceCard/ExperienceCard';
import Layout from '../Layout';

import { makeStyles } from '@material-ui/core/styles';
import styles from './Experiences.styles';
const useStyles = makeStyles(styles);

const Experiences = () => {
    const { UserProfile_Experiences: text } = useLanguageContext().appText;
    const classes = useStyles();

    // For not getting logged out when clicking on the cards
    useTokenStorage(true);

    const [getExperiences, { data, loading }] = useGetUserExperiencesLazyQuery({
        fetchPolicy: 'network-only' // Make sure we get updated data
    });
    useEffect(() => {
        getExperiences();
    }, [getExperiences]);

    if (!data || loading) {
        return <Spinner />;
    }

    return (
        <Layout
        name={data.me.firstName}
        photo={data.me.photo || undefined}
        city={data.me.city || undefined}>
            <h4 className={classes.sectionTitle}>{text.saved}</h4>
            <div className={classes.experienceRow}>
                {data.me.savedExperiences.map(exp =>
                    <ExperienceCard 
                    key={exp._id} 
                    experience={Experience.getCardInfo(exp)}
                    containerClass={classes.experienceCard} />
                )}
            </div>
            <h4 className={classes.sectionTitle}>{text.booked}</h4>
            <div className={classes.experienceRow}>
                {data.me.bookedExperiences.map(exp =>
                    <ExperienceCard
                    key={exp._id}
                    experience={Experience.getCardInfo(exp)}
                    containerClass={classes.experienceCard} />
                )}
            </div>
        </Layout>
    );
}

export default Experiences;