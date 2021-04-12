import React, {useState, useEffect} from 'react';
import {connect} from 'react-redux';
import {saveExperience, unsaveExperience} from '../../../store/actions/experiences';
import {showError} from '../../../store/actions/ui';
import axios from '../../../tokenizedAxios';
import {useParams, useHistory} from 'react-router-dom';

//Components and icons
import BookExperience from '../BookExperience/BookExperience';
import FloatButtons from '../../../components/ShareSaveButtons/ShareSaveButtons';
import Fab from '@material-ui/core/Fab';
import ChevronLeftIcon from '@material-ui/icons/ChevronLeft';
import ShareExpDialog from '../../../components/Dialogs/ShareExpDialog/ShareExpDialog';
import Experience from '../../../components/Experience/Experience';
import Carousel from '../../../components/Carousel/Carousel';

//Styles
import {makeStyles} from '@material-ui/core/styles';
import styles from './ShowExperienceStyles';
const useStyles = makeStyles(styles);

const ShowExperience = (props) => {
    
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
    
    const classes = useStyles({ online: exp && exp.zoomInfo !== undefined });

    //For saving/unsaving an experience
    const [saved, setSaved] = useState(false);
    useEffect(() => {
        if(exp) {
            setSaved(userExps.includes(exp._id));
        }
    }, [userExps, exp]);
    const heartAction = saved? props.unsaveExp : props.saveExp;
    const handleHeartClick = (e) => {
        heartAction(exp._id);
        setSaved(!saved);
    }

    //For sharing an experience
    const [showShareDialog, setShowShareDialog] = useState(false);
    const handleShareDialogChange = (newVal) => () => setShowShareDialog(newVal);

    //For booking an experience
    const [showBooking, setShowBooking] = useState(false);
    const handleBooking = () => { setShowBooking(true); }
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
                <ShareExpDialog
                expTitle={exp.title}
                open={showShareDialog}
                onClose={handleShareDialogChange(false)}/>
                <Fab size="small" aria-label="go back" disableRipple
                className={classes.goBackBtn} onClick={handleGoBack}>
                    <ChevronLeftIcon/>
                </Fab>
                <Carousel images={images}/>
                <div className={classes.experienceWrapper}>   
                    <Experience 
                    lang={props.lang}
                    exp={exp} 
                    floatButtons={
                        <FloatButtons 
                        showSave
                        saved={saved}
                        onSave={handleHeartClick}
                        onShare={handleShareDialogChange(true)}/>}
                    images={images}/>
                </div>
                <div className={classes.footer}>
                    <div>
                        <p className={classes.price}>
                            <span>${exp.price.perPerson}</span>
                            {exp.zoomInfo? 'PER CONNECTION' : 'PER PERSON'}
                        </p>
                        <button className={classes.bookButton} onClick={handleBooking}>
                            Book experience
                        </button>
                    </div>
                </div>
                </>}
            {showBooking && <BookExperience 
                            exp={exp}
                            onClose={closeBooking}/>}
        </div>
    );
}

const mapStateToProps = (state) => ({
    userExps: state.exp.savedExps.map(exp => exp._id),
    lang: state.ui.language
});
const mapDispatchToProps = (dispatch) => ({
    saveExp: (expId) => dispatch(saveExperience(expId)),
    unsaveExp: (expId) => dispatch(unsaveExperience(expId)),
    showError: (msg) => dispatch(showError(msg))
});

export default connect(mapStateToProps, mapDispatchToProps)(ShowExperience);