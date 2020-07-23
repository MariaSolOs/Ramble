import React from 'react';
import {Link} from 'react-router-dom';
import {useSelector} from 'react-redux';

//Components
import ExperienceCard from '../../../components/ExperienceCard';
import NavRow from './UserExperiencesNavRow';

//Styles
import {makeStyles} from '@material-ui/core/styles';
import styles from './UserExperiencesStyles';
const useStyles = makeStyles(styles);

const UserPastExperiences = (props) => {
    const classes = useStyles();
    const pastExps = useSelector(state => state.user.pastExps);

    return (
        <div className={classes.root}>
            <NavRow/>
            <div className={classes.gallery}>
                {pastExps.length > 0? 
                    pastExps.map(exp => (
                        <div className={classes.card} key={exp._id}>  
                            <ExperienceCard exp={exp}/>
                        </div>
                    )) : 
                    <h2 className={classes.exploreLink}>
                        <Link to="/experience/search">Start exploring</Link>
                    </h2>}
            </div>
        </div>
    ); 
}

export default UserPastExperiences;

