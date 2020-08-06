import React, {useState, useEffect} from 'react';
import axios from '../../../tokenizedAxios';
import {connect} from 'react-redux';
import {showError} from '../../../store/actions/ui';

import {FontAwesomeIcon} from '@fortawesome/react-fontawesome';
import {faStripe} from '@fortawesome/free-brands-svg-icons/faStripe';

import {makeStyles} from '@material-ui/core/styles';
const useStyles = makeStyles(() => ({
    root: {
        height: '80vh',
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',

        '& p': {
            fontFamily: 'Helvetica, sans-serif',
            color: '#CDCDCD',
            fontSize: '1.2rem',
            letterSpacing: '-0.05rem' 
        }
    },

    title: {
        fontFamily: 'Helvetica, sans-serif',
        fontWeight: 'bold',
        fontSize: '2.3rem',
        letterSpacing: '-0.05rem',
        color: '#FFF',
    },

    stripeLink: {
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        width: '100%',
        marginTop: '2rem',
        '& a': { 
            textDecoration: 'none',
            textAlign: 'center' 
        },
        '& p': { 
            margin: '0 0 -10px',
            fontWeight: 'bold' 
        },
        '& svg': {
            color: '#4379FF',
            fontSize: '5rem'
        }
    }
}));

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
                {!props.hasStripe &&
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
                    <a href={`https://connect.stripe.com/express/oauth/authorize?client_id=${process.env.REACT_APP_STRIPE_CLIENT_ID}&state=${stripeState}`}>
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