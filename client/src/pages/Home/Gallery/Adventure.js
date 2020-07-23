import React, {useContext} from 'react';
import {CloudinaryContext} from '../../../context/cloudinaryContext';

//Styles
import {makeStyles} from '@material-ui/core/styles';
import styles from './GalleryStyles';
const useStyles = makeStyles(styles);

const images = ['Ramble/Homepage/poolParty.jpeg',
                'Ramble/Homepage/motorcycles.jpeg',
                'Ramble/Homepage/romanticCamping.jpeg'];

const Adventure = (props) => {
    const classes = useStyles();
    const cloudinary = useContext(CloudinaryContext);

    return (
        <div className={classes.root}>
            <div className={classes.body}>
                <div style={{ textAlign: 'right' }}>
                    <h1 className={classes.title} style={{ fontSize: '2.4rem' }}>With friends, family, on your own, or with a special someone.</h1>
                    <h5 className={classes.description}>Turn every occasion into a memorable adventure.</h5>
                </div>
                <div className={classes.images}>
                    <img src={cloudinary.url(images[0], {height: 500, width: 400, crop: 'fill', secure: true})}
                    alt="Pool party"/>
                    <img src={cloudinary.url(images[1], {height: 500, width: 400, crop: 'fill', secure: true})}
                    alt="Motorcycles"/>
                    <img src={cloudinary.url(images[2], {height: 500, width: 400, crop: 'fill', secure: true})}
                    alt="Romantic camping"/>
                </div>
            </div>
        </div>
    );
}

export default React.memo(Adventure);