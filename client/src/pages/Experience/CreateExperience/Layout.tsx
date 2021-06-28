import React, { useState, useEffect } from 'react';
import { v4 as uuid } from 'uuid';
import useMediaQuery from '@material-ui/core/useMediaQuery';
import Div100vh from 'react-div-100vh';

import { useLanguageContext } from 'context/languageContext';
import { CREATION_STEPS } from 'models/experience';
import type { CreationStep } from 'models/experience';

import LinearProgress from '@material-ui/core/LinearProgress';
import Drawer from '@material-ui/core/Drawer';
import CheckIcon from '@material-ui/icons/Check';
import GradientButton from 'components/GradientButton/GradientButton';
import MenuIcon from 'assets/images/menu-icon.svg';

import { makeStyles, useTheme } from '@material-ui/core/styles';
import styles from './Layout.styles';
const useStyles = makeStyles(styles);

type Props = {
    stepsCompleted: number;
    currentStep: CreationStep;
    currentStepIdx: number;
    canContinue: boolean;
    onNext: () => void;
    onBack: () => void;
    onNavigate: (stepIdx: number) => void;
}

export type StyleProps = {
    progressValue: number;
}

const Layout: React.FC<Props> = (props) => {
    const { CreateExperience_Layout: text } = useLanguageContext().appText;

    // The linear progress bar takes a value between 0 and 100
    const progressValue = (props.stepsCompleted / CREATION_STEPS.length) * 100;
    const classes = useStyles({ progressValue });

    // The navbar is in a drawer in mobile
    const theme = useTheme();
    const isMobile = useMediaQuery(theme.breakpoints.down('sm'));

    const [openDrawer, setOpenDrawer] = useState(false);
    const expandDrawer = () => { setOpenDrawer(true); }
    const collapseDrawer = () => { setOpenDrawer(false); }

    // For closing the navigation drawer when resizing
    useEffect(() => {
        if (!isMobile) {
            collapseDrawer();
        }
    }, [isMobile]);

    const navbar = (
        <ul className={classes.navbar}>
            {CREATION_STEPS.map((step, idx) => 
                <li 
                key={uuid()} 
                onClick={() => {
                    if (idx <= props.stepsCompleted) {
                        props.onNavigate(idx);
                        collapseDrawer();
                    }
                }}
                className={`
                    ${classes.navLink} 
                    ${idx > props.stepsCompleted && classes.inactiveNavLink}
                `}>
                    {idx < props.stepsCompleted &&
                        <div className={classes.checkIconContainer}>
                            <CheckIcon className={classes.checkIcon} />
                        </div>}
                    {text[step]}
                </li>
            )}
        </ul>
    );

    return (
        <Div100vh>
            <div className={classes.root}>
                <div className={classes.pageContainer}>
                    {isMobile ? 
                        <Drawer 
                        elevation={0}
                        className={classes.navbarDrawer} 
                        open={openDrawer} 
                        onClose={collapseDrawer}>
                            {navbar}
                        </Drawer> : 
                        <ul className={classes.navbar}>{navbar}</ul>}
                    <div className={classes.pageContent}>{props.children}</div>
                </div>
                <div className={classes.footer}>
                    <LinearProgress 
                    value={progressValue} 
                    variant="determinate" 
                    className={classes.progress} />
                    <div className={classes.footerButtons}>
                        {isMobile && 
                            <div 
                            className={classes.navbarButtonContainer} 
                            onClick={expandDrawer}>
                                <img 
                                src={MenuIcon} 
                                alt="Drawer toggler" 
                                className={classes.navbarButton} />
                            </div>}
                        {props.currentStepIdx > 0 &&
                            <button 
                            className={`${classes.footerButton} ${classes.backButton}`}
                            onClick={props.onBack}>
                                {text.back}
                            </button>}
                        <GradientButton 
                        disabled={!props.canContinue}
                        className={`${classes.footerButton} ${classes.nextButton}`} 
                        variant="experience"
                        onClick={props.onNext}>
                            {props.currentStep === 'review' ? text.submit : text.next}
                        </GradientButton>
                    </div>
                </div>
            </div>
        </Div100vh>
    );
}

export default Layout;