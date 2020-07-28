import React from 'react';

//Styles
import {makeStyles} from '@material-ui/core/styles';
import styles from './GalleryStyles';
const useStyles = makeStyles(styles);

const images = [`https://res.cloudinary.com/${process.env.REACT_APP_CLOUDINARY_CLOUDNAME}/image/upload/c_fill,h_500,w_400/v1/Ramble/Homepage/poolParty.jpeg`,
                `https://res.cloudinary.com/${process.env.REACT_APP_CLOUDINARY_CLOUDNAME}/image/upload/c_fill,h_500,w_400/v1/Ramble/Homepage/motorcycles.jpeg`,
                `https://res.cloudinary.com/${process.env.REACT_APP_CLOUDINARY_CLOUDNAME}/image/upload/c_fill,h_500,w_400/v1/Ramble/Homepage/romanticCamping.jpeg`];

const Adventure = (props) => {
    const classes = useStyles();

    return (
        <div className={classes.root}>
            <div className={classes.body}>
                <div style={{ textAlign: 'right' }}>
                    <h1 className={classes.title} style={{ fontSize: '2.4rem' }}>With friends, family, on your own, or with a special someone.</h1>
                    <h5 className={classes.description}>Turn every occasion into a memorable adventure.</h5>
                </div>
                <div className={classes.images}>
                    <img src={images[0]}
                    alt="Pool party"/>
                    <img src={images[1]}
                    alt="Motorcycles"/>
                    <img src={images[2]}
                    alt="Romantic camping"/>
                </div>
            </div>
        </div>
    );
}

export default React.memo(Adventure);