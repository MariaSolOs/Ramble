import React from 'react';
import { TransitionGroup, CSSTransition } from 'react-transition-group';

import ExperienceCard from '../ExperienceCard/ExperienceCard';

import { makeStyles } from '@material-ui/core/styles';
import styles from './ExperiencesGalleryStyles';
const useStyles = makeStyles(styles);

const ExperiencesGallery = (props) => {
    const classes = useStyles();

    return (
        <TransitionGroup className={classes.gallery}>
            {props.experiences.map(exp => (
                <CSSTransition 
                key={exp._id}
                timeout={300}
                classNames={{
                    enter: classes.fadeEnter,
                    enterActive: classes.fadeEnterActive,
                    exit: classes.fadeExit
                }}>
                    <ExperienceCard 
                    exp={exp}
                    showHeart={props.showHeart}
                    saved={props.showHeart && props.checkIfSaved(exp._id)}
                    onHeartClick={ props.showHeart && props.onHeartClick(exp._id)}
                    onCardClick={props.onCardClick(exp._id)}/>
                </CSSTransition>
            ))}
        </TransitionGroup>
    );
}

export default ExperiencesGallery;