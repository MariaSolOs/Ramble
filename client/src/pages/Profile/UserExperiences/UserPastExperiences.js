import React from 'react';
import {Link} from 'react-router-dom';
import {useSelector} from 'react-redux';
import {useHistory} from 'react-router-dom';

//Components
import ExperienceCard from '../../../components/ExperienceCard/ExperienceCard';
import NavRow from './UserExperiencesNavRow';

//Styles
import {makeStyles} from '@material-ui/core/styles';
import styles from './UserExperiencesStyles';
const useStyles = makeStyles(styles);

const UserPastExperiences = (props) => {
    const classes = useStyles();
    const pastExps = useSelector(state => state.exp.pastExps);

    const history = useHistory();
    const handleViewExp = (expId) => (e) => {
        history.push(`/experience/view/${expId}`);
    }

    return (
        <div className={classes.root}>
            <NavRow/>
            <div className={classes.gallery}>
                {pastExps.length > 0? 
                    pastExps.map(exp => (
                        <ExperienceCard
                        key={exp._id}
                        exp={exp}
                        className={classes.card}
                        onCardClick={handleViewExp(exp._id)}/>
                    )) : 
                    <h2 className={classes.exploreLink}>
                        <Link to="/experience/search">Start exploring</Link>
                    </h2>}
            </div>
        </div>
    ); 
}

export default UserPastExperiences;

