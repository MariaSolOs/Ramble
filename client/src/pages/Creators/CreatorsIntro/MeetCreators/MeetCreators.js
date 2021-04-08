import React, { useState } from 'react';
import creatorBios from './biosData';
import { MeetCreatorsText as text } from '../CreatorsIntroText';

// import KeyboardArrowLeftIcon from '@material-ui/icons/KeyboardArrowLeft';
// import KeyboardArrowRightIcon from '@material-ui/icons/KeyboardArrowRight';

import {TransitionGroup, CSSTransition} from 'react-transition-group';
import {makeStyles} from '@material-ui/core/styles';
import styles from './MeetCreatorsStyles';
const useStyles = makeStyles(styles);

const CreatorCard = (props) => {
    const classes = useStyles();

    const currentSlide = useState(0)[0];
    const creator = creatorBios[currentSlide];
    
    // TODO: Resume scrolling when we get more creators
    //For scrolling bios:
    // const scrollLeft = () => { setSlide((currentSlide + 3) % creatorBios.length); }
    // const scrollRight = () => { setSlide((currentSlide + 1) % creatorBios.length); }

    return (
        <TransitionGroup>
            <CSSTransition 
            classNames={{
                enter: classes.zoomEnter,
                enterActive: classes.zoomEnterActive,
                exit: classes.zoomExit
            }}
            unmountOnExit 
            timeout={400} 
            key={currentSlide}>
            <div className={classes.bioCard}>
                <div className={classes.imageContainer}>
                    {/* <KeyboardArrowLeftIcon onClick={scrollLeft}/> */}
                    <img 
                    src={creator.img}
                    alt={`Creator Bio - ${creator.name}`}
                    className={classes.gridImg}/>
                    {/* <KeyboardArrowRightIcon onClick={scrollRight}/> */}
                </div>
                <p className={classes.creatorName}>{creator.name}</p>
                <p className={classes.creatorCity}>{creator.city}</p>
                <p className={classes.creatorBio}>{creator.bio}</p>
            </div>
            </CSSTransition>
        </TransitionGroup>
    );
}

const MeetCreators = ({ lang }) => {
    const classes = useStyles();
    return (
        <div className={classes.slide}>
            <h1 className={classes.title}>
                {text.title[lang][0]} <div className='underline'>{text.title[lang][1]}<span/></div>
            </h1>
            <CreatorCard/>
        </div>
    );
}


export default MeetCreators;
