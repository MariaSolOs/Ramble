import React from 'react';
import uuid from 'react-uuid';

import CategoryBox from '../CategoryBox/CategoryBox';
import QuickInfos from './QuickInfos';
import CreatorInfo from './Creator';
import Description from './Description';
import ExperienceMap from './ExperienceMap';
import onlineIcon from '../../shared/images/computer-exp.svg';

import { makeStyles } from '@material-ui/core/styles';
import { pageStyles } from './ExperienceStyles';
const useStyles = makeStyles(pageStyles);

const Experience = ({ exp, floatButtons, lang }) => {
    const classes = useStyles();

    return (
        <div className={classes.body}>
            {exp.zoomInfo &&
                <div className={classes.online}>
                    <img src={onlineIcon} alt="Online experience"/>
                    ONLINE
                </div>}
            <div className={classes.header}>
                <h1 className={classes.title}>{exp.title}</h1>
                {floatButtons}
            </div>
            <p className={classes.location}>
                {exp.location.displayLocation}
            </p>
            <div className={classes.categories}>
                {exp.categories.map(categ => (
                    <CategoryBox 
                    key={uuid()}
                    lang={lang}
                    category={categ} 
                    iconLocation="left"
                    height="35px" 
                    width="130px"/>
                ))}
            </div>
            <QuickInfos 
            duration={exp.duration} 
            capacity={exp.capacity}
            languages={exp.languages}
            ageRestriction={exp.ageRestriction}
            lang={lang}/>
            <CreatorInfo creator={exp.creator} lang={lang}/>
            <Description 
            lang={lang}
            description={exp.description} 
            includedItems={exp.included}
            toBringItems={exp.toBring}/>
            {exp.location.coordinates && exp.location.coordinates.lat && 
                <ExperienceMap coordinates={exp.location.coordinates}/>}
        </div>
    );
}

export default Experience;