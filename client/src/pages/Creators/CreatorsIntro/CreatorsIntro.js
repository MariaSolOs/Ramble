import React from 'react';

import BecomeACreator from './BecomeACreator/BecomeACreator';
import MeetCreators from './MeetCreators/MeetCreators';
import GetYourActOut from './GetYourActOut/GetYourActOut';
import Footer from '../../../components/Footer/Footer';

import { makeStyles } from '@material-ui/core/styles';
import styles from './CreatorsIntroStyles';
const useStyles = makeStyles(styles);

const CreatorsIntro = ({ lang }) => {
    const classes = useStyles();

    return (
        <div className={classes.root}>
            <BecomeACreator lang={lang}/>
            <MeetCreators lang={lang}/>
            <GetYourActOut lang={lang}/>
            <Footer/>
        </div>
    );
}

export default CreatorsIntro;