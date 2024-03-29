import { useEffect } from 'react';
import { v4 as uuid } from 'uuid';

import { useLanguageContext } from 'context/languageContext';
import type { CompletableSlide } from 'models/prop-interfaces';

import Title from 'components/ExperienceBuilderTitle/ExperienceBuilderTitle';
import Subtitle from 'components/ExperienceBuilderSubtitle/ExperienceBuilderSubtitle';
import Tip from 'components/Tip/Tip';
import Dropzone from 'components/Dropzone';

import { makeStyles } from '@material-ui/core/styles';
import styles from './Preview.styles';
const useStyles = makeStyles(styles);

interface Props extends CompletableSlide {
    images: (File | string | undefined)[];
    onImageChange: (index: number, imgFile?: File) => void;
}

const Preview = (props: Props) => {
    const { BuilderSlides_Preview: text } = useLanguageContext().appText;
    const classes = useStyles();

    const { images, onSlideComplete } = props;
    useEffect(() => {
        onSlideComplete(
            images.length === 4 &&
            images.every(img => img)
        );
    }, [onSlideComplete, images]);

    return (
        <>  
            <Title>{text.title}</Title>
            <Subtitle>{text.subtitle}</Subtitle>
            <Tip>{text.tip}</Tip>
            <div className={classes.dropzoneContainer}>
                {[
                    { title: text.coverImgTitle, description: text.coverImgText },
                    { title: text.creatorImgTitle, description: text.creatorImgText },
                    { title: text.actionImgTitle, description: text.actionImgText },
                    { title: text.locationImgTitle, description: text.locationImgText }
                ].map(({ title, description }, idx) => 
                <div key={uuid()} className={classes.dropzoneItem}>
                    <p className={`${classes.picText} ${classes.picTitle}`}>
                        {title}
                    </p>
                    <p className={`${classes.picText} ${classes.picDescription}`}>
                        {description}
                    </p>
                    <Dropzone
                    image={images[idx]}
                    onFileDrop={file => props.onImageChange(idx, file)}
                    dropzoneClassName={classes.dropzone}
                    addButtonClassName={classes.addIcon}
                    deleteButtonClassName={classes.deleteIcon}
                    previewImageClassName={classes.previewImg} />
                </div>)}
            </div>
        </>
    );
}

export default Preview;