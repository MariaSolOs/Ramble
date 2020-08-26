import React, {useState, useEffect} from 'react';
import {useDispatch} from 'react-redux';
import {showSnackbar} from '../../store/actions/ui';
import axios from '../../tokenizedAxios';

import Gallery from '../../components/ExperiencesGallery';

const ExpReviews = (props) => {
    const dispatch = useDispatch();

    const [reviews, setReviews] = useState();
    useEffect(() => {
        axios.get('/api/exp/reviews')
        .then(res => {
            setReviews(res.data.reviews);
        })
        .catch(err => {
            dispatch(showSnackbar(`Oh shit 🐸 - ${err}`));
        });
    }, []);

    return (
        <>
           {reviews && <Gallery experiences={reviews.map(rev => rev.about)}/>}
        </>
    );
}

export default ExpReviews;