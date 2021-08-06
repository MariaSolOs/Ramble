import React from 'react';
import { v4 as uuid } from 'uuid';

import { useLanguageContext } from 'context/languageContext'; 

import { makeStyles } from '@material-ui/core/styles';
import styles from './Showplace.styles';
const useStyles = makeStyles(styles);

const PARTAKE_IMAGES = [
    'v1628286593/Ramble/Homepage/partake1.jpg',
    'v1628286600/Ramble/Homepage/partake2.jpg',
    'v1628286600/Ramble/Homepage/partake3.jpg',
] as const;

const ADVENTURE_IMAGES = [
    'v1628286916/Ramble/Homepage/adventure1.jpg',
    'v1628286916/Ramble/Homepage/adventure2.jpg',
    'v1628286916/Ramble/Homepage/adventure3.jpg'
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
                        key={uuid()}
                        src={`${process.env.REACT_APP_CLOUDINARY_BASE_URI}c_fill,h_600,w_500/${imgUrl}`}
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
                        key={uuid()}
                        src={`${process.env.REACT_APP_CLOUDINARY_BASE_URI}c_fill,h_600,w_500/${imgUrl}`}
                        alt="Experience preview"
                        className={classes.image} />
                    )}
                </div>
            </div>
        </>
    );
}

export default React.memo(Gallery);