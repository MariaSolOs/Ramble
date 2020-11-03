import React from 'react';

import ImageGallery from 'react-image-gallery';

import {makeStyles} from '@material-ui/core/styles';
import styles from './CarouselStyles';
const useStyles = makeStyles(styles);

const Carousel = ({images}) => {
    const classes = useStyles();

    return (
        <ImageGallery
        additionalClass={classes.carousel}
        items={images}
        thumbnailPosition="left"
        showPlayButton={false}
        showFullscreenButton={false}
        showNav={false}
        showBullets/>
    );
}

export default React.memo(Carousel);