import React from 'react';
import { Link } from 'react-router-dom';

import { makeStyles } from '@material-ui/core/styles';
import styles from './NoCreatedExpsStyles';
const useStyles = makeStyles(styles);

const NoCreatedExps = () => {
    const classes = useStyles();
    
    return (
        <div className={classes.root}>
            <h1 className={classes.title}>
                <Link to="/experience/new/intro">
                    Start creating
                </Link>
            </h1>
        </div>
    );
}

export default NoCreatedExps;