import React from 'react';
import {useSelector} from 'react-redux';
import {Link} from 'react-router-dom';
import uuid from 'react-uuid';
import withAuthDialogs from '../../../../hoc/withAuthDialogs/withAuthDialogs';

//Styles
import {makeStyles} from '@material-ui/core/styles';
import styles from './BecomeACreatorStyles';
const useStyles = makeStyles(styles);

const gridImages = [`https://res.cloudinary.com/${process.env.REACT_APP_CLOUDINARY_CLOUDNAME}/image/upload/dpr_auto,q_auto/v1/Ramble/Creators/creatorGrid1.jpeg`,
                    `https://res.cloudinary.com/${process.env.REACT_APP_CLOUDINARY_CLOUDNAME}/image/upload/dpr_auto,q_auto/v1/Ramble/Creators/creatorGrid2.jpeg`,
                    `https://res.cloudinary.com/${process.env.REACT_APP_CLOUDINARY_CLOUDNAME}/image/upload/dpr_auto,q_auto/v1/Ramble/Creators/creatorGrid3.jpeg`,
                    `https://res.cloudinary.com/${process.env.REACT_APP_CLOUDINARY_CLOUDNAME}/image/upload/dpr_auto,q_auto/v1/Ramble/Creators/creatorGrid4.jpeg`,
                    `https://res.cloudinary.com/${process.env.REACT_APP_CLOUDINARY_CLOUDNAME}/image/upload/dpr_auto,q_auto/v1/Ramble/Creators/creatorGrid5.jpeg`];

const BecomeACreator = (props) => {
    const classes = useStyles();

    const isAuth = useSelector(state => state.user.token !== null);
    const isCreator = useSelector(state => Object.keys(state.user.creatorData).length > 0);

    return (
        <div className={classes.root}>
            <div className={classes.header}>
                <h1>Become a Creator.</h1>
                <h1>Share your passion.</h1>
                <h1>Get paid.</h1>
                {isAuth? 
                    isCreator?
                    <Link to="/experience/new/intro"
                    className={classes.getStartedButton}>
                        Get Started
                    </Link> :
                    <Link to="/experience/new/intro"
                    className={classes.getStartedButton}>
                        Get Started
                    </Link> :
                    <button className={classes.getStartedButton} 
                    onClick={props.dialogActions.openSignUpDialog}>
                        Get Started
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