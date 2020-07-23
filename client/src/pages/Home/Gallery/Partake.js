import React, {useContext} from 'react';
import {CloudinaryContext} from '../../../context/cloudinaryContext';

//Styles
import {makeStyles} from '@material-ui/core/styles';
import styles from './GalleryStyles';
const useStyles = makeStyles(styles);

const images = ['Ramble/Homepage/fireBalloon.jpeg',
                'Ramble/Creators/creatorGrid1.jpeg',
                'Ramble/Homepage/cityMusical.jpeg'];

const Partake = (props) => {
    const classes = useStyles();
    const cloudinary = useContext(CloudinaryContext);
    
    return (
        <div className={classes.root}>
            <div className={classes.body}>
                <div style={{ width: '90%' }}>
                    <h1 className={classes.title}>Partake in unforgettable moments</h1>
                    <h5 className={classes.description}>Experiences are unique activities organized by 
                    passionate Creators who wish to share their expertise and give their guests a privileged 
                    access to their universe.</h5>
                </div>
                <div className={classes.images}>
                    <img src={cloudinary.url(images[0], {height: 500, width: 400, crop: 'fill', secure: true})}
                    alt="Fire balloon"/>
                    <img src={cloudinary.url(images[1], {height: 500, width: 400, crop: 'fill', secure: true})}
                    alt="Pool dive"/>
                    <img src={cloudinary.url(images[2], {height: 500, width: 400, crop: 'fill', secure: true})}
                    alt="Street singers"/>
                </div>
            </div>
        </div>
    );
}

export default React.memo(Partake);