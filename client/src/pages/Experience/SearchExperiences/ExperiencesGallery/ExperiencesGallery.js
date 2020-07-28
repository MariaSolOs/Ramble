import React, {useCallback} from 'react';
import {connect} from 'react-redux';
import {saveExperience, unsaveExperience} from '../../../../store/actions/user';
import {useHistory} from 'react-router-dom';
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

const ExperiencesGallery = (props) => {
    const classes = useStyles();

    //For showing experience pages
    const history = useHistory();
    const handleViewExp = useCallback((expId) => (e) => {
        history.push(`/experience/${expId}`);
    }, [history]);

    //For saving/unsaving an experience
    const {savedExps, unsaveExp, saveExp} = props;
    const handleHeartClick = useCallback((expId) => (e) => {
        //Don't show the experience page
        e.stopPropagation();
        if(savedExps.includes(expId)) {
            unsaveExp(expId);
        } else {
            saveExp(expId);
        }
    }, [savedExps, saveExp, unsaveExp]);

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
                    isAuth={props.isAuth}
                    saved={props.savedExps.includes(exp._id)}
                    onHeartClick={handleHeartClick(exp._id)}
                    onViewExperience={handleViewExp(exp._id)}/>
                </CSSTransition>
            ))}
        </TransitionGroup>
    );
}

const mapStateToProps = (state) => ({
    isAuth: (state.user.token !== null),
    savedExps: state.user.savedExps.map(exp => exp._id)
});
const mapDispatchToProps = (dispatch) => ({
    saveExp: (expId) => dispatch(saveExperience(expId)),
    unsaveExp: (expId) => dispatch(unsaveExperience(expId))
});

export default connect(mapStateToProps, mapDispatchToProps)(ExperiencesGallery);