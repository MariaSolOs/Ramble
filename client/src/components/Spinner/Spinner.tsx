import React from 'react';

import { makeStyles } from '@material-ui/core/styles';
import styles from './Spinner.styles';
const useStyles = makeStyles(styles);

type Props = {
    className?: string;
}

const Spinner = (props: Props) => {
    const classes = useStyles();

    return (
        <div className={classes.backdrop}>
            <div className={props.className}>
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