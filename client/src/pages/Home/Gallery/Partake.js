import React from 'react';

//Styles
import {makeStyles} from '@material-ui/core/styles';
import styles from './GalleryStyles';
const useStyles = makeStyles(styles);

const images = [`https://res.cloudinary.com/${process.env.REACT_APP_CLOUDINARY_CLOUDNAME}/image/upload/c_fill,h_500,w_400/v1/Ramble/Homepage/fireBalloon.jpeg`,
                `https://res.cloudinary.com/${process.env.REACT_APP_CLOUDINARY_CLOUDNAME}/image/upload/c_fill,h_500,w_400/v1/Ramble/Creators/creatorGrid1.jpeg`,
                `https://res.cloudinary.com/${process.env.REACT_APP_CLOUDINARY_CLOUDNAME}/image/upload/c_fill,h_500,w_400/v1/Ramble/Homepage/cityMusical.jpeg`];

const Partake = (props) => {
    const classes = useStyles();
    
    return (
        <div className={classes.root}>
            <div className={classes.body}>
                <div style={{ width: '90%' }}>
                    <h1 className={classes.title}>Partake in unforgettable moments</h1>
                    <h5 className={classes.description}>
                        Experiences are unique activities organized by passionate 
                        Creators who wish to share their expertise and give their 
                        guests a privileged access to their universe.
                    </h5>
                </div>
                <div className={classes.images}>
                    <img src={images[0]} alt="Fire balloon"
                    onClick={props.setSearchFocus}/>
                    <img src={images[1]} alt="Pool dive"
                    onClick={props.setSearchFocus}/>
                    <img src={images[2]} alt="Street singers"
                    onClick={props.setSearchFocus}/>
                </div>
            </div>
        </div>
    );
}

export default React.memo(Partake);