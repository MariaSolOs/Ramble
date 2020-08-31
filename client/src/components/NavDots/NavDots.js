import React from 'react';

import {makeStyles} from '@material-ui/core/styles';
import styles from './NavDotsStyles';
const useStyles = makeStyles(styles);

/**
 * Progress/navigation dots
 * @param {Number} currentStep - For n <= currenStep, dots will be highlighted.
 * @param {Number} numSteps - Total number of steps
 * @param {String} className - For extra styling
 */
const NavDots = ({currentStep, numSteps, className}) => {
    const classes = useStyles();
    
    return (
        <div className={`${classes.navDots} ${className}`}>
            {Array(numSteps).fill(0).map((_, index) => (
                <div 
                key={index}
                style={{backgroundColor: `${index <= currentStep? 'white' : '#505050'}`}}/>
            ))}
        </div>
    );
}

export default React.memo(NavDots);