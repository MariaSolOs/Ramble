import React from 'react';

import {FontAwesomeIcon} from '@fortawesome/react-fontawesome';
import {faLightbulb} from '@fortawesome/free-regular-svg-icons/faLightbulb';

import {makeStyles} from '@material-ui/core/styles';
const useStyles = makeStyles(() => ({
    root: {
        color: '#CDCDCD',
        fontFamily: 'inherit',
        letterSpacing: '-0.05rem',
        fontSize: '0.95rem',
        '& svg': {
            fontSize: '1.3rem',
            marginRight: '0.5rem'
        }
    }
}));

/**
 * Displays a tip with lightbulb icon
 * @param {String} [className] - Optional classname
 */
const Tip = (props) => {
    const classes = useStyles();
    return (
        <p className={`${classes.root} ${props.className}`}>
            <FontAwesomeIcon icon={faLightbulb}/>
            {props.children}
        </p>
    );
}

export default React.memo(Tip);