import React from 'react';

//Components
import Fab from '@material-ui/core/Fab';
import Tooltip from '@material-ui/core/Tooltip';
import {FontAwesomeIcon} from '@fortawesome/react-fontawesome';
import {faHeart} from '@fortawesome/free-solid-svg-icons/faHeart';
import StarRateIcon from '@material-ui/icons/StarRate';

//Styles
import {makeStyles} from '@material-ui/core/styles';
import styles from './ExperienceCardStyles';
const useStyles = makeStyles(styles);

const ExperienceCard = (props) => {
    const classes = useStyles({saved: props.saved});
    
    return (
        <div 
        className={`${classes.root} ${props.className}`} 
        onClick={props.onCardClick}>
            {props.showHeart && 
                <Tooltip 
                disableFocusListener
                placement="top-end"
                title={props.saved? 'Saved' : 'Save experience'}
                classes={{
                    tooltip: classes.tooltip,
                    tooltipPlacementTop: classes.tooltipTop
                }}>
                    <Fab aria-label="save" disableRipple 
                    className={classes.saveButton} onClick={props.onHeartClick}>
                        <FontAwesomeIcon icon={faHeart}/>
                    </Fab>
                </Tooltip>}
            <div className={classes.card}>
                <img src={props.exp.images[0]}
                alt={`Experience - ${props.exp.title}`}/>
                <div className={classes.body}>
                    <p className={classes.title}>{props.exp.title}</p>
                    <p className={classes.location}>{props.exp.location.displayLocation}</p>
                    {props.exp.rating &&
                    <p className={classes.rating}>
                        {props.exp.rating.value.toFixed(2)}<StarRateIcon/>
                    </p>}
                    <p className={classes.price}>
                        <span>${props.exp.price.perPerson}</span> PER PERSON
                    </p>
                </div>
            </div>
        </div>
    );
}

export default React.memo(ExperienceCard, (prevProps, nextProps) => {
    return prevProps.exp._id === nextProps.exp._id && 
           prevProps.saved === nextProps.saved
});