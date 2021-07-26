import { useState } from 'react';
import { v4 as uuid } from 'uuid';
import { useHistory } from 'react-router-dom';
import { useReactiveVar } from '@apollo/client';

import { useLanguageContext } from 'context/languageContext';
import { useUiContext } from 'context/uiContext';
import { userProfileVar } from 'store/user-cache';

import { TransitionGroup, CSSTransition } from 'react-transition-group';
import KeyboardArrowLeftIcon from '@material-ui/icons/KeyboardArrowLeft';
import KeyboardArrowRightIcon from '@material-ui/icons/KeyboardArrowRight';
import Button from 'components/GradientButton/GradientButton';
import Footer from 'components/Footer/Footer';
import lightbulbIcon from 'assets/images/actOut-lightbulb.svg';
import cloudIcon from 'assets/images/actOut-cloud.svg';
import walletIcon from 'assets/images/actOut-wallet.svg';
import creatorBios from 'data/creatorBios';

import { makeStyles } from '@material-ui/core/styles';
import styles from './BecomeACreator.styles';
const useStyles = makeStyles(styles);

const BecomeACreator = () => {
    const { appText, language } = useLanguageContext();
    const { BecomeACreator: text } = appText;
    const history = useHistory();
    const classes = useStyles();

    const { uiDispatch } = useUiContext();
    const { userId, creatorId } = useReactiveVar(userProfileVar);
    const isLoggedIn = Boolean(userId);
    const isCreator = Boolean(creatorId);

    const [creatorSlide, setCreatorSlide] = useState(0);
    const creator = creatorBios[creatorSlide];

    const handleGetStartedClick = () => {
        isLoggedIn ? 
            isCreator ? history.push('experience/new/setting') : history.push('/creator/join')
                : uiDispatch({ type: 'OPEN_SIGN_UP_DIALOG' });
    }

    return (
        <>
            <div className={classes.landingSlide}>
                <div>
                    <h1 className={classes.title}>{text.becomeTitle}</h1>
                    <h1 className={classes.title}>{text.shareTitle}</h1>
                    <h1 className={classes.title}>{text.getPaidTitle}</h1>
                    <Button 
                    className={classes.getStartedButton} 
                    variant="creator"
                    onClick={handleGetStartedClick}>
                        {text.getStarted}
                    </Button>
                </div>
                <img 
                className={classes.landingImg}
                alt="Cooking with Sidney"
                src={`${process.env.REACT_APP_CLOUDINARY_BASE_URI}c_fill,h_600,w_500/v1622837493/Ramble/Homepage/landing.jpg`} />
            </div>
            <div className={classes.creatorSlide}>
                <h1 className={classes.title}>
                    {text.currentCreators1}
                    <div className={classes.underlined}>
                        {text.currentCreators2}
                        <span className={classes.gradientLine} />
                    </div>
                </h1>
                <TransitionGroup>
                    <CSSTransition
                    unmountOnExit
                    timeout={400}
                    key={uuid()}
                    classNames={{
                        enter: classes.zoomEnter,
                        enterActive: classes.zoomEnterActive,
                        exitActive: classes.zoomExit
                    }}>
                        <div className={classes.creatorCard}>
                            <div className={classes.creatorImgContainer}>
                                <KeyboardArrowLeftIcon 
                                className={classes.bioArrow}
                                onClick={() => {
                                    setCreatorSlide((creatorSlide + 2) % creatorBios.length)
                                }} />
                                <img 
                                src={creator.imageUrl}
                                alt={creator.name}
                                className={classes.creatorImg} />
                                <KeyboardArrowRightIcon
                                className={classes.bioArrow}
                                onClick={() => {
                                    setCreatorSlide((creatorSlide + 1) % creatorBios.length)
                                }} />
                            </div>
                            <h5 className={classes.creatorName}>{creator.name}</h5>
                            <p className={classes.creatorBio}>{creator.bio[language]}</p>
                        </div>
                    </CSSTransition>
                </TransitionGroup>
            </div>
            <div className={classes.actSlide}>
                <h1 className={classes.title}>
                    {text.actTitle1}
                    <div className={classes.underlined}>
                        {text.actTitle2}
                        <span className={classes.gradientLine} />
                    </div>
                </h1>
                <div className={classes.actGraphContainer}>
                    <div className={classes.actGraph}>
                        <div className={classes.actGraphItem}>
                            <div className={classes.actGraphCircle}>
                                <img 
                                className={classes.actGraphIcon} 
                                src={lightbulbIcon} 
                                alt="Share your passion" />
                            </div>
                            <p className={classes.actGraphText}>
                                {text.lightbulbText}
                            </p>
                        </div>
                        <div className={classes.actGraphItem}>
                            <div className={classes.actGraphCircle}>
                                <img
                                className={classes.actGraphIcon}
                                src={cloudIcon}
                                alt="Bring people into your world" />
                            </div>
                            <p className={classes.actGraphText}>
                                {text.cloudText}
                            </p>
                        </div>
                        <div className={classes.actGraphItem}>
                            <div className={classes.actGraphCircle}>
                                <img
                                className={classes.actGraphIcon}
                                src={walletIcon}
                                alt="Make money" />
                            </div>
                            <p className={classes.actGraphText}>
                                {text.walletText}
                            </p>
                        </div>
                    </div>
                    <div className={classes.gradientLine} />
                </div>
            </div>
            <Footer />
        </>
    );
}

export default BecomeACreator;