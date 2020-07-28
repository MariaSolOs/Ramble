import React from 'react';

import Avatar from '@material-ui/core/Avatar';

import {makeStyles} from '@material-ui/core/styles';
const useStyles = makeStyles(() => ({
    root: {
        display: 'flex',
        width: 'auto',
        margin: '0 auto',
        '& > img': {
            borderRadius: '0.5rem',
            minWidth: 100,
            maxWidth: '35%',
            height: 150,
            marginRight: '0.5rem'
        }
    },
    details: {
        display: 'flex',
        flexDirection: 'column',
        fontFamily: 'Helvetica, sans-serif',
        fontWeight: 'bold',
        letterSpacing: '-0.05rem',
    },
    title: {
        color: '#FFF',
        margin: '4px 0 10px'
    },
    date: {
        color: '#C8C8C8',
        margin: 0,
        whiteSpace: 'nowrap'
    },
    creator: {
        display: 'flex',
        alignItems: 'center',
        marginTop: 10,
        '& .photo': {
            width: 30,
            height: 30,
            marginRight: 4 
        },
        '& span': { 
            color: '#C8C8C8',
            fontSize: '0.9rem'
        }
    }
}));

const ExperienceSummary = ({date, timeslot, exp}) => {
    const classes = useStyles();

    //To format the occurrence
    const format = {year: 'numeric', month: 'short', day: 'numeric'};
    const occString = `${new Date(date)
                        .toLocaleDateString('en-US', format)}, ${timeslot.split('-')[0]}`;

    return (
        <div className={classes.root}>
            <img 
            src={exp.img.replace('h_400', 'h_200')}
            alt={`Experience - ${exp.title}`}/>
            <div className={classes.details}>
                <h4 className={classes.title}>{exp.title}</h4>
                <h4 className={classes.date}>{occString}</h4>
                <div className={classes.creator}>
                    <Avatar src={exp.creator.photo} alt="Experience creator" className="photo"/>
                    <span>{exp.creator.name}</span>
                </div>
            </div>
        </div>
    );
}

export default React.memo(ExperienceSummary);