import React, {useContext} from 'react';
import {useSelector} from 'react-redux';
import {Link} from 'react-router-dom';
import uuid from 'react-uuid';
import {CloudinaryContext} from '../../../../context/cloudinaryContext';
import withAuthDialogs from '../../../../hoc/withAuthDialogs/withAuthDialogs';

//Styles
import {makeStyles} from '@material-ui/core/styles';
import styles from './BecomeACreatorStyles';
const useStyles = makeStyles(styles);

const gridImages = ['Ramble/Creators/creatorGrid1.jpeg',
                    'Ramble/Creators/creatorGrid2.jpeg',
                    'Ramble/Creators/creatorGrid3.jpeg',
                    'Ramble/Creators/creatorGrid4.jpeg',
                    'Ramble/Creators/creatorGrid5.jpeg'];

const BecomeACreator = (props) => {
    const classes = useStyles();

    const cloudinary = useContext(CloudinaryContext);
    const isAuth = useSelector(state => state.user.data.id !== null);

    return (
        <div className={classes.root}>
            <div className={classes.header}>
                <h1>Become a Creator.</h1>
                <h1>Share your passion.</h1>
                <h1>Get paid.</h1>
                {isAuth? 
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
                    key={uuid()} >
                        <img src={cloudinary.url(url, 
                        {height: 500, width: 'auto', dpr: 'auto', quality: 'auto', secure: true})}
                        alt={`Creator grid item ${index}`}
                        className={classes.gridImg}/>
                    </figure>
                ))}
            </div>
        </div>
    );
}

export default withAuthDialogs(BecomeACreator);