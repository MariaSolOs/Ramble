import React, {useState} from 'react';
import {useParams} from 'react-router-dom';
import {useDispatch} from 'react-redux';
import {showError} from '../../../store/actions/ui';
import axios from '../../../tokenizedAxios';

import ShowExperience from '../ShowExperience/ShowExperience';
import TextField from '../../../components/Input/TextField';
import Dialog from '@material-ui/core/Dialog';
import DialogContent from '@material-ui/core/DialogContent';
import Rating from '@material-ui/lab/Rating';
import CloseIcon from '@material-ui/icons/Close';

import {makeStyles} from '@material-ui/core/styles';
import styles from './ReviewExperienceStyles';
const useStyles = makeStyles(styles);

const labels = {
    1: "Wouldn't recommend",
    2: 'Was alright',
    3: 'Good',
    4: 'Great',
    5: 'Amazing'
}

const ReviewExperience = (props) => {
    const classes = useStyles();

    //Control the review dialog
    const [openReview, setOpenReview] = useState(true);
    const closeReview = (e) => { setOpenReview(false); }

    //Manage the rating
    const [rating, setRating] = useState(5);
    const [hover, setHover] = useState(-1);

    //Manage the review
    const [review, setReview] = useState('');
    const handleReviewChange = (e) => { setReview(e.target.value); }

    //Handle submit 
    const {id} = useParams();
    const dispatch = useDispatch();
    const handleSubmit = (e) => {
        e.preventDefault();
        axios.post(`/api/exp/review/${id}`, {rating, review})
        .catch(err => {
            dispatch(showError("We couldn't submit your review..."));
        });
    }

    return (
        <>
        <Dialog 
        open={openReview}
        maxWidth="xs"
        fullWidth
        classes={{paper: classes.paper}}>
            <div className={classes.header}>   
                <h2 className="title">
                    How was your last<br/>experience?
                </h2>
                <CloseIcon onClick={closeReview}/>
            </div>
            <DialogContent>
                <form onSubmit={handleSubmit}>
                    <div className={classes.rating}>
                        {rating !== null &&
                            <p className={classes.label}>
                                {labels[hover !== -1 ? hover : rating]}
                            </p>}
                        <Rating
                        name="experienceRating"
                        max={5}
                        precision={1}
                        value={rating}
                        onChange={(e, val) => { setRating(val); }}
                        onChangeActive={(e, val) => { setHover(val); }}
                        className={classes.ratingStars}/>
                    </div>
                    <p className={classes.label}>
                        If you feel like saying anything else...
                    </p>
                    <TextField 
                    multiline 
                    rows={3} 
                    rowsMax={3}
                    id="review" 
                    value={review} 
                    onChange={handleReviewChange}
                    fullWidth/>
                    <button 
                    className={classes.doneButton}
                    type="submit"
                    onClick={closeReview}>
                        Done 
                    </button>
                </form>
            </DialogContent>
        </Dialog>
        <ShowExperience/>  
        </>
    );
}

export default ReviewExperience;