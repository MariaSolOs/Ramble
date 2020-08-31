import React from 'react';
import {useHistory} from 'react-router-dom';

import {makeStyles} from '@material-ui/core/styles';
import {footerStyles} from './LayoutStyles';
const useStyles = makeStyles(footerStyles);

const Footer = ({currStage, backLink, nextLink, numSteps, canContinue}) => {
    const classes = useStyles();
    const history = useHistory();

    return (
        <div className={classes.footer}>
            {currStage <= numSteps - 1 && 
                <button 
                className={`${classes.nextButton} ${classes.navButton}`}
                disabled={!canContinue}
                onClick={() => history.push(nextLink)}>
                    {currStage === numSteps - 1? 'Submit my experience' : 'Next'}
                </button>}
            {currStage > 0 && 
                <button 
                className={`${classes.backButton} ${classes.navButton}`}
                onClick={() => history.push(backLink)}>
                    Back
                </button>}
        </div>
    );
}

export default React.memo(Footer);