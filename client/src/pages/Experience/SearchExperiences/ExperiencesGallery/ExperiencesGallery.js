import React from 'react';
import {TransitionGroup, CSSTransition} from 'react-transition-group';

import ExperienceCard from './ExperienceCard';

//Styles
import {makeStyles} from '@material-ui/core/styles';
const useStyles = makeStyles(() => ({
    gallery: {
        width: '85%',
        margin: '0 auto 3%',
        display: 'flex',
        flexWrap: 'wrap',
    },

    //Card transitions
    fadeEnter: { 
        opacity: 0,
    },
    fadeEnterActive: { 
        opacity: 1,
        transition: 'all 300ms ease-in'
    },
    fadeExit: { 
        display: 'none',
    }
}));

const ExperiencesGallery = ({experiences}) => {
    const classes = useStyles();

    return (
        <TransitionGroup className={classes.gallery}>
            {experiences.map(exp => (
            <CSSTransition 
                key={exp._id}
                timeout={300}
                classNames={{
                    enter: classes.fadeEnter,
                    enterActive: classes.fadeEnterActive,
                    exit: classes.fadeExit
                }}>
                    <ExperienceCard exp={exp}/>
                </CSSTransition>
            ))}
        </TransitionGroup>
    );
}

export default React.memo(ExperiencesGallery);