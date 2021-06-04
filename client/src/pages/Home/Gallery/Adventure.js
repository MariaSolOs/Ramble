import React from 'react';
import { adventureText as text } from '../HomeText'; 

import { makeStyles } from '@material-ui/core/styles';
import styles from './GalleryStyles';
const useStyles = makeStyles(styles);

const images = [
    `https://res.cloudinary.com/${process.env.REACT_APP_CLOUDINARY_CLOUDNAME}/image/upload/c_fill,h_500,w_400/v1622837502/Ramble/Homepage/street_shoots.jpg`,
    `https://res.cloudinary.com/${process.env.REACT_APP_CLOUDINARY_CLOUDNAME}/image/upload/c_fill,h_500,w_400/v1622837482/Ramble/Homepage/cooking_online.jpg`,
    `https://res.cloudinary.com/${process.env.REACT_APP_CLOUDINARY_CLOUDNAME}/image/upload/c_fill,h_500,w_400/v1622837483/Ramble/Homepage/cocktail_workshop.jpg`
];

const Adventure = ({ setSearchFocus, lang }) => {
    const classes = useStyles();

    return (
        <div className={classes.root}>
            <div className={classes.body}>
                <div style={{ textAlign: 'right' }}>
                    <h1 className={classes.title} style={{ fontSize: '2.4rem' }}>
                        {text.title[lang]}
                    </h1>
                    <h5 className={classes.description}>
                        {text.subtitle[lang]}
                    </h5>
                </div>
                <div className={classes.images}>
                    {images.map(imgUrl => 
                        <img src={imgUrl} alt="Experience preview" onClick={setSearchFocus} />
                    )}
                </div>
            </div>
        </div>
    );
}

export default React.memo(Adventure);