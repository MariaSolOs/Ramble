import React, {useState, useEffect} from 'react';
import axios from '../../../../tokenizedAxios';
import {connect} from 'react-redux';
import {showError, startLoading, endLoading} from '../../../../store/actions/ui';
import {Link, useHistory} from 'react-router-dom';

import {FontAwesomeIcon} from '@fortawesome/react-fontawesome';
import {faStripe} from '@fortawesome/free-brands-svg-icons/faStripe';

import {makeStyles} from '@material-ui/core/styles';
import styles from './SubmittedStyles';
const useStyles = makeStyles(styles);

const Submitted = (props) => {
    const classes = useStyles();

    //Retrieve token to use as stripe state
    const [stripeState, setStripeState] = useState('');
    useEffect(() => {
        const token = window.localStorage.getItem('token');
        setStripeState(token);
    }, []);

    //Create experience when here
    const [exp, setExp] = useState(null);
    const [error, setError] = useState(false);
    const {savedForm, showError, creatorId, startLoading, endLoading} = props;
    useEffect(() => {
        startLoading();
        const form = {...savedForm, creator: creatorId}
        if(!form.images) { return setError(true); }
        const images = form.images.slice(0);
        delete form.images;
        axios.post('/api/exp', {form, images})
        .then(res => { 
            setExp(res.data.exp); 
            endLoading();
        })
        .catch(err => { 
            setError(true); 
            endLoading();
        });
    }, [savedForm, creatorId, startLoading, endLoading]);

    // //On error, show message and redirect 
    const history = useHistory();
    useEffect(() => {
        if(error) {
            showError("We couldn't submit your experience...");
            setTimeout(() => {
                history.push('/');
            }, 4000);
        }
    }, [error, showError, history]);

    return (
        <div className={classes.root}>
        {exp &&
            <div>
                <h1 className={classes.title}>Your experience was submitted</h1>
                <p>
                    Your experience<strong> {exp.title} </strong>
                    was submitted successfully.<br/>
                    We'll review it and get back to you shortly so you can get 
                    your act out there as soon as possible.
                </p>
                {props.hasStripe ?
                <Link to="/">
                    <button className={classes.gotItButton}>
                        Got it
                    </button>
                </Link> : 
                <><p>
                    <strong>Once your experience is approved</strong>, all you have 
                    left to do is choose the way you want to receive your payments.
                    <br/>
                    You can always get ahead of the curve and <strong>fill out your 
                    information now</strong>.
                </p>
                <p>
                    <strong>In order to keep your information secure, all payments 
                    are handled and processed by Stripe&trade;</strong>
                </p>
                <div className={classes.stripeLink}>
                    <a href={`https://connect.stripe.com/oauth/authorize?response_type=code&client_id=${
                    process.env.REACT_APP_STRIPE_CLIENT_ID}&scope=read_write&state=${
                    stripeState}&redirect_uri=${process.env.REACT_APP_STRIPE_OAUTH_REDIRECT}`}>
                        <p>Continue with</p>
                        <FontAwesomeIcon icon={faStripe}/>
                    </a>
                </div></>}
            </div>}
        </div>
    );
}

const mapStateToProps = (state) => ({
    savedForm: state.exp.savedExperienceForm,
    creatorId: state.user.creator.id,
    hasStripe: state.user.creator.stripeId
});
const mapDispatchToProps = (dispatch) => ({
    startLoading: () => dispatch(startLoading()),
    endLoading: () => dispatch(endLoading()),
    showError: (msg) => dispatch(showError(msg))
});

export default connect(mapStateToProps, mapDispatchToProps)(Submitted);