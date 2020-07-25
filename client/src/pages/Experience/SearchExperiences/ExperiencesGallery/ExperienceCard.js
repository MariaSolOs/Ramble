import React from 'react';
import {connect} from 'react-redux';
import {saveExperience, unsaveExperience} from '../../../../store/actions/user';
import {useHistory} from 'react-router-dom';

//Components
import Fab from '@material-ui/core/Fab';
import Tooltip from '@material-ui/core/Tooltip';
import {FontAwesomeIcon} from '@fortawesome/react-fontawesome';
import {faHeart} from '@fortawesome/free-solid-svg-icons/faHeart';
import ExperienceCard from '../../../../components/ExperienceCard';

//Styles
import {makeStyles} from '@material-ui/core/styles';
const useStyles = makeStyles((theme) => ({
    card: {
        borderRadius: '1.5rem',
        display: 'inline-block',
        overflow: 'hidden',
        width: '21%',
        minWidth: 170,
        height: 300,
        position: 'relative',
        margin: '0 1.35rem 1.35rem 0',
        '&:hover': {
            transform: 'scale(1.03)',
            transition: 'transform 0.5s'
        }
    },

    //Save button
    saveButton: {
        position: 'absolute',
        top: 10, right: 10,
        height: 36, width: 36,
        backgroundColor: 'rgba(256, 256, 256, 0.56)',
        '& svg': {
            //Heart color: red is exp is saved, white if not
            color: props => props.saved? '#FE4164' : '#FFF',
            fontSize: '1.25rem'
        }
    },

     //Tooltip
     tooltip: {
        fontFamily: 'Helvetica, sans-serif',
        letterSpacing: '-0.05rem',
        fontWeight: 'bold',
        fontSize: 11,
        whiteSpace: 'nowrap',
    },
    tooltip_top: { 
        position: 'absolute',
        right: -50,
        top: -50
    }
}));
const SearchExperienceCard = (props) => {
    const classes = useStyles({saved: props.saved});

    const history = useHistory();

    //For showing experience pages
    const handleViewExp = () => {
        history.push(`/experience/${props.exp._id}`);
    }

    //For saving/unsaving an experience
    const heartAction = props.saved? props.unsaveExp : props.saveExp;
    const handleHeartClick = (e) => {
        //Don't show the experience page
        e.stopPropagation();
        heartAction(props.exp._id);
    }

    return (
        <div className={classes.card} onClick={handleViewExp}>
            {props.isAuth && 
                <Tooltip 
                disableFocusListener
                placement="top-end"
                title={props.saved? 'Saved!' : 'Save experience'}
                classes={{
                    tooltip: classes.tooltip,
                    tooltipPlacementTop: classes.tooltip_top
                }}>
                    <Fab aria-label="save" disableRipple 
                    className={classes.saveButton} onClick={handleHeartClick}>
                        <FontAwesomeIcon icon={faHeart}/>
                    </Fab>
                </Tooltip>}
            <ExperienceCard exp={props.exp}/>
        </div>
    );
}

const mapStateToProps = (state, ownProps) => ({
    isAuth: (state.user.data.id !== null),
    saved: state.user.savedExps.map(exp => exp._id).includes(ownProps.exp._id)
});
const mapDispatchToProps = (dispatch) => ({
    saveExp: (expId) => dispatch(saveExperience(expId)),
    unsaveExp: (expId) => dispatch(unsaveExperience(expId))
});

export default connect(mapStateToProps, mapDispatchToProps)(SearchExperienceCard);