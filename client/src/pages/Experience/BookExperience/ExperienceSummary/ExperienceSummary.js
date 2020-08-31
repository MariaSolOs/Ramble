import React from 'react';

import {makeStyles} from '@material-ui/core/styles';
import styles from './ExperienceSummaryStyles';
const useStyles = makeStyles(styles);

const ExperienceSummary = ({date, timeslot, exp}) => {
    const classes = useStyles();

    //To format the occurrence's date
    const format = {month: 'long', day: 'numeric', weekday: 'long'};

    const dateString = new Date(date).toLocaleDateString('en-US', format);

    return (
        <div className={classes.root}>
            <div className={classes.body}>
                <h4 className={classes.title}>{exp.title}</h4>
                <p className={classes.details}>{dateString}</p>
                <p className={classes.details}>
                    {`${timeslot.split('-')[0]} - ${timeslot.split('-')[1]}`}
                </p>
            </div>
        </div>
    );
}

export default React.memo(ExperienceSummary);