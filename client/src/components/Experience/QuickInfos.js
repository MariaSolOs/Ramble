import React from 'react';

import {FontAwesomeIcon} from '@fortawesome/react-fontawesome';
import {faClock} from '@fortawesome/free-solid-svg-icons/faClock';
import {faComments} from '@fortawesome/free-solid-svg-icons/faComments';
import {faUsers} from '@fortawesome/free-solid-svg-icons/faUsers';
import {faUserPlus} from '@fortawesome/free-solid-svg-icons/faUserPlus';

import {makeStyles} from '@material-ui/core/styles';
import {quickInfosStyles} from './ExperienceStyles';
const useStyles = makeStyles(quickInfosStyles);

const QuickInfos = (props) => {
    const classes = useStyles({ 
        rootPadding: props.languages.length,
        numSlots: props.ageRestriction? 4 : 3
    });

    //For nice time formatting
    const getDuration = () => {
        const minutes = props.duration - Math.floor(props.duration);
        const hours = Math.floor(props.duration);
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
                    {`${props.capacity} ${props.capacity > 1? 'People' : 'Person'}`}
                </span>
            </div>
            <div>
                <div className={classes.icon}>
                    <FontAwesomeIcon icon={faComments}/>
                </div>
                <span className={classes.label}>
                    {props.languages.length > 1? 'Languages' : 'Language'}
                </span>
                <span className={classes.content}>
                    {props.languages.join(', ')}
                </span>
            </div>
            {props.ageRestriction &&
                <div>
                    <div className={classes.icon}>
                        <FontAwesomeIcon icon={faUserPlus}/>
                    </div>
                    <span className={classes.label}>
                        Age restriction
                    </span>
                    <span className={classes.content}>
                        {`${props.ageRestriction} +`} 
                    </span>
                </div>}
        </div>
    );
}

export default React.memo(QuickInfos);