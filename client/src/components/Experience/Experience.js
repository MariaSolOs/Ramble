import React from 'react';
import uuid from 'react-uuid';

//Components and icons
import Carousel from '../Carousel';
import CategoryBox from '../CategoryBox';
import QuickInfos from './QuickInfos';
import CreatorInfo from './Creator';
import Description from './Description';

//Styles
import {makeStyles} from '@material-ui/core/styles';
import styles from './ExperienceStyles';
const useStyles = makeStyles(styles);

const Experience = ({exp, images, floatButtons}) => {
    const classes = useStyles();

    return (
        <>
            <Carousel images={images}/>
            <div className={classes.body}>
                <div className={classes.header}>
                    <h1 className={classes.title}>{exp.title}</h1>
                    {floatButtons}
                </div>
                <p className={classes.location}>{exp.location.displayLocation}</p>
                <div className={classes.categories}>
                    {exp.categories.map(categ => (
                        <CategoryBox category={categ} height="35px" width="30%" key={uuid()}/>
                    ))}
                </div>
                <QuickInfos 
                duration={exp.duration} 
                capacity={exp.capacity}
                languages={exp.languages}/>
                <CreatorInfo creator={exp.creator}/>
                <Description 
                description={exp.description} 
                includedItems={exp.included}/>
            </div>
        </>
    );
}

export default Experience;