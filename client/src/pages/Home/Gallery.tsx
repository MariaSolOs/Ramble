import React from 'react';

import { useLanguageContext } from '../../context/languageContext'; 

import { makeStyles } from '@material-ui/core/styles';
import styles from './Gallery.styles';
const useStyles = makeStyles(styles);

const PARTAKE_IMAGES = [
    'Homepage/fireBalloon.jpeg',
    'Creators/creatorGrid1.jpeg',
    'Homepage/cityMusical.jpeg'
] as const;

const ADVENTURE_IMAGES = [
    'poolParty.jpeg',
    'motorcycles.jpeg',
    'romanticCamping.jpeg'
] as const;

type Props = {
    onImageClick: () => void;
}

const Gallery = (props: Props) => {
    const { Home: text } = useLanguageContext().appText;

    const classes = useStyles();
    console.log('GAL')

    return (
        <>
            <div className={classes.gallerySlide}>
                <h1 className={classes.title}>{text.partakeTitle}</h1>
                <h3 className={classes.subtitle}>{text.partakeSubtitle}</h3>
                <div className={classes.imagesContainer}>
                    {PARTAKE_IMAGES.map(imgUrl => 
                        <img 
                        src={`${process.env.REACT_APP_CLOUDINARY_BASE_URI}c_fill,h_500,w_400/v1/Ramble/${imgUrl}`}
                        alt="Experience preview"
                        className={classes.image}
                        onClick={props.onImageClick} />
                    )}
                </div>
            </div>
            <div className={classes.gallerySlide}>
                <div className={classes.adventureText}>
                    <h1 className={classes.title}>{text.adventureTitle}</h1>
                    <h3 className={classes.subtitle}>{text.adventureSubtitle}</h3>
                </div>
                <div className={classes.imagesContainer}>
                    {ADVENTURE_IMAGES.map(imgUrl => 
                        <img
                        src={`${process.env.REACT_APP_CLOUDINARY_BASE_URI}c_fill,h_500,w_400/v1/Ramble/Homepage/${imgUrl}`}
                        alt="Experience preview"
                        className={classes.image}
                        onClick={props.onImageClick} />
                    )}
                </div>
            </div>
        </>
    );
}

export default React.memo(Gallery);