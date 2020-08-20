import React from 'react';
import uuid from 'react-uuid';

//Components and icons
import CategoryBox from '../CategoryBox/CategoryBox';
import QuickInfos from './QuickInfos';
import CreatorInfo from './Creator';
import Description from './Description';
import ExperienceMap from './ExperienceMap';

//Styles
import {makeStyles} from '@material-ui/core/styles';
import {pageStyles} from './ExperienceStyles';
const useStyles = makeStyles(pageStyles);

const Experience = ({exp, floatButtons}) => {
    const classes = useStyles();

    return (
        <div className={classes.body}>
            <div className={classes.header}>
                <h1 className={classes.title}>{exp.title}</h1>
                {floatButtons}
            </div>
            <p className={classes.location}>{exp.location.displayLocation}</p>
            <div className={classes.categories}>
                {exp.categories.map(categ => (
                    <CategoryBox 
                    key={uuid()}
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
            ageRestriction={exp.ageRestriction}/>
            <CreatorInfo creator={exp.creator}/>
            <Description 
            description={exp.description} 
            includedItems={exp.included}
            toBringItems={exp.toBring}/>
            {exp.location.coordinates.lat && 
                <ExperienceMap coordinates={exp.location.coordinates}/>}
        </div>
    );
}

export default Experience;