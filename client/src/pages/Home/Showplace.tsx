import React from 'react';

import { useLanguageContext } from 'context/languageContext'; 

import { makeStyles } from '@material-ui/core/styles';
import styles from './Showplace.styles';
const useStyles = makeStyles(styles);

const PARTAKE_IMAGES = [
    'holding_camera.jpg',
    'bar-whitedrinks.jpg',
    'camera_on_legs.jpg'
] as const;

const ADVENTURE_IMAGES = [
    'street_shoots.jpg',
    'cooking_online.jpg',
    'cocktail_workshop.jpg'
] as const;

const Gallery = () => {
    const { Home: text } = useLanguageContext().appText;

    const classes = useStyles();
    
    return (
        <>
            <div className={classes.gallerySlide}>
                <h1 className={classes.title}>{text.partakeTitle}</h1>
                <h3 className={classes.subtitle}>{text.partakeSubtitle}</h3>
                <div className={classes.imagesContainer}>
                    {PARTAKE_IMAGES.map(imgUrl => 
                        <img 
                        key={imgUrl}
                        src={`${process.env.REACT_APP_CLOUDINARY_BASE_URI}c_fill,h_500,w_400/v1/Ramble/Homepage/${imgUrl}`}
                        alt="Experience preview"
                        className={classes.image} />
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
                        key={imgUrl}
                        src={`${process.env.REACT_APP_CLOUDINARY_BASE_URI}c_fill,h_500,w_400/v1/Ramble/Homepage/${imgUrl}`}
                        alt="Experience preview"
                        className={classes.image} />
                    )}
                </div>
            </div>
        </>
    );
}

export default React.memo(Gallery);