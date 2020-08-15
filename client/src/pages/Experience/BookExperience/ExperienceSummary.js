import React from 'react';

import {makeStyles} from '@material-ui/core/styles';
const useStyles = makeStyles(() => ({
    root: {
        display: 'flex',
        width: 'auto',
        margin: '0 auto'
    },
    body: {
        display: 'flex',
        flexDirection: 'column',
        fontFamily: 'Helvetica, sans-serif',
        fontWeight: 'bold',
        letterSpacing: '-0.05rem',
    },
    title: {
        color: '#FFF',
        fontSize: '1.3rem',
        margin: '4px 0'
    },
    details: {
        color: '#C8C8C8',
        margin: '5px 0 0',
        whiteSpace: 'nowrap'
    }
}));

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