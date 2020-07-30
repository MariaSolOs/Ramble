import React from 'react';

//Components 
import BecomeACreator from './BecomeACreator/BecomeACreator';
import MeetCreators from './MeetCreators/MeetCreators';
import GetYourActOut from './GetYourActOut/GetYourActOut';
import Footer from '../../../components/Footer/Footer';

//Styles
import {makeStyles} from '@material-ui/core/styles';
const useStyles = makeStyles((theme) => ({
    root: {
        minWidth: '100vw',
        minHeight: '100vh',
        boxSizing: 'border-box',
    }
}));

const CreatorsIntro = (props) => {
    const classes = useStyles();

    return (
        <div className={classes.root}>
            <BecomeACreator/>
            <MeetCreators/>
            <GetYourActOut/>
            <Footer/>
        </div>
    );
}

export default CreatorsIntro;