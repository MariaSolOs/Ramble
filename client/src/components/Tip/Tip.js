import React from 'react';

import {FontAwesomeIcon} from '@fortawesome/react-fontawesome';
import {faLightbulb} from '@fortawesome/free-regular-svg-icons/faLightbulb';

import {makeStyles} from '@material-ui/core/styles';
import styles from './TipStyles';
const useStyles = makeStyles(styles);

/**
 * Displays a tip with lightbulb icon
 * @param {String} [className] - Optional classname
 * @param {SVGElement} [icon] - FontAwesomeIcon to display. 
 *                              The default is a lightbulb.
 */
const Tip = (props) => {
    const classes = useStyles();
    
    return (
        <p className={`${classes.root} ${props.className}`}>
            <FontAwesomeIcon icon={props.icon? props.icon : faLightbulb}/>
            {props.children}
        </p>
    );
}

export default React.memo(Tip);