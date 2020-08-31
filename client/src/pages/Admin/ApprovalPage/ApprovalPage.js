import React, {useState, useEffect} from 'react';
import axios from '../../../tokenizedAxios';
import {useDispatch} from 'react-redux';
import {showSnackbar} from '../../../store/actions/ui';
import {useParams, useHistory} from 'react-router-dom';

//Components and icons
import Button from '@material-ui/core/Button';
import FloatButtons from '../../../components/ShareSaveButtons/ShareSaveButtons';
import Fab from '@material-ui/core/Fab';
import ChevronLeftIcon from '@material-ui/icons/ChevronLeft';
import Experience from '../../../components/Experience/Experience';
import Carousel from '../../../components/Carousel/Carousel';

//Styles
import 'react-image-gallery/styles/css/image-gallery.css';
import {makeStyles} from '@material-ui/core/styles';
import styles from './ApprovalPageStyles';
const useStyles = makeStyles(styles);

const ApprovalPage = (props) => {
    const classes = useStyles();

    //Fetch the requested experience
    const {id} = useParams();
    const [exp, setExp] = useState(null);
    const dispatch = useDispatch();
    useEffect(() => {
        axios.get(`/api/exp/${id}`)
        .then(res => setExp(res.data.exp))
        .catch(err => {
            dispatch(showSnackbar(`LOL try again 👾 ${err}`));
        });
    }, [id, dispatch]);

    //To notify the creator about the decision
    const [creatorEmail, setCreatorEmail] = useState('');

    //Deal with the approval decision
    const handleDecision = (decision, verifyCreator) => (e) => {
        dispatch(showSnackbar('Processing your decision...'));
        axios.post(`/api/exp/${exp._id}/approve`, { decision })
        .then(res => {
            if(decision === 'rejected') {
                setCreatorEmail(res.data.creatorEmail);
                dispatch(showSnackbar('You rejected this experience. ' + 
                'Send your feedback to the creator! 📩'));
            } else { //decision === 'approved'
                if(verifyCreator) {
                    axios.patch(`/api/creator/${exp.creator._id}`, {verified: true})
                    .then(res => {
                        dispatch(showSnackbar('Awesome, you approved this experience' + 
                        ' and the email to the (now verified) creator was sent. 🌝'));
                    }).catch(err => {
                        dispatch(showSnackbar(`The Creator couldn't be verified 😰: ${err}`));
                    });
                } else {
                    dispatch(showSnackbar('Awesome, you approved this experience' + 
                    ' and the email to the creator was sent. 🌝'));
                }
            }
        }).catch(err => {
            dispatch(showSnackbar(`LOL try again 👾 ${err}`));
        });
    }

    //Go back button
    const history = useHistory();
    const handleGoBack = () => history.goBack();
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
            <div className={classes.expPage}>
                <Fab size="small" aria-label="go back" disableRipple
                className={classes.goBackBtn} onClick={handleGoBack}>
                    <ChevronLeftIcon/>
                </Fab>
                <Carousel images={images}/>
                <Experience 
                exp={exp} 
                floatButtons={
                    <FloatButtons 
                    showSave
                    onSave={() => {}}/>}/>
            </div>
            <div className={classes.extraInfo}>
                <h4>More information...</h4>
                <ul>
                    <li>
                        <strong>Setting: </strong> {exp.setting}
                    </li>
                    <li>
                        <strong>Private booking price: </strong> 
                        {exp.price.private? 
                        exp.price.private : '(Private bookings not enabled)'}
                    </li>
                    <li>
                        <strong>Currency: </strong> 
                        {exp.price.currency}
                    </li>
                </ul>
                <h4>The Creator</h4>
                <ul>
                    <li className="creatorIds">
                        <strong>Government IDs </strong>
                        <img src={exp.creator.governmentIds[0]} alt="Creator ID"/>
                        <img src={exp.creator.governmentIds[1]} alt="Creator ID"/>
                    </li>
                    <li>
                        <strong>Verified: </strong> 
                        {exp.creator.verified? 'Yes' : `No. By approving this
                        experience the creator will have a verified profile.`}
                    </li>
                    <li>
                        <strong>Availability schedule</strong> {`(from 
                            ${exp.avail.from.split('T')[0]} to 
                            ${exp.avail.to.split('T')[0]})`}
                        <ul>
                            {Object.keys(exp.avail.schedule).map((day) => (
                                <li key={day}>
                                    {day}: {exp.avail.schedule[day].join(', ')}
                                </li>
                            ))}
                        </ul>
                    </li>
                </ul>
            </div>
            <div className={classes.footer}>
                {creatorEmail.length > 0?
                <Button 
                variant="contained" 
                style={{backgroundColor: '#68DAF9'}}
                size="large"
                href={`mailto:${creatorEmail}`}>
                    Send your feedback to the creator
                </Button> :
                <><Button 
                variant="contained" 
                style={{backgroundColor: '#00C77C'}}
                size="large"
                onClick={handleDecision('approved', !exp.creator.verified)}>
                    Approve <span role="img" aria-label="approve">👍🏼</span>
                </Button>
                <Button 
                variant="contained" 
                color="secondary" 
                size="large"
                onClick={handleDecision('rejected', !exp.creator.verified)}>
                    Reject <span role="img" aria-label="reject">👎🏼</span>
                </Button></>}
            </div>
            </>}
        </div>
    );
}

export default ApprovalPage;