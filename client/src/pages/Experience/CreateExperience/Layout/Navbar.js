import React, { useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import * as slides from '../pageNames';
import Collapse from '@material-ui/core/Collapse';
import { NavbarText as text } from './LayoutText';

import { makeStyles } from '@material-ui/core/styles';
import { navbarStyles } from './LayoutStyles';
const useStyles = makeStyles(navbarStyles);

const Navbar = ({ completed, currStage, isZoomExp, lang }) => {
    const classes = useStyles();
    const currPage = useLocation().pathname;

    // For collapsing/expanding stepnavs: 
    const [showSteps, setShowSteps] = useState('');
    const openSteps = (steps) => () => setShowSteps(steps);

    return (
        <ul className={classes.nav}>
            <li 
            onMouseEnter={openSteps('Location')}
            onMouseLeave={openSteps('')}
            className={`${(0 === currStage) && classes.current} 
                        ${classes.completed}`}>
                {text.location[lang]}
                    <Collapse
                    component="ul"
                    className={classes.stepNav}
                    in={showSteps === 'Location' || (currPage === slides.LOCATION)}>
                        <li className={classes.completed}>
                            <Link to={slides.LOCATION}>
                                {text.meetPoint[lang]}
                            </Link>
                        </li>
                    </Collapse>
                </li>
            {[{ name: 'title', link: slides.TITLE },
              { name: 'categ', link: slides.CATEGORIES }].map(({name, link}, i) => (
                <li key={name} className={`${(i + 1) < currStage && classes.completed}
                                           ${currPage === link && classes.current}`}>
                    {(i + 1) < completed? 
                        <Link to={link}>{text[name][lang]}</Link> : 
                        <span className={classes.inactive}>{text[name][lang]}</span>}
                </li>)
            )}
            <li 
            onMouseEnter={openSteps('Planning')}
            onMouseLeave={openSteps('')}
            className={`${3 > completed && classes.inactive} 
                        ${3 < currStage && classes.completed} 
                        ${3 === currStage && classes.current}`}>
                {text.planning[lang]}
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
                    {!isZoomExp &&
                        <li className={`${5 <= completed && classes.completed}`}>
                            {5 <= completed ?
                            <Link to={slides.SETTING}>
                                {text.setting[lang]}
                            </Link> : 
                            <span className={classes.inactive}>
                                {text.setting[lang]}
                            </span>}
                        </li>}
                </Collapse>
            </li>
            <li 
            onMouseEnter={openSteps('Quick infos')}
            onMouseLeave={openSteps('')}
            className={`${5 > completed && classes.inactive} 
                        ${5 <= currStage && classes.completed} 
                        ${4 === currStage && classes.current}`}>
                {text.infos[lang]}
                <Collapse
                component="ul"
                className={classes.stepNav}
                in={showSteps === 'Quick infos' || (currPage === slides.DURATION)
                    || (currPage === slides.LANGUAGE) || (currPage === slides.CAPACITY)
                    || (currPage === slides.AGE)}>
                    {[{ name: 'duration', link: slides.DURATION},
                     { name: 'lang', link: slides.LANGUAGE},
                     { name: 'capacity', link: slides.CAPACITY},
                     { name: 'reqAge', link: slides.AGE}].map(({name, link}, i) => (
                        <li
                        key={name}
                        className={`${(isZoomExp? i + 5:i + 6) <= completed && 
                                   classes.completed}`}>
                            {(isZoomExp? i + 5:i + 6) <= completed ?
                            <Link to={link}>{text[name][lang]}</Link> : 
                            <span className={classes.inactive}>{text[name][lang]}</span>}
                        </li>
                    ))}
                </Collapse>
            </li>
            {[{ name: 'prev', link: slides.PREVIEW},
              { name: 'included', link: slides.INCLUDED},
              { name: 'bring', link: slides.BRING},
              { name: 'price', link: slides.PRICE}].map(({name, link}, i) => (
                <li key={name} className={`${i + 5 <= currStage 
                                           && classes.completed}  
                                           ${link === currPage && classes.current}`}>
                    {(isZoomExp? i + 8:i + 9) < completed? 
                    <Link to={link}>{text[name][lang]}</Link> : 
                    <span className={classes.inactive}>{text[name][lang]}</span>}
                </li>
            ))}
            <li 
            onMouseEnter={openSteps('Availabilities')}
            onMouseLeave={openSteps('')}
            className={`${(isZoomExp? 13:14) > completed && classes.inactive}
                        ${9 <= currStage && classes.completed}
                        ${9 === currStage && classes.current}`}>
                {text.avail[lang]}
                <Collapse
                component="ul"
                className={classes.stepNav}
                in={showSteps === 'Availabilities' || (currPage === slides.SCHEDULE) ||
                   (currPage === slides.CAL_UPDATES)}>
                    <li className={`${completed - currStage >= 4 && classes.completed} 
                                    ${completed < (isZoomExp? 13:14) && classes.inactive}`}>
                        {(isZoomExp? 13:14) <= completed ?
                        <Link to={slides.SCHEDULE}>
                            {text.schedule[lang]}
                        </Link> : text.schedule[lang]}
                    </li>
                    <li className={`${completed - currStage >= 4 && classes.completed} 
                                    ${completed < (isZoomExp? 14:15) && classes.inactive}`}>
                        {(isZoomExp? 14:15) <= completed ?
                        <Link to={slides.CAL_UPDATES}>
                            {text.startHost[lang]}
                        </Link> : text.startHost[lang]}
                    </li>
                </Collapse>
            </li>
            <li className={`${10 <= currStage && classes.completed}
                            ${10 === currStage &&  classes.current}`}>
                {(isZoomExp? 13:14) <= completed ?
                <Link to={slides.REVIEW}>
                    {text.review[lang]}
                </Link> : 
                <span className={classes.inactive}>{text.review[lang]}</span>}
            </li>
        </ul>
    );
}

export default React.memo(Navbar);