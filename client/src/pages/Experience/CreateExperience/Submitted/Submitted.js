import React, {useState, useEffect} from 'react';
import axios from '../../../../tokenizedAxios';
import {connect} from 'react-redux';
import {showError} from '../../../../store/actions/ui';
import {Link} from 'react-router-dom';

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
    const {savedForm, showError, creatorId} = props;
    useEffect(() => {
        const form = {
            ...savedForm,
            creator: creatorId
        };
        const images = form.images.slice(0);
        delete form.images;
        axios.post('/api/exp', {form, images})
        .catch(err => {
            showError("We couldn't submit your experience...");
        });
    }, [savedForm, showError, creatorId]);

    return (
        <div className={classes.root}>
            <div>
                <h1 className={classes.title}>Your experience was submitted</h1>
                <p>
                    Your experience<strong> {props.savedForm.title} </strong>
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
                    <a href={`https://connect.stripe.com/express/oauth/authorize?client_id=${process.env.REACT_APP_STRIPE_CLIENT_ID}&state=${stripeState}&redirect_uri=${process.env.REACT_APP_STRIPE_OAUTH_REDIRECT}`}>
                        <p>Continue with</p>
                        <FontAwesomeIcon icon={faStripe}/>
                    </a>
                </div></>}
            </div>
        </div>
    );
}

const mapStateToProps = (state) => ({
    savedForm: state.exp.savedExperienceForm,
    creatorId: state.user.creator.id,
    hasStripe: state.user.creator.stripeId !== null
});
const mapDispatchToProps = (dispatch) => ({
    showError: (msg) => dispatch(showError(msg))
});

export default connect(mapStateToProps, mapDispatchToProps)(Submitted);