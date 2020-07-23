import React, {useState, useEffect} from 'react';
import {Redirect} from 'react-router-dom';

//Styles
import {CSSTransition} from 'react-transition-group';
import {makeStyles} from '@material-ui/core/styles';
import styles from './IntroStyles';
const useStyles = makeStyles(styles);

const Intro = () => {
    const classes = useStyles();
    const [fade, setFade] = useState(false);

    //For fade out effect
    const [redirect, setRedirect] = useState(false);
    useEffect(() => {
        setFade(true);
        const fadeTimer = setTimeout(() => {
            setFade(false);
        }, 2000);
        const redirectTimer = setTimeout(() => {
            setRedirect(true);
        }, 3000);
        return () => {
            clearTimeout(fadeTimer);
            clearTimeout(redirectTimer);
        }
    }, []);

    return (
        <>
            {redirect? <Redirect to="/experience/new/location"/> : 
            <CSSTransition
            timeout={1000}
            in={fade}
            classNames={{
                exit: classes.fadeExit,
                exitActive: classes.fadeExitActive
            }}>
                <div className={classes.container}>
                    <h1>Just like you.</h1>
                    <h1>We're all about creating special moments.</h1>
                </div>
            </CSSTransition>}
        </>
    );
}

export default Intro;