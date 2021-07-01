import React, { useState } from 'react';
import { v4 as uuid } from 'uuid';

import { useLanguageContext } from 'context/languageContext';
import type { Experience as ExperienceType } from 'models/experience';
import type { Creator } from 'models/creator';

import Fab from '@material-ui/core/Fab';
import Avatar from '@material-ui/core/Avatar';
import Collapse from '@material-ui/core/Collapse';
import { StaticMap, Marker } from 'react-map-gl';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faShareSquare } from '@fortawesome/free-solid-svg-icons/faShareSquare';
import { faClock } from '@fortawesome/free-solid-svg-icons/faClock';
import { faUsers } from '@fortawesome/free-solid-svg-icons/faUsers';
import { faComments } from '@fortawesome/free-solid-svg-icons/faComments';
import { faUserPlus } from '@fortawesome/free-solid-svg-icons/faUserPlus';
import { faHeart } from '@fortawesome/free-solid-svg-icons/faHeart';
import Carousel from 'react-image-gallery';
import CategoryBox from 'components/CategoryBox/CategoryBox';
import onlineIcon from 'assets/images/online-experience-icon.svg';

import 'react-image-gallery/styles/css/image-gallery.css';
import { makeStyles } from '@material-ui/core/styles';
import { desktopStyles, mobileStyles } from './Experience.styles';

type Props = {
    experience: ExperienceType;
    creator: Creator;
    isExperienceSaved?: boolean;
    onHeartClick?: React.MouseEventHandler;
    onShareClick?: React.MouseEventHandler;
    useMobileDisplay?: boolean;
    containerClass?: string;
}

export type StyleProps = {
    isExpSaved: boolean;
    numQuickInfoColumns: number;
}

// For formatting the duration label
const getFormattedDuration = (duration: number) => {
    const minutes = duration - Math.floor(duration);
    const hours = Math.floor(duration);
    return (`${hours}h${minutes === 0? '' : 30}`);
}

const Experience = (props: Props) => {
    const { Experience: text } = useLanguageContext().appText;

    const { experience, creator } = props;
    const ageRestricted = Boolean(experience.ageRestriction);

    const useStyles = makeStyles(props.useMobileDisplay ? mobileStyles : desktopStyles);
    const classes = useStyles({ 
        isExpSaved: Boolean(props.isExperienceSaved),
        numQuickInfoColumns: ageRestricted ? 4 : 3
    });

    const [isBioExpanded, setIsBioExpanded] = useState(false);

    return (
        <div className={`${props.containerClass}`}>
            <Carousel
            additionalClass={classes.carousel}
            items={experience.galleryImages}
            showFullscreenButton={false}
            thumbnailPosition="left"
            showPlayButton={false}
            showNav={false}
            showBullets />
            <div className={classes.body}>
                <div className={classes.mainInfos}>
                    <div>
                        {experience.isZoomExperience &&
                            <div className={classes.online}>
                                <img 
                                src={onlineIcon} 
                                alt="Online experience" 
                                className={classes.onlineIcon} />
                                {text.online}
                            </div>}
                        <h1 className={classes.title}>
                            {experience.title}
                        </h1>
                        <h3 className={classes.location}>
                            {experience.location}
                        </h3>
                    </div>
                    <div className={classes.shareSaveContainer}>
                        {props.onShareClick && 
                            <Fab
                            size="small" 
                            disableRipple
                            className={classes.shareSaveButton}
                            onClick={props.onShareClick}>
                                <FontAwesomeIcon icon={faShareSquare} />
                            </Fab>}
                        {props.onHeartClick &&
                            <Fab 
                            size="small"
                            disableRipple
                            className={classes.shareSaveButton}
                            onClick={props.onHeartClick}>
                                <FontAwesomeIcon icon={faHeart} />
                            </Fab>}
                    </div>
                </div>
                <div className={classes.categories}>
                    {experience.categories!.map(categ =>
                        <CategoryBox 
                        key={uuid()}
                        category={categ}
                        iconLocation="left"
                        boxClass={classes.category} />
                    )}
                </div>
                <div className={classes.quickInfos}>
                    <div className={classes.quickInfoColumn}>
                        <div className={classes.quickInfoIcon}>
                            <FontAwesomeIcon icon={faClock} />
                        </div>
                        <span className={classes.quickInfoLabel}>
                            {text.duration}
                        </span>
                        <span className={classes.quickInfoContent}>
                            {getFormattedDuration(experience.duration)}
                        </span>
                    </div>
                    <div className={classes.quickInfoColumn}>
                        <div className={classes.quickInfoIcon}>
                            <FontAwesomeIcon icon={faUsers} />
                        </div>
                        <span className={classes.quickInfoLabel}>
                            {text.upTo}
                        </span>
                        <span className={classes.quickInfoContent}>
                            {`${experience.capacity} ${
                                experience.capacity > 1 ? text.people : text.person
                            }`}
                        </span>
                    </div>
                    <div className={classes.quickInfoColumn}>
                        <div className={classes.quickInfoIcon}>
                            <FontAwesomeIcon icon={faComments} />
                        </div>
                        <span className={classes.quickInfoLabel}>
                            {experience.languages.length > 1 ? text.languages : text.language} 
                        </span>
                        <span className={classes.quickInfoContent}>
                            {experience.languages.join(', ')}
                        </span>
                    </div>
                    {ageRestricted &&
                        <div className={classes.quickInfoColumn}>
                            <div className={classes.quickInfoIcon}>
                                <FontAwesomeIcon icon={faUserPlus} />
                            </div>
                            <span className={classes.quickInfoLabel}>
                                {text.ageRestriction} 
                            </span>
                            <span className={classes.quickInfoContent}>
                                {`${experience.ageRestriction} +`}
                            </span>
                        </div>}
                </div>
                <h3 className={classes.sectionLabel}>{text.hostedBy}</h3>
                <div className={classes.host}>
                    <Avatar src={creator.photo} alt="Experience creator" />
                    <span className={classes.creatorName}>{creator.name}</span>
                    <button 
                    className={classes.bioToggler} 
                    onClick={() => setIsBioExpanded(!isBioExpanded)}>
                        {text.aboutCreator}
                    </button>
                </div>
                <Collapse className={classes.bodyText} in={isBioExpanded} timeout={300}>
                    {creator.bio}
                </Collapse>
                <h3 className={classes.sectionLabel}>{text.planning}</h3>
                <p className={classes.bodyText}>{experience.description}</p>
                {experience.includedItems.length > 0 && 
                    <>  
                        <h3 className={classes.sectionLabel}>{text.included}</h3>
                        <ul className={classes.itemList}>
                            {experience.includedItems.map(item => 
                                <li key={uuid()}>{item}</li>
                            )}
                        </ul>
                    </>}
                {experience.toBringItems.length > 0 && 
                    <>  
                        <h3 className={classes.sectionLabel}>{text.toBring}</h3>
                        <ul className={classes.itemList}>
                            {experience.toBringItems.map(item => 
                                <li key={uuid()}>{item}</li>
                            )}
                        </ul>
                    </>}
                {!experience.isZoomExperience &&
                    <>
                        <h3 className={classes.sectionLabel}>{text.location}</h3>
                        <div className={classes.map}>
                            <StaticMap
                            mapboxApiAccessToken={process.env.REACT_APP_MAPBOX_ACCESS_TOKEN}
                            mapStyle="mapbox://styles/mapbox/dark-v9"
                            width="100%"
                            height={300}
                            zoom={11}
                            latitude={experience.latitude}
                            longitude={experience.longitude}>
                                <Marker 
                                latitude={experience.latitude!}
                                longitude={experience.longitude!} 
                                className={classes.mapMarker}>
                                    <div className={classes.mapMarkerDot} />
                                </Marker>
                            </StaticMap>
                        </div>
                    </>}
            </div>
        </div>
    );
}

export default Experience;