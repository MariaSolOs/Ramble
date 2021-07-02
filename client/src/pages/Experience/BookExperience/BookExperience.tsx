import { useState } from 'react';
import { useParams } from 'react-router-dom';

import { useGetExperienceQuery } from 'graphql-api';
import { Experience as ExperienceType } from 'models/experience';
import type { Creator } from 'models/creator';

import CustomScroll from 'react-custom-scroll';
import Experience from 'components/Experience/Experience';
import Spinner from 'components/Spinner/Spinner';

import { makeStyles } from '@material-ui/core/styles';
import styles from './Layout.styles';
const useStyles = makeStyles(styles);

const BookExperience = () => {
    const [experience, setExperience] = useState<ExperienceType>();
    const [creator, setCreator] = useState<Creator>();

    const classes = useStyles();

    // Retrieve experience ID from URL
    const { experienceId } = useParams<{ experienceId: string; }>();

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
        return <Spinner />;
    }

    return (
        <div className={classes.root}>
            <CustomScroll>
                <Experience
                experience={experience}
                creator={creator!}
                useMobileDisplay
                containerClass={classes.experienceContainer} />
            </CustomScroll>
        </div>
    );
}

export default BookExperience;