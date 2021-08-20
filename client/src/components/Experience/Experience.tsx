import { useState } from 'react';
import { v4 as uuid } from 'uuid';
import type { ReactImageGalleryItem } from 'react-image-gallery';
import type { GetExperienceQuery } from 'graphql-api';

import Avatar from '@material-ui/core/Avatar';
import Collapse from '@material-ui/core/Collapse';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faClock } from '@fortawesome/free-solid-svg-icons/faClock';
import { faUsers } from '@fortawesome/free-solid-svg-icons/faUsers';
import { faComments } from '@fortawesome/free-solid-svg-icons/faComments';
import { faUserPlus } from '@fortawesome/free-solid-svg-icons/faUserPlus';
import Carousel from 'react-image-gallery';

import 'react-image-gallery/styles/css/image-gallery.css';
import { makeStyles } from '@material-ui/core/styles';
import styles from './Experience.styles';
const useStyles = makeStyles(styles);

type ExperienceProps = {
    experience: GetExperienceQuery['experience'];
}

export type ExperienceStyleProps = {
    numQuickInfoColumns: number;
}

// For formatting the duration label
const getFormattedDuration = (duration: number) => {
    const minutes = duration - Math.floor(duration);
    const hours = Math.floor(duration);
    return (`${hours}h${minutes === 0? '' : 30}`);
}

const Experience = (props: ExperienceProps) => {
    const { experience } = props;
    const ageRestricted = Boolean(experience.ageRestriction);
    const classes = useStyles({ numQuickInfoColumns: ageRestricted ? 4 : 3 });
    
    const [isBioExpanded, setIsBioExpanded] = useState(false);

    const galleryImages: ReactImageGalleryItem[] = experience.images.map(img => ({
        original: img,
        thumbnail: img
    }));

    return (
        <div>
        {/* <div className={`${props.containerClass}`}> */}
            <Carousel
            additionalClass={classes.carousel}
            items={galleryImages}
            showFullscreenButton={false}
            thumbnailPosition="left"
            showPlayButton={false}
            showNav={false}
            showBullets />
            <div className={classes.body}>
                <div className={classes.mainInfos}>
                    <div>
                        {experience.isOnlineExperience &&
                            <div className={classes.online}>
                                Online
                            </div>}
                        <h1 className={classes.title}>
                            {experience.title}
                        </h1>
                        <h3 className={classes.location}>
                            {experience.location}
                        </h3>
                    </div>
                </div>
                <div className={classes.categories}>
                    {experience.categories!.map(categ =>
                        <p key={uuid()}>{categ}</p>
                    )}
                </div>
                <div className={classes.quickInfos}>
                    <div className={classes.quickInfoColumn}>
                        <div className={classes.quickInfoIcon}>
                            <FontAwesomeIcon icon={faClock} />
                        </div>
                        <span className={classes.quickInfoLabel}>
                            Duration
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
                            Up to
                        </span>
                        <span className={classes.quickInfoContent}>
                            {`${experience.capacity} ${
                                experience.capacity > 1 ? 'People' : 'Person'
                            }`}
                        </span>
                    </div>
                    <div className={classes.quickInfoColumn}>
                        <div className={classes.quickInfoIcon}>
                            <FontAwesomeIcon icon={faComments} />
                        </div>
                        <span className={classes.quickInfoLabel}>
                            {experience.languages.length > 1 ? 'Languages' : 'Languague'} 
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
                                Age restriction
                            </span>
                            <span className={classes.quickInfoContent}>
                                {`${experience.ageRestriction} +`}
                            </span>
                        </div>}
                </div>
                <h3 className={classes.sectionLabel}>Hosted by</h3>
                <div className={classes.host}>
                    <Avatar src={experience.creator.user.photo || ''} alt="Experience creator" />
                    <span className={classes.creatorName}>
                        {experience.creator.user.firstName}
                    </span>
                    <button 
                    className={classes.bioToggler} 
                    onClick={() => setIsBioExpanded(!isBioExpanded)}>
                        About creator
                    </button>
                </div>
                <Collapse className={classes.bodyText} in={isBioExpanded} timeout={300}>
                    {experience.creator.bio}
                </Collapse>
                <h3 className={classes.sectionLabel}>Planning</h3>
                <p className={classes.bodyText}>{experience.description}</p>
                {experience.includedItems.length > 0 && 
                    <>  
                        <h3 className={classes.sectionLabel}>What's included</h3>
                        <ul className={classes.itemList}>
                            {experience.includedItems.map(item => 
                                <li key={uuid()}>{item}</li>
                            )}
                        </ul>
                    </>}
                {experience.toBringItems.length > 0 && 
                    <>  
                        <h3 className={classes.sectionLabel}>What to bring</h3>
                        <ul className={classes.itemList}>
                            {experience.toBringItems.map(item => 
                                <li key={uuid()}>{item}</li>
                            )}
                        </ul>
                    </>}
                {!experience.isOnlineExperience &&
                    <>
                        <h3 className={classes.sectionLabel}>Location</h3>
                        <p className={classes.bodyText}>
                            To save Mapbox API calls, the map is not shown in 
                            the admin mode. 
                        </p>
                    </>}
            </div>
        </div>
    );
}

export default Experience;