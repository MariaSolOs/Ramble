import React, {useState, useEffect} from 'react';
import {useDispatch} from 'react-redux';
import {showSnackbar} from '../../store/actions/ui';
import {Link} from 'react-router-dom';
import axios from '../../tokenizedAxios';

import {makeStyles} from '@material-ui/core/styles';
const useStyles = makeStyles(() => ({
    root: { 
        width: '90%',
        margin: '100px auto 50px',
        color: '#FFF',
        fontFamily: 'Helvetica, sans-serif',
        fontWeight: 'bold',
        letterSpacing: '-0.05rem'
    },
    reviews: {
        display: 'flex',
        flexWrap: 'wrap',
        width: '100%',
        margin: '0 auto'
    },
    review: {
        width: '40%',
        marginRight: '5%',
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        '& .exp-title': {
            fontSize: '1.5rem',
            margin: '0 0 8px'
        },
        '& .exp-img': {
            height: 300,
            width: 'auto',
            margin: '0 auto'
        }
    }
}));

const ExpReviews = (props) => {
    const classes = useStyles();
    const dispatch = useDispatch();

    const [reviews, setReviews] = useState();
    useEffect(() => {
        axios.get('/api/exp/reviews')
        .then(res => {
            console.log(res)
            setReviews(res.data.reviews);
        })
        .catch(err => {
            dispatch(showSnackbar(`Oh shit 🐸 - ${err}`));
        });
    }, [dispatch]);

    return (
        <div className={classes.root}>
            <h1>Experience reviews</h1>
            <div className={classes.reviews}>
                {reviews && reviews.map(rev => (
                    <div
                    key={rev._id}
                    className={classes.review}>
                        <p className="exp-title">{rev.about.title}</p>
                        <Link to={`/admin/approveExp/${rev.about._id}`}>
                            <img 
                            src={rev.about.images[0]} 
                            alt="Reviewed experience"
                            className="exp-img"/>
                        </Link>
                        <p className="review-body">{rev.body}</p>
                    </div>
                ))}
            </div>
        </div>
    );
}

export default ExpReviews;