import React from 'react';
import { adventureText as text } from '../HomeText'; 

import { makeStyles } from '@material-ui/core/styles';
import styles from './GalleryStyles';
const useStyles = makeStyles(styles);

const images = [
    `https://res.cloudinary.com/${process.env.REACT_APP_CLOUDINARY_CLOUDNAME}/image/upload/c_fill,h_500,w_400/v1/Ramble/Homepage/poolParty.jpeg`,
    `https://res.cloudinary.com/${process.env.REACT_APP_CLOUDINARY_CLOUDNAME}/image/upload/c_fill,h_500,w_400/v1/Ramble/Homepage/motorcycles.jpeg`,
    `https://res.cloudinary.com/${process.env.REACT_APP_CLOUDINARY_CLOUDNAME}/image/upload/c_fill,h_500,w_400/v1/Ramble/Homepage/romanticCamping.jpeg`
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
                    <img src={images[0]} alt="Pool party" onClick={setSearchFocus}/>
                    <img src={images[1]} alt="Motorcycles" onClick={setSearchFocus}/>
                    <img src={images[2]} alt="Romantic camping" onClick={setSearchFocus}/>
                </div>
            </div>
        </div>
    );
}

export default React.memo(Adventure);