import React from 'react';

import { makeStyles } from '@material-ui/core/styles';
import { footerStyles } from './LayoutStyles';
const useStyles = makeStyles(footerStyles);

const Footer = ({ currStage, onBackClick, onNextClick, numSteps }) => {
    const classes = useStyles();

    return (
        <div className={classes.footer}>
            <p className={classes.saveMsg}>
                Don't forget to save your changes!
            </p>
            <button 
            className={`${classes.nextButton} ${classes.navButton}`}
            onClick={onNextClick}>
                {currStage === numSteps - 1? 
                    'Save changes' : 'Next'}
            </button>
            <button 
            className={`${classes.backButton} ${classes.navButton}`}
            onClick={onBackClick}>
                {currStage === numSteps - 1? 
                    'My dashboard' : 'Back'}
            </button>
        </div>
    );
}

export default React.memo(Footer);