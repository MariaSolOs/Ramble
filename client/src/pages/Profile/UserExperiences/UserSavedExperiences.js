import React from 'react';
import {Link, useHistory} from 'react-router-dom';
import {connect} from 'react-redux';
import {unsaveExperience} from '../../../store/actions/user';

//Components
import Fab from '@material-ui/core/Fab';
import {FontAwesomeIcon} from '@fortawesome/react-fontawesome';
import {faHeart} from '@fortawesome/free-solid-svg-icons/faHeart';
import ExperienceCard from '../../../components/ExperienceCard';
import NavRow from './UserExperiencesNavRow';

//Styles
import {makeStyles} from '@material-ui/core/styles';
import styles from './UserExperiencesStyles';
const useStyles = makeStyles(styles);

const UserSavedExperiences = (props) => {
    const classes = useStyles();

    //Experience card actions
    const history = useHistory();
    const handleViewExp = (expId) => (e) => {
        history.push(`/experience/${expId}`);
    }
    const handleUnsave = (expId) => (e) => {
        e.stopPropagation();
        props.unsaveExp(expId);
    }

    return (
        <div className={classes.root}>
            <NavRow/>
            <div className={classes.gallery}>
                {props.savedExps.length > 0? 
                    props.savedExps.map(exp => (
                        <div className={classes.card} 
                        key={exp._id}
                        onClick={handleViewExp(exp._id)}>   
                            <Fab aria-label="unsave" disableRipple 
                            className={classes.heartButton} 
                            onClick={handleUnsave(exp._id)}>
                                <FontAwesomeIcon icon={faHeart}/>
                            </Fab>
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

const mapStateToProps = (state) => ({
    savedExps: state.user.savedExps
});
const mapDispatchToProps = (dispatch) => ({
    unsaveExp: (expId) => dispatch(unsaveExperience(expId))
});
export default connect(mapStateToProps, mapDispatchToProps)(UserSavedExperiences);
