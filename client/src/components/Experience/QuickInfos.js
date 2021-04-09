import React from 'react';
import { QuickInfosText as text } from './ExperienceText';

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faClock } from '@fortawesome/free-solid-svg-icons/faClock';
import { faComments } from '@fortawesome/free-solid-svg-icons/faComments';
import { faUsers } from '@fortawesome/free-solid-svg-icons/faUsers';
import { faUserPlus } from '@fortawesome/free-solid-svg-icons/faUserPlus';

import { makeStyles } from '@material-ui/core/styles';
import { quickInfosStyles } from './ExperienceStyles';
const useStyles = makeStyles(quickInfosStyles);

const QuickInfos = (props) => {
    const classes = useStyles({ 
        rootPadding: props.languages.length,
        numSlots: props.ageRestriction? 4 : 3
    });

    // For nice time formatting
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
                <span className={classes.label}>{text.duration[props.lang]}</span>
                <span className={classes.content}>{getDuration()}</span>
            </div>
            <div>
                <div className={classes.icon}>
                    <FontAwesomeIcon icon={faUsers}/>
                </div>
                <span className={classes.label}>{text.upTo[props.lang]}</span>
                <span className={classes.content} style={{ whiteSpace: 'nowrap' }}>
                    {`${props.capacity} ${props.capacity > 1? text.people[props.lang] : text.person[props.lang]}`}
                </span>
            </div>
            <div>
                <div className={classes.icon}>
                    <FontAwesomeIcon icon={faComments}/>
                </div>
                <span className={classes.label}>
                    {props.languages.length > 1? text.langs[props.lang] : text.lang[props.lang]}
                </span>
                <span className={classes.content}>
                    {props.languages.join(', ')}
                </span>
            </div>
            {props.ageRestriction ?
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
                </div> : null}
        </div>
    );
}

export default React.memo(QuickInfos);