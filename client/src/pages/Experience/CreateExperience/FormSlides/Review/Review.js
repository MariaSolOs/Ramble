import React, {useEffect} from 'react';
import {useDispatch} from 'react-redux';
import {saveExperienceForm} from '../../../../../store/actions/experiences';

//Components
import Experience from '../../../../../components/Experience/Experience';
import FloatButtons from '../../../../../components/ShareSaveButtons/ShareSaveButtons';
import Carousel from '../../../../../components/Carousel/Carousel';

//Styles 
import {makeStyles} from '@material-ui/core/styles';
import styles from './ReviewStyles';
const useStyles = makeStyles(styles);

const Review = ({review, images}) => {
    const classes = useStyles();

    //Save experience 
    const dispatch = useDispatch();
    useEffect(() => {
        dispatch(saveExperienceForm(review));
    }, [dispatch, review]);

    //Prepare data 
    const carouselImgs = images.map(img => ({original: img, thumbnail: img}));

    return (
        <div className={classes.root}>
            <h1 className={classes.title}>Review & Submit</h1>
            {review ? 
            <div className={classes.experience}>
                <Carousel images={carouselImgs}/>
                <div className="exp-wrapper">
                    <Experience 
                    exp={review}
                    floatButtons={<FloatButtons showSave/>}/>
                </div>
            </div> : 
            <p className={classes.description}>
                Your experience couldn't be submitted.<br/>
                Please verify that you've correctly completed all the 
                previous steps.
            </p>}
        </div>
    );
}

export default Review;