import React, {useState, useContext} from 'react';
import creatorBios from './biosData';
import {CloudinaryContext} from '../../../../context/cloudinaryContext';

//Arrow icons
import KeyboardArrowLeftIcon from '@material-ui/icons/KeyboardArrowLeft';
import KeyboardArrowRightIcon from '@material-ui/icons/KeyboardArrowRight';

//Styles
import {TransitionGroup, CSSTransition} from 'react-transition-group';
import {makeStyles} from '@material-ui/core/styles';
import styles from './MeetCreatorsStyles';
const useStyles = makeStyles(styles);

const CreatorCard = (props) => {
    const classes = useStyles();
    const cloudinary = useContext(CloudinaryContext);

    const [currentSlide, setSlide] = useState(0);
    const creator = creatorBios[currentSlide];
    
    //For scrolling bios:
    const scrollLeft = () => { setSlide((currentSlide + 3) % 4); }
    const scrollRight = () => { setSlide((currentSlide + 1) % 4); }

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
                    <KeyboardArrowLeftIcon onClick={scrollLeft}/>
                    <img src={cloudinary.url(creator.img, 
                    {height: 500, width: 500, gravity: 'face', crop: 'thumb', secure: true})}
                    alt={`Creator Bio - ${creator.name}`}
                    className={classes.gridImg}/>
                    <KeyboardArrowRightIcon onClick={scrollRight}/>
                </div>
                <p className={classes.creatorName}>{creator.name}</p>
                <p className={classes.creatorCity}>{creator.city}</p>
                <p className={classes.creatorBio}>{creator.bio}</p>
            </div>
            </CSSTransition>
        </TransitionGroup>
    );
}

const MeetCreators = () => {
    const classes = useStyles();
    return (
        <div className={classes.slide}>
            <div>
                <h1 className={classes.title}>
                    Meet current <div className='underline'>Creators<span/></div>
                </h1>
                <CreatorCard />
            </div>
        </div>
    );
}


export default MeetCreators;