import React from 'react';
import {Link, useHistory} from 'react-router-dom';
import {useDispatch, useSelector} from 'react-redux';
import {unsaveExperience} from '../../../store/actions/experiences';

//Components
import ExperienceCard from '../../../components/ExperienceCard/ExperienceCard';
import NavRow from './UserExperiencesNavRow';

//Styles
import {makeStyles} from '@material-ui/core/styles';
import styles from './UserExperiencesStyles';
const useStyles = makeStyles(styles);

const UserSavedExperiences = (props) => {
    const classes = useStyles();

    //Experience card actions
    const savedExps = useSelector(state => state.exp.savedExps);
    const dispatch = useDispatch();
    const history = useHistory();
    const handleViewExp = (expId) => (e) => {
        history.push(`/experience/view/${expId}`);
    }
    const handleUnsave = (expId) => (e) => {
        e.stopPropagation();
        dispatch(unsaveExperience(expId));
    }

    return (
        <div className={classes.root}>
            <NavRow/>
            <div className={classes.gallery}>
                {savedExps.length > 0? 
                    savedExps.map(exp => (
                        <ExperienceCard
                        key={exp._id}
                        exp={exp}
                        showHeart
                        saved
                        className={classes.card}
                        onHeartClick={handleUnsave(exp._id)}
                        onCardClick={handleViewExp(exp._id)}/>
                    )) : 
                    <h2 className={classes.exploreLink}>
                        <Link to="/experience/search">Start exploring</Link>
                    </h2>}
            </div>
        </div>
    ); 
}

export default UserSavedExperiences;

