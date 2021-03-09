import React from 'react';

import Navbar from './Navbar';
import NavDots from '../../../../../components/NavDots/NavDots';
import Footer from './Footer';

import { makeStyles } from '@material-ui/core/styles';
import { layoutStyles } from './LayoutStyles';
const useStyles = makeStyles(layoutStyles);

const NUM_STEPS = 7;

const Layout = ({ currStage, onBackClick, onNextClick, isZoomExp, children }) => {
    const classes = useStyles();

    return (
        <div className={classes.root}>
            <Navbar 
            currStage={currStage}
            isZoomExp={isZoomExp}/>
            <div className={classes.content}>
                <NavDots 
                currentStep={currStage} 
                numSteps={NUM_STEPS}
                className={classes.navDots}/>
                {children}
            </div>
            <Footer 
            currStage={currStage} 
            onBackClick={onBackClick} 
            onNextClick={onNextClick}
            numSteps={NUM_STEPS}/>
        </div>
    );
}

export default Layout;