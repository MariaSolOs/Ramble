import { useEffect, useCallback } from 'react';
import { v4 as uuid } from 'uuid';

import { useLanguageContext } from 'context/languageContext';
import type { PreviewableFile } from 'models/file';

import Title from 'components/ExperienceBuilderTitle/ExperienceBuilderTitle';
import Subtitle from 'components/ExperienceBuilderSubtitle/ExperienceBuilderSubtitle';
import Tip from 'components/Tip/Tip';
import Dropzone from 'components/Dropzone';
import AddCircleIcon from '@material-ui/icons/AddCircle';
import HighlightOffIcon from '@material-ui/icons/HighlightOff';

import { makeStyles } from '@material-ui/core/styles';
import styles from './Preview.styles';
const useStyles = makeStyles(styles);

type Props = {
    images: PreviewableFile[];
    onSlideComplete: (canContinue: boolean) => void;
    onImageChange: (index: number, imgFile: PreviewableFile) => void;
}

const Preview = (props: Props) => {
    const { BuilderSlides_Preview: text } = useLanguageContext().appText;
    const classes = useStyles();

    const { images, onSlideComplete, onImageChange } = props;
    useEffect(() => {
        onSlideComplete(images.every(img => img !== null));
    }, [onSlideComplete, images]);

    const handleCreatePreview = useCallback((idx: number, files: File[]) => {
        const imgFile = { file: files[0], preview: URL.createObjectURL(files[0]) };
        onImageChange(idx, imgFile);
    }, [onImageChange]);

    const handleDelete = useCallback((idx: number) => {
        onImageChange(idx, null);
    }, [onImageChange]);

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
                    {images[idx] ? 
                        <div className={classes.dropzone}>
                            <HighlightOffIcon 
                            className={classes.deleteIcon}
                            onClick={() => handleDelete(idx)} />
                            <img 
                            className={classes.previewImg} 
                            alt={title} 
                            src={images[idx]!.preview} />
                        </div> :
                        <Dropzone
                        iconComponent={AddCircleIcon}
                        iconClassName={classes.addIcon}
                        className={classes.dropzone}
                        extraOptions={{
                            onDrop: files => handleCreatePreview(idx, files)
                        }} />}
                </div>)}
            </div>
        </>
    );
}

export default Preview;