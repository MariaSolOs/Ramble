import React from 'react';

import Tooltip from '@material-ui/core/Tooltip';

import {makeStyles} from '@material-ui/core/styles';
import styles from './AvailabilitiesStyles';
const useStyles = makeStyles(styles);

const ExpNav = (props) => {
    const classes = useStyles();

    const handleExpClick = (exp) => (e) => {
        if(props.changesSaved) {
            props.onExpChange(exp);
        }
    }

    return (
        <div className={classes.expNav}>
            {props.experiences.map(exp => (
                <Tooltip 
                key={exp._id}
                disableFocusListener
                placement="top"
                title={props.changesSaved? exp.title : 
                'Please save changes before seeing the rest of your calendar!'}
                classes={{tooltip: classes.tooltip}}>
                    <img 
                    src={exp.images[0]} 
                    alt={exp.title}
                    onClick={handleExpClick(exp)}/>
                </Tooltip>
            ))}
        </div>
    );
}

export default React.memo(ExpNav);