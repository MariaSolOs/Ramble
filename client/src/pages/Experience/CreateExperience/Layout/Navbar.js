import React, {useState} from 'react';
import {Link, useLocation} from 'react-router-dom';
import * as slides from '../pageNames';
import Collapse from '@material-ui/core/Collapse';

import {makeStyles} from '@material-ui/core/styles';
import {navbarStyles} from './LayoutStyles';
const useStyles = makeStyles(navbarStyles);

/**
 * Experience creation navbar
 * @param {Number} completed - All links <= completed will be enabled
 * @param {Number} currStage - Current creation step
 */
const Navbar = ({completed, currStage}) => {
    const classes = useStyles();
    
    //For collapsing/expanding stepnavs: 
    const [showSteps, setShowSteps] = useState('');
    const openSteps = (steps) => () => setShowSteps(steps);

    const currPage = useLocation().pathname;

    return (
        <ul className={classes.nav}>
            <li 
            onMouseEnter={openSteps('Location')}
            onMouseLeave={openSteps('')}
            className={`${(0 === currStage) && classes.current} 
                        ${classes.completed}`}>
                Location
                    <Collapse
                    component="ul"
                    className={classes.stepNav}
                    in={showSteps === 'Location' || (currPage === slides.LOCATION)}>
                        <li className={classes.completed}>
                            <Link to={slides.LOCATION}>
                                Meeting point
                            </Link>
                        </li>
                    </Collapse>
                </li>
            {[{ name: 'Title', link: slides.TITLE },
              { name: 'Category', link: slides.CATEGORIES }].map(({name, link}, i) => (
                <li key={name} className={`${(i + 1) < currStage && classes.completed}
                                           ${currPage === link && classes.current}`}>
                    {(i + 1) < completed? 
                        <Link to={link}>{name}</Link> : 
                        <span className={classes.inactive}>{name}</span>}
                </li>)
            )}
            <li 
            onMouseEnter={openSteps('Planning')}
            onMouseLeave={openSteps('')}
            className={`${3 > completed && classes.inactive} 
                        ${3 < currStage && classes.completed} 
                        ${3 === currStage && classes.current}`}>
                Planning
                <Collapse
                component="ul"
                className={classes.stepNav}
                in={showSteps === 'Planning' || (currPage === slides.PLANNING) ||
                    (currPage === slides.SETTING)}>
                    <li className={`${4 <= completed && classes.completed}`}>
                        {4 <= completed ?
                        <Link to={slides.PLANNING}>
                            Description
                        </Link> : 
                        <span className={classes.inactive}>Description</span>}
                    </li>
                    <li className={`${5 <= completed && classes.completed}`}>
                        {5 <= completed ?
                        <Link to={slides.SETTING}>
                            Setting
                        </Link> : 
                        <span className={classes.inactive}>Setting</span>}
                    </li>
                </Collapse>
            </li>
            <li 
            onMouseEnter={openSteps('Quick infos')}
            onMouseLeave={openSteps('')}
            className={`${5 > completed && classes.inactive} 
                        ${5 <= currStage && classes.completed} 
                        ${4 === currStage && classes.current}`}>
                Quick infos
                <Collapse
                component="ul"
                className={classes.stepNav}
                in={showSteps === 'Quick infos' || (currPage === slides.DURATION)
                    || (currPage === slides.LANGUAGE) || (currPage === slides.CAPACITY)
                    || (currPage === slides.AGE)}>
                    {[{ name: 'Duration', link: slides.DURATION},
                     { name: 'Language', link: slides.LANGUAGE},
                     { name: 'Capacity', link: slides.CAPACITY},
                     { name: 'Required age', link: slides.AGE}].map(({name, link}, i) => (
                        <li
                        key={name}
                        className={`${(i + 6) <= completed && classes.completed}`}>
                            {(i + 6) <= completed ?
                            <Link to={link}>{name}</Link> : 
                            <span className={classes.inactive}>{name}</span>}
                        </li>
                    ))}
                </Collapse>
            </li>
            {[{ name: 'Preview', link: slides.PREVIEW},
              { name: "What's included", link: slides.INCLUDED},
              { name: 'What to bring', link: slides.BRING},
              { name: 'Pricing', link: slides.PRICE}].map(({name, link}, i) => (
                <li key={name} className={`${(i + 5) <= currStage && classes.completed}  
                                           ${link === currPage && classes.current}`}>
                    {(i + 9) < completed? 
                    <Link to={link}>{name}</Link> : 
                    <span className={classes.inactive}>{name}</span>}
                </li>
            ))}
            <li 
            onMouseEnter={openSteps('Availabilities')}
            onMouseLeave={openSteps('')}
            className={`${14 > completed && classes.inactive}
                        ${9 < currStage && classes.completed}
                        ${9 === currStage && classes.current}`}>
                Availabilities
                <Collapse
                component="ul"
                className={classes.stepNav}
                in={showSteps === 'Availabilities' || (currPage === slides.SCHEDULE) ||
                   (currPage === slides.CAL_UPDATES)}>
                    <li className={`${completed - currStage >= 4 && classes.completed} 
                                    ${completed < 14 && classes.inactive}`}>
                        {14 <= completed ?
                        <Link to={slides.SCHEDULE}>
                            Schedule
                        </Link> : 'Schedule'}
                    </li>
                    <li className={`${completed - currStage >= 4 && classes.completed} 
                                    ${completed < 15 && classes.inactive}`}>
                        {15 <= completed ?
                        <Link to={slides.CAL_UPDATES}>
                            Start hosting
                        </Link> : 'Start hosting'}
                    </li>
                </Collapse>
            </li>
            <li className={`${10 <= currStage && classes.completed}
                            ${10 === currStage &&  classes.current}`}>
                {14 <= completed ?
                <Link to={slides.REVIEW}>
                    Review & Submit
                </Link> : 
                <span className={classes.inactive}>Review & Submit</span>}
            </li>
        </ul>
    );
}

export default React.memo(Navbar);