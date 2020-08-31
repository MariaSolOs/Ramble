import React from 'react';

import OhNoPic from '../../shared/images/OhNoRamble.png';

import {makeStyles} from '@material-ui/core/styles';
import styles from './Page404Styles';
const useStyles = makeStyles(styles);

const Page404 = (props) => {
    const classes = useStyles();

    return (
        <div className={classes.root}>
            <div className={classes.content}>
                <img 
                src={OhNoPic} 
                alt="404 page"
                className="oh-no-face"/>
                <div>
                    <h1 className={classes.title}>Sorry...</h1>
                    <h3 className={classes.subtitle}>
                        There seems to be a problem with the page you're 
                        looking for.
                    </h3>
                    <h3 className={classes.message}>Error 404</h3>
                    <h3 className={classes.message}>
                        Try going back or reloading the page.
                    </h3>
                </div>
            </div>
        </div>
    );
}

export default Page404;