import React from 'react';

import { makeStyles } from '@material-ui/core/styles';
import styles from './Spinner.styles';
const useStyles = makeStyles(styles);

const Spinner = () => {
    const classes = useStyles();

    return (
        <div className={classes.backdrop}>
            <div>
                <div className={classes.spinner}>
                    <div className={classes.bounce1} />
                    <div className={classes.bounce2} />
                    <div />
                </div>
            </div>
        </div>
    );
}

export default React.memo(Spinner);