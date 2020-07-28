import React, {useState, useEffect} from 'react';
import axios from 'axios';
import {useParams, useHistory} from 'react-router-dom';

//Components and icons
import Button from '@material-ui/core/Button';
import FloatButtons from '../../components/ShareSaveButtons';
import Fab from '@material-ui/core/Fab';
import ChevronLeftIcon from '@material-ui/icons/ChevronLeft';
import Experience from '../../components/Experience/Experience';

//Styles
import 'react-image-gallery/styles/css/image-gallery.css';
import {makeStyles} from '@material-ui/core/styles';
const useStyles = makeStyles((theme) => ({
    root: {
        position: 'relative',
        margin: '12vh 0 10vh',
        width: '100vw',
        padding: '2% 15% 2% 15%',
        boxSizing: 'border-box',
        display: 'flex',
        flexDirection: 'row',
        overflowY: 'scroll',
        backgroundColor: '#151515',
        [theme.breakpoints.down('sm')]: { flexDirection: 'column' },
    },

    goBackBtn: {
        position: 'absolute',
        top: 25, left: 25,
        color: 'whitesmoke',
        backgroundColor: '#656565',
        '&:hover': { backgroundColor: '#656565' },
        '& svg': { fontSize: '2.1rem' }
    },
    footer: {
        position: 'fixed',
        bottom: 0, left: 0, right: 0,
        padding: '0.65rem 2rem',
        display: 'flex',
        height: '5vh',
        justifyContent: 'center',
        marginLeft: -20,
        backgroundColor: '#242424',
        '& button': {
            fontWeight: 'bold',
            '&:first-child': {
                marginRight: 20
            }
        }
    }
}));

const ApprovalPage = (props) => {
    const classes = useStyles();

    //Fetch the requested experience
    const history = useHistory();
    const {id} = useParams();
    const [exp, setExp] = useState(null);
    const {displaySnackbar} = props;
    useEffect(() => {
        let mounted = true;
        axios.get(`/api/exp/${id}`)
        .then(res => { 
            if(res.status === 200 && mounted) { 
                setExp(res.data.exp);
            }
        }).catch(err => {
            displaySnackbar(`LOL try again 👾 ${err}`);
        });
        return () => mounted = false;
    }, [id, history, displaySnackbar]);

    //Go back button
    const handleGoBack = () => history.goBack();

    //Carousel images
    const images = exp && 
        exp.images.map(img => {
            const original = img.replace('h_400', 'h_700');
            const thumbnail = img.replace('h_400', 'h_200');
            return { original, thumbnail }
        }
    );

    const handleDecision = (action) => (e) => {
        if(action === 'approve') {
            axios.patch()
        }
    }

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
                    showSave
                    handleSave={() => {}}/>}
                images={images}/>
                <div className={classes.footer}>
                    <Button 
                    variant="contained" 
                    style={{backgroundColor: '#00C77C'}}
                    size="large"
                    onClick={handleDecision('approve')}>
                        Approve 👍🏼
                    </Button>
                    <Button 
                    variant="contained" 
                    color="secondary" 
                    size="large"
                    onClick={handleDecision('reject')}>
                        Reject 👎🏼
                    </Button>
                </div>
                </>}
        </div>
    );
}

export default ApprovalPage;