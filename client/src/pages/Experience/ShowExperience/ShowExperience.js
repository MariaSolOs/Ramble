import React, {useState, useEffect} from 'react';
import {connect} from 'react-redux';
import {saveExperience, unsaveExperience} from '../../../store/actions/experiences';
import {showError} from '../../../store/actions/ui';
import axios from 'axios';
import {useParams, useHistory} from 'react-router-dom';
import withAuthDialogs from '../../../hoc/withAuthDialogs/withAuthDialogs';

//Components and icons
import BookExperience from '../BookExperience/BookExperience';
import FloatButtons from '../../../components/ShareSaveButtons';
import Fab from '@material-ui/core/Fab';
import ChevronLeftIcon from '@material-ui/icons/ChevronLeft';
import Experience from '../../../components/Experience/Experience';
import Footer from './Footer';

//Styles
import 'react-image-gallery/styles/css/image-gallery.css';
import {makeStyles} from '@material-ui/core/styles';
import styles from './ShowExperienceStyles';
const useStyles = makeStyles(styles);

const ShowExperience = (props) => {
    const classes = useStyles();

    //Fetch the requested experience
    const history = useHistory();
    const {id} = useParams();
    const [exp, setExp] = useState(null);
    const {userExps, showError} = props;
    useEffect(() => {
        let mounted = true;
        axios.get(`/api/exp/${id}`)
        .then(res => { 
            if(res.status === 200 && mounted) { 
                setExp(res.data.exp);
            }
        }).catch(err => {
            showError('We cannot find this experience right now.');
            setTimeout(() => {
                history.push('/');
            }, 3000);
        });
        return () => mounted = false;
    }, [id, history, showError]);

    //For saving/unsaving an experience
    const [saved, setSaved] = useState(false);
    useEffect(() => {
        if(exp) {
            setSaved(userExps.includes(exp._id));
        }
    }, [userExps, exp]);
    const heartAction = saved? props.unsaveExp : props.saveExp;
    const handleHeartClick = (e) => {
        //Don't show the experience page
        e.stopPropagation();
        heartAction(exp._id);
        setSaved(!saved);
    }

    //For booking an experience
    const [showBooking, setShowBooking] = useState(false);
    const handleBooking = () => {
        if(props.isAuth) { setShowBooking(true); }
        //If no logged in user, show sign up instead
        else { props.dialogActions.openSignUpDialog(); }
    }
    const closeBooking = () => { setShowBooking(false); }

    //Go back button
    const handleGoBack = () => history.goBack();

    //Change background color
    useEffect(() => {
        document.body.style = 'background-color: #1C1C1C';
        return () => document.body.style = 'background-color: #151515';
    }, []);

    //Carousel images
    const images = exp && 
        exp.images.map(img => {
            const original = img.replace('h_400', 'h_700');
            const thumbnail = img.replace('h_400', 'h_200');
            return { original, thumbnail }
        }
    );

    return (
        <div className={classes.root}>
            {exp && 
                <>
                <Fab size="small" aria-label="go back" disableRipple
                className={classes.goBackBtn} onClick={handleGoBack}>
                    <ChevronLeftIcon/>
                </Fab>
                <Experience exp={exp} 
                floatButtons={
                    <FloatButtons 
                    showSave={props.isAuth}
                    saved={saved}
                    handleSave={handleHeartClick}/>}
                images={images}/>
                <Footer price={exp.price.perPerson} onBooking={handleBooking}/>
                </>}
            {showBooking && <BookExperience 
                            exp={exp}
                            user={props.user}
                            onClose={closeBooking}/>}
        </div>
    );
}

const mapStateToProps = (state) => ({
    isAuth: state.user.token !== null,
    user: state.user.userData,
    userExps: state.exp.savedExps.map(exp => exp._id)
});
const mapDispatchToProps = (dispatch) => ({
    saveExp: (expId) => dispatch(saveExperience(expId)),
    unsaveExp: (expId) => dispatch(unsaveExperience(expId)),
    showError: (msg) => dispatch(showError(msg))
});

export default connect(mapStateToProps, mapDispatchToProps)(withAuthDialogs(ShowExperience));