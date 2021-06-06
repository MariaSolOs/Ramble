import React from 'react';
import { useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import uuid from 'react-uuid';
import withAuthDialogs from '../../../../hoc/withAuthDialogs/withAuthDialogs';
import { BecomeACreatorText as text } from '../CreatorsIntroText';

import { makeStyles } from '@material-ui/core/styles';
import styles from './BecomeACreatorStyles';
const useStyles = makeStyles(styles);

const gridImages = [
    `https://res.cloudinary.com/${process.env.REACT_APP_CLOUDINARY_CLOUDNAME}/image/upload/dpr_auto,q_auto/v1/Ramble/Homepage/creatorGrid1.jpeg`,
    `https://res.cloudinary.com/${process.env.REACT_APP_CLOUDINARY_CLOUDNAME}/image/upload/dpr_auto,q_auto/v1/Ramble/Homepage/creatorGrid2.jpeg`,
    `https://res.cloudinary.com/${process.env.REACT_APP_CLOUDINARY_CLOUDNAME}/image/upload/dpr_auto,q_auto/v1/Ramble/Homepage/creatorGrid3.jpeg`,
    `https://res.cloudinary.com/${process.env.REACT_APP_CLOUDINARY_CLOUDNAME}/image/upload/dpr_auto,q_auto/v1/Ramble/Homepage/creatorGrid4.jpeg`,
    `https://res.cloudinary.com/${process.env.REACT_APP_CLOUDINARY_CLOUDNAME}/image/upload/dpr_auto,q_auto/v1/Ramble/Homepage/creatorGrid5.jpeg`
];

const BecomeACreator = (props) => {
    const classes = useStyles();

    const isAuth = useSelector(state => state.user.profile.id !== null);
    const isCreator = useSelector(state => state.user.creator.id !== null);

    return (
        <div className={classes.root}>
            <div className={classes.header}>
                <h1>{text.become[props.lang]}</h1>
                <h1>{text.share[props.lang]}</h1>
                <h1>{text.getPaid[props.lang]}</h1>
                {isAuth? 
                    <Link to={isCreator? '/experience/new/intro' : '/creator/join'}
                    className={classes.getStartedButton}>
                        {text.start[props.lang]}
                    </Link> :
                    <button className={classes.getStartedButton} 
                    onClick={props.dialogActions.openSignUpDialog}>
                        {text.start[props.lang]}
                    </button>}
            </div>
            <div className={classes.imgGrid}>
                {gridImages.map((url, index) => (
                    <figure 
                    className={`grid-item grid-item-${index + 1}`} 
                    key={uuid()}>
                        <img 
                        src={url}
                        alt={`Creator grid item ${index}`}
                        className={classes.gridImg}/>
                    </figure>
                ))}
            </div>
        </div>
    );
}

export default withAuthDialogs(BecomeACreator);