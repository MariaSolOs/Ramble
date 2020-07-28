import React from 'react';

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

    return (
        <div className={classes.card} onClick={props.onViewExperience}>
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
                    className={classes.saveButton} onClick={props.onHeartClick}>
                        <FontAwesomeIcon icon={faHeart}/>
                    </Fab>
                </Tooltip>}
            <ExperienceCard exp={props.exp}/>
        </div>
    );
}

export default React.memo(SearchExperienceCard, (prevProps, nextProps) => {
    return prevProps.saved === nextProps.saved
});