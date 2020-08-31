import React from 'react';

import Navbar from './Navbar';
import NavDots from '../../../../components/NavDots/NavDots';
import Footer from './Footer';

import {makeStyles} from '@material-ui/core/styles';
import {layoutStyles} from './LayoutStyles';
const useStyles = makeStyles(layoutStyles);

const Layout = (props) => {
    const classes = useStyles();
    return (
        <div className={classes.root}>
            <Navbar 
            completed={props.completedSteps}
            currStage={props.currStage}/>
            <div className={classes.content}>
                <NavDots currentStep={props.currStage} numSteps={11}
                className={classes.navDots}/>
                {props.children}
            </div>
            <Footer 
            canContinue={props.canContinue}
            currStage={props.currStage} 
            backLink={props.backLink} 
            nextLink={props.nextLink}
            numSteps={11}/>
        </div>
    );
}

export default Layout;