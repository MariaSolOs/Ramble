import React from 'react';

//Components 
import BecomeACreator from './Slides/BecomeACreator/BecomeACreator';
import MeetCreators from './Slides/MeetCreators/MeetCreators';
import GetYourActOut from './Slides/GetYourActOut/GetYourActOut';

//Styles
import {makeStyles} from '@material-ui/core/styles';
const useStyles = makeStyles((theme) => ({
    root: {
        minWidth: '100vw',
        minHeight: '100vh',
        boxSizing: 'border-box',
    }
}));

const Creators = (props) => {
    const classes = useStyles();

    return (
        <div className={classes.root}>
            <BecomeACreator/>
            <MeetCreators/>
            <GetYourActOut/>
        </div>
    );
}

export default Creators;