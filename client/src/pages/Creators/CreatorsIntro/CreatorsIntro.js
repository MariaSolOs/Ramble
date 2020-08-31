import React from 'react';

//Components 
import BecomeACreator from './BecomeACreator/BecomeACreator';
import MeetCreators from './MeetCreators/MeetCreators';
import GetYourActOut from './GetYourActOut/GetYourActOut';
import Footer from '../../../components/Footer/Footer';

import {makeStyles} from '@material-ui/core/styles';
import styles from './CreatorsIntroStyles';
const useStyles = makeStyles(styles);

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