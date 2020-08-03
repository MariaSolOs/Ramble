import React, {useState, useEffect} from 'react';
import {prepareReview} from '../helpers';

//Components
import Experience from '../../../../../components/Experience/Experience';
import FloatButtons from '../../../../../components/ShareSaveButtons';

//Styles 
import {makeStyles} from '@material-ui/core/styles';
import styles from './ReviewStyles';
const useStyles = makeStyles(styles);

const Review = ({exp, creator, submitExp}) => {
    const classes = useStyles();

    //Prepare data 
    const images = exp.images.map(img => ({original: img, thumbnail: img}));
    const [review, setReview] = useState();
    useEffect(() => {
        setReview(prepareReview(exp, creator));
    }, [exp, creator]);
    useEffect(() => {
        if(review) { submitExp('canSubmit', true); }
    }, [review, submitExp]);

    return (
        <div className={classes.root}>
            <h1 className={classes.title}>Review & Submit</h1>
            {review ? 
            <div className={classes.experience}>
                <Experience exp={review}
                floatButtons={<FloatButtons showSave/>}
                images={images}/>
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