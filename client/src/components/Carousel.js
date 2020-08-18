import React from 'react';

//Components
import ImageGallery from 'react-image-gallery';

//Styles
import {makeStyles} from '@material-ui/core/styles';
const useStyles = makeStyles((theme) => ({
    carousel: {
        width: '60%',
        minWidth: 250,
        [theme.breakpoints.down('sm')]: { 
            width: '80%',
            margin: '0 auto 2% auto'
        },

        '& .image-gallery-slide': {
            '&:focus': { outline: 'none' },
            //Main images
            '& .image-gallery-image': {
                height: 500,
                width: '90%',
                borderRadius: '2rem',
                objectFit: 'cover'
            },
        },

        //Thumbnails
        '& .image-gallery-thumbnail': {
            transform: 'none',
            border: 'none !important',
            marginBottom: 10,
            cursor: 'pointer',
            '& .image-gallery-thumbnail-image': { 
                borderRadius: '1rem',
                maxHeight: 110,
                width: 'auto',
                maxWidth: 70
            }
        },

        //Selection dots
        '& .image-gallery-bullets': { 
            bottom: -30,
            '& .image-gallery-bullet': {
                backgroundColor: '#4F4F4F',
                margin: '0 3px',
                padding: 7,
                border: 'none',
                transform: 'none',
                '&:hover': { 
                    outline: 'none',
                    backgroundColor: '#FFF'
                },
                '&:focus': { outline: 'none' },
                '&.active': { backgroundColor: '#FFF' }
            } 
        }
    }
}));

const ExperienceCarousel = ({images}) => {
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

export default React.memo(ExperienceCarousel);