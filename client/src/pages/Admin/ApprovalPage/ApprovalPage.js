import React, {useState, useEffect} from 'react';
import axios from '../../../tokenizedAxios';
import {useParams, useHistory} from 'react-router-dom';

//Components and icons
import Button from '@material-ui/core/Button';
import FloatButtons from '../../../components/ShareSaveButtons';
import Fab from '@material-ui/core/Fab';
import ChevronLeftIcon from '@material-ui/icons/ChevronLeft';
import Experience from '../../../components/Experience/Experience';

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
    const {displaySnackbar} = props;
    useEffect(() => {
        axios.get(`/api/exp/${id}`)
        .then(res => setExp(res.data.exp))
        .catch(err => {
            displaySnackbar(`LOL try again 👾 ${err}`);
        });
    }, [id, displaySnackbar]);

    //To notify the creator about the decision
    const [creatorEmail, setCreatorEmail] = useState('');

    //Deal with the approval decision
    const handleDecision = (decision) => (e) => {
        axios.post(`/api/exp/${exp._id}/approve`, { decision })
        .then(res => {
            setCreatorEmail(res.data.creatorEmail);
            displaySnackbar(`Awesome, you successfully ${decision} this 
            experience 🌝`);
        }).catch(err => {
            displaySnackbar(`LOL try again 👾 ${err}`);
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
                <Fab size="small" aria-label="go back" disableRipple
                className={classes.goBackBtn} onClick={handleGoBack}>
                    <ChevronLeftIcon/>
                </Fab>
                <Experience 
                exp={exp} 
                floatButtons={
                    <FloatButtons 
                    showSave
                    handleSave={() => {}}/>}
                images={images}/>
                <div className={classes.footer}>
                    {creatorEmail.length > 0?
                    <Button 
                    variant="contained" 
                    style={{backgroundColor: '#68DAF9'}}
                    size="large"
                    href={`mailto:${creatorEmail}`}>
                        Notify the creator about your decision
                    </Button> :
                    <><Button 
                    variant="contained" 
                    style={{backgroundColor: '#00C77C'}}
                    size="large"
                    onClick={handleDecision('approved')}>
                        Approve <span role="img" aria-label="approve">👍🏼</span>
                    </Button>
                    <Button 
                    variant="contained" 
                    color="secondary" 
                    size="large"
                    onClick={handleDecision('refused')}>
                        Reject <span role="img" aria-label="reject">👎🏼</span>
                    </Button></>}
                </div>
                </>}
        </div>
    );
}

export default ApprovalPage;