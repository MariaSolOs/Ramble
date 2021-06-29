import { useEffect } from 'react';

import { useLanguageContext } from 'context/languageContext';
import { isFile } from 'models/file';
import { getFormPreview } from 'models/experience';
import type { ExperienceForm, Experience as ExperienceType } from 'models/experience';
import type { Creator } from 'models/creator';
import type { CompletableSlide } from 'models/prop-interfaces';

import Title from 'components/ExperienceBuilderTitle/ExperienceBuilderTitle';
import Experience from 'components/Experience/Experience';

import { makeStyles } from '@material-ui/core/styles';
import styles from './Review.styles';
const useStyles = makeStyles(styles);

interface Props extends CompletableSlide {
    form: ExperienceForm;
    creator: Creator;
    previousExperience?: ExperienceType;
}

const Review = (props: Props) => {
    const { BuilderSlides_Review: text } = useLanguageContext().appText;
    const classes = useStyles();

    // Map the files to image URLs if applicable
    const images = props.form.images.map(img => ({
        url: isFile(img!) ? URL.createObjectURL(img) : img!,
        wasFile: isFile(img!)
    }));

    // Make the form appropriate for the component
    const experience = getFormPreview(
        props.form, 
        images.map(({ url }) => url), 
        props.previousExperience
    );

    const { onSlideComplete } = props;
    useEffect(() => {
        onSlideComplete(true);
    }, [onSlideComplete]);

    // Make sure to clean up the generated URLs
    useEffect(() => {
        return () => {
            for (const img of images) {
                if (img.wasFile) {
                    URL.revokeObjectURL(img.url);
                }
            }
        }
    }, [images]);

    return (
        <>
            <Title>{text.title}</Title>
            <div className={classes.experienceContainer}>
                <Experience
                experience={experience}
                creator={props.creator}
                useMobileDisplay />
            </div>
        </>
    );
}

export default Review;