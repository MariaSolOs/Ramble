import React from 'react';

//Components
import Navbar from './Navbar/Navbar';
import NavDots from '../../../../components/NavDots';
import Footer from './Footer';

//Styles
import {makeStyles} from '@material-ui/core/styles';
const useStyles = makeStyles(() => ({
    root: {
        margin: '15vh auto 0',
        display: 'flex',
        width: '90%',
        height: '85vh'
    },
    content: {
        display: 'flex',
        flexDirection: 'column',
        width: '70%',
        marginLeft: '3vw',
    },
    navDots: { marginBottom: '1.5rem' }
}));

const Layout = (props) => {
    const classes = useStyles();
    return (
        <div className={classes.root}>
            <Navbar 
            completed={props.completedSteps}
            currStage={props.currStage}/>
            <div className={classes.content}>
                <NavDots currentStep={props.currStage} numSteps={12}
                className={classes.navDots}/>
                {props.children}
            </div>
            <Footer 
            canContinue={props.canContinue}
            currStage={props.currStage} 
            backLink={props.backLink} 
            nextLink={props.nextLink}
            numSteps={12}/>
        </div>
    );
}

export default Layout;