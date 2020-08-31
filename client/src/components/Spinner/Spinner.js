import React from 'react';

import {makeStyles} from '@material-ui/core/styles';
import styles from './SpinnerStyles';
const useStyles = makeStyles(styles);

const Spinner = (props) => {
    const classes = useStyles();
    return (
        <div className={classes.container}>
            <div className={classes.spinner}>
                <div className="bounce1"/>
                <div className="bounce2"/>
                <div/>
            </div>
        </div>
    );
}

export default Spinner;