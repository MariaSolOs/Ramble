import React from 'react';
import { partakeText as text } from '../HomeText';

import { makeStyles } from '@material-ui/core/styles';
import styles from './GalleryStyles';
const useStyles = makeStyles(styles);

const images = [
    `https://res.cloudinary.com/${process.env.REACT_APP_CLOUDINARY_CLOUDNAME}/image/upload/c_fill,h_500,w_400/v1622837490/Ramble/Homepage/holding_camera.jpg`,
    `https://res.cloudinary.com/${process.env.REACT_APP_CLOUDINARY_CLOUDNAME}/image/upload/c_fill,h_500,w_400/v1622837486/Ramble/Homepage/bar-whitedrinks.jpg`,
    `https://res.cloudinary.com/${process.env.REACT_APP_CLOUDINARY_CLOUDNAME}/image/upload/c_fill,h_500,w_400/v1622837479/Ramble/Homepage/camera_on_legs.jpg`
];

const Partake = ({ setSearchFocus, lang }) => {
    const classes = useStyles();
    
    return (
        <div className={classes.root}>
            <div className={classes.body}>
                <div style={{ width: '90%' }}>
                    <h1 className={classes.title}>{text.title[lang]}</h1>
                    <h5 className={classes.description}>{text.description[lang]}</h5>
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

export default React.memo(Partake);