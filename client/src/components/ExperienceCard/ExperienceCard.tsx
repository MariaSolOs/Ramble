import React from 'react';

import { useLanguageContext } from '../../context/languageContext';
import type { ExperienceCard as CardType } from '../../models/experience';

import onlineIcon from '../../assets/images/online-experience-icon.svg';
import StarRateIcon from '@material-ui/icons/StarRate';

import { makeStyles } from '@material-ui/core/styles';
import styles from './ExperienceCard.styles';
const useStyles = makeStyles(styles);

type Props = {
    experience: CardType;
    containerClass?: string;
}
export type StyleProps = {
    hasRatingInfo: boolean;
}

// TODO: Add heart to save as favourite
const ExperienceCard = (props: Props) => {
    const { ExperienceCard: text } = useLanguageContext().appText;

    const classes = useStyles({
        hasRatingInfo: Boolean(props.experience.rating)
    });

    return (
        <div className={`${classes.root} ${props.containerClass}`}>
            {props.experience.isZoomExperience && 
                <div className={classes.online}>
                    <img src={onlineIcon} alt="Online experience" className={classes.onlineImg} />
                    {text.online}
                </div>}
            <img 
            src={props.experience.image} 
            alt={props.experience.title}
            className={classes.image} />
            <div className={classes.body}>
                <p className={classes.title}>{props.experience.title}</p>
                <p className={classes.location}>{props.experience.location}</p>
                {props.experience.rating &&
                    <p className={classes.rating}>
                        {props.experience.rating.toFixed(2)} 
                        <StarRateIcon className={classes.starIcon} />
                    </p>}
                <p className={classes.priceInfo}>
                    <span className={classes.price}>${props.experience.price} </span>
                    {(props.experience.isZoomExperience ? 
                        text.perConnection : text.perPerson).toUpperCase()}
                </p>
            </div>
        </div>
    );
}

export default React.memo(ExperienceCard, (prevProps, nextProps) => 
    prevProps.experience._id === nextProps.experience._id
);