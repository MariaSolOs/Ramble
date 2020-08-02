import React from 'react';
import {useHistory} from 'react-router-dom';

//Styles
import {makeStyles} from '@material-ui/core/styles';
const useStyles = makeStyles((theme) => ({
    footer: {
        position: 'fixed',
        bottom: 0,
        left: 0,
        right: 0,
        padding: '0.5% 4%',
        maxHeight: 65,
        boxSizing: 'border-box',
        backgroundColor: '#1C1C1C',
        '& button': {
            fontFamily: 'Helvetica, sans-serif',
            fontWeight: 'bold',
            letterSpacing: '-0.05rem',
            border: 'none',
            '&:focus': { outline: 'none' }
        }
    },
    saveButton: {
        backgroundColor: '#282828',
        borderRadius: '0.5rem',
        color: '#EBEBEB',
        padding: '1% 2%',
        fontSize: '1rem',
        cursor: 'pointer'
    },
    navButton: {
        float: 'right',
        borderRadius: 30,
        color: 'white',
        padding: '1% 4%',
        fontSize: '1.1rem',
        cursor: 'pointer'
    },
    backButton: {
        background: 'radial-gradient(circle at 96%, #2E2E2E, #6F6F6F)',
        marginRight: '1.5rem'
    },
    nextButton: {
        background: 'radial-gradient(circle at 96%, #2BB282, #2D73EA)',
        '&:disabled': { 
            filter: 'brightness(40%)',
            cursor: 'not-allowed'
        }
    },
}));

//TODO: Add the save for now feature
const Footer = ({currStage, backLink, nextLink, numSteps, canContinue}) => {
    const classes = useStyles();
    const history = useHistory();

    return (
        <div className={classes.footer}>
            <button className={classes.saveButton}>
                Save for now
            </button>
            {currStage <= numSteps - 1 && 
                <button 
                className={`${classes.nextButton} ${classes.navButton}`}
                disabled={!canContinue}
                onClick={() => history.push(`/experience/new/${nextLink}`)}>
                    {currStage === numSteps - 1? 'Submit my experience' : 'Next'}
                </button>}
            {currStage > 0 && 
                <button 
                className={`${classes.backButton} ${classes.navButton}`}
                onClick={() => history.push(`/experience/new/${backLink}`)}>
                    Back
                </button>}
        </div>
    );
}

export default React.memo(Footer);