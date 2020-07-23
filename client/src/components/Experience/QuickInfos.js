import React from 'react';

import {FontAwesomeIcon} from '@fortawesome/react-fontawesome';
import {faUsers} from '@fortawesome/free-solid-svg-icons/faUsers';
import {faClock} from '@fortawesome/free-solid-svg-icons/faClock';
import {faComments} from '@fortawesome/free-solid-svg-icons/faComments';

import {makeStyles} from '@material-ui/core/styles';
const useStyles = makeStyles(() => ({
    root: {
        display: 'flex',
        justifyContent: 'space-around',
        width: '85%',
        backgroundColor: '#1C1C1C',
        borderRadius: '1rem',
        margin: '1rem 0',
        cursor: 'default',
        whiteSpace: 'nowrap',
        padding: props => `0 ${10 + 5*(props.rootPadding)}px`,
        '& > div': {
            display: 'flex',
            flexDirection: 'column',
            position: 'relative',
            letterSpacing: '-0.05rem',
            margin: '1rem', 
            '&:nth-child(3)': { //Allow languages to wrap
                whiteSpace: 'pre-line' 
            }
        }
    },
    label: {
        fontSize: '0.9rem',
        color: '#717171',
        textTransform: 'uppercase',
        marginBottom: 3
    },
    content: {
        fontSize: '1.05rem',
        color: '#DDDDDD',
        textTransform: 'capitalize',
    },
    icon: {
        backgroundColor: '#1C1C1C',
        borderRadius: '50%',
        position: 'absolute',
        top: -28,
        left: -22,
        padding: 5,
        '& svg': {
            color: '#717171',
            fontSize: '1.15rem',
        }
    }
}));
const QuickInfos = ({duration, capacity, languages}) => {
    const classes = useStyles({ rootPadding: languages.length });

    //For nice time formatting
    const getDuration = () => {
        const minutes = duration - Math.floor(duration);
        const hours = Math.floor(duration);
        return (`${hours}h${minutes === 0? '' : 30}`);
    }

    return (
        <div className={classes.root}>
            <div>
                <div className={classes.icon}>
                    <FontAwesomeIcon icon={faClock}/>
                </div>
                <span className={classes.label}>Duration</span>
                <span className={classes.content}>{getDuration()}</span>
            </div>
            <div>
                <div className={classes.icon}>
                    <FontAwesomeIcon icon={faUsers}/>
                </div>
                <span className={classes.label}>Up to</span>
                <span className={classes.content}>
                    {`${capacity} ${capacity > 1? 'People' : 'Person'}`}
                </span>
            </div>
            <div>
                <div className={classes.icon}>
                    <FontAwesomeIcon icon={faComments}/>
                </div>
                <span className={classes.label}>
                    {languages.length > 1? 'Languages' : 'Language'}
                </span>
                <span className={classes.content}>
                    {languages.join(', ')}
                </span>
            </div>
        </div>
    );
}

export default React.memo(QuickInfos);