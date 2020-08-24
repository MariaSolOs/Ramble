import React, {useState, useEffect} from 'react';
import {connect} from 'react-redux';
import {showError} from '../../../store/actions/ui';
import {useHistory, useParams} from 'react-router-dom';
import axios from '../../../tokenizedAxios';

import {FacebookShareButton,
        FacebookMessengerShareButton, 
        EmailShareButton, 
        WhatsappShareButton} from 'react-share';
import {FontAwesomeIcon} from '@fortawesome/react-fontawesome';
import {faFacebookSquare} from '@fortawesome/free-brands-svg-icons/faFacebookSquare';
import {faFacebookMessenger} from '@fortawesome/free-brands-svg-icons/faFacebookMessenger';

import {makeStyles} from '@material-ui/core/styles';
import styles from './ExperienceApprovedStyles';
const useStyles = makeStyles(styles);

//TODO: Finish this page
const ExperienceApproved = (props) => {
    const classes = useStyles();

    //Fetch the approved experience
    const history = useHistory();
    const {id} = useParams();
    const [exp, setExp] = useState(null);
    const {showError} = props;
    useEffect(() => {
        let mounted = true;
        axios.get(`/api/exp/${id}`)
        .then(res => { 
            if(res.status === 200 && mounted) { 
                setExp(res.data.exp);
            }
        }).catch(err => {
            showError("We can't find your experience...");
            setTimeout(() => {
                history.push('/');
            }, 3000);
        });
        return () => mounted = false;
    }, [id, history, showError]);

    return (
        <div className={classes.root}>
            {exp &&
            <div>
                <h1 className={classes.title}>Your experience was approved</h1>   
                <p>
                    Congrats! Your experience 
                    <span className={classes.expTitle}> {exp.title} </span>was 
                    approved and is ready to go live.
                </p> 
                <p>
                    <strong>
                        Let everyone know
                    </strong>
                </p>
                <div className={classes.referMedia}>
                    <FacebookShareButton
                    url={`${process.env.REACT_APP_SERVER}/experience/view/${exp._id}`}>
                        <FontAwesomeIcon icon={faFacebookSquare}/>
                    </FacebookShareButton>
                    <FacebookMessengerShareButton 
                    appId={process.env.REACT_APP_FACEBOOK_ID} 
                    url={`${process.env.REACT_APP_SERVER}/experience/view/${exp._id}`}>
                        <FontAwesomeIcon icon={faFacebookMessenger}/>
                    </FacebookMessengerShareButton>
                    {/* <FacebookMessengerShareButton 
                    appId={process.env.REACT_APP_FACEBOOK_ID} 
                    url={`${process.env.REACT_APP_SERVER}/experience/view/${exp._id}`}>
                        <img src={messengerIcon} alt="Refer with Messenger"/>
                    </FacebookMessengerShareButton>
                    <EmailShareButton 
                    url={shareUrl}>
                        <img src={mailIcon} alt="Refer with email"/>
                    </EmailShareButton>
                    <WhatsappShareButton url={shareUrl}>
                        <img src={whatsAppIcon} alt="Facebook Messenger"/>
                    </WhatsappShareButton> */}
                </div>
            </div>}
        </div>
    );
}

const mapStateToProps = (state) => ({
    hasStripe: state.user.creator.stripeId !== null
});
const mapDispatchToProps = (dispatch) => ({
    showError: (msg) => dispatch(showError(msg))
});

export default connect(mapStateToProps, mapDispatchToProps)(ExperienceApproved);