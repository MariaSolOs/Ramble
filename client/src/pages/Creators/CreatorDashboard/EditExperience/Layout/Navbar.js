import React, { useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import Collapse from '@material-ui/core/Collapse';
import PAGES from '../pages';

import { makeStyles } from '@material-ui/core/styles';
import { navbarStyles } from './LayoutStyles';
const useStyles = makeStyles(navbarStyles);

const Navbar = ({ currStage }) => {
    const classes = useStyles();
    
    const [showSteps, setShowSteps] = useState('');
    const openSteps = (steps) => () => setShowSteps(steps);

    const currPage = useLocation().pathname;

    return (
        <ul className={classes.nav}>
            <li 
            onMouseEnter={openSteps('Planning')}
            onMouseLeave={openSteps('')}
            className={`${(0 === currStage) && classes.current}`}>
                Planning
                <Collapse
                component="ul"
                className={classes.stepNav}
                in={showSteps === 'Planning' || (currPage === PAGES.planning) ||
                   (currPage === PAGES.setting)}>
                    <li className={`${currPage === PAGES.planning && 'current'}`}>
                        <Link to={PAGES.planning}>
                            Description
                        </Link>
                    </li>
                    <li className={`${currPage === PAGES.setting && 'current'}`}>
                        <Link to={PAGES.setting}>
                            Setting
                        </Link>
                    </li>
                </Collapse>
            </li>
            <li 
            onMouseEnter={openSteps('Quick infos')}
            onMouseLeave={openSteps('')}
            className={`${1 === currStage && classes.current}`}>
                Quick infos
                <Collapse
                component="ul"
                className={classes.stepNav}
                in={showSteps === 'Quick infos' || (currPage === PAGES.duration)
                    || (currPage === PAGES.language) || (currPage === PAGES.capacity)
                    || (currPage === PAGES.age)}>
                    {[{ name: 'Duration', link: PAGES.duration},
                     { name: 'Language', link: PAGES.language},
                     { name: 'Capacity', link: PAGES.capacity},
                     { name: 'Required age', link: PAGES.age}].map(({name, link}) => (
                        <li 
                        key={name}
                        className={`${currPage === link && 'current'}`}>
                            <Link to={link}>{name}</Link>
                        </li>
                    ))}
                </Collapse>
            </li>
            {[{ name: 'Preview', link: PAGES.preview},
              { name: "What's included", link: PAGES.included},
              { name: 'What to bring', link: PAGES.bring},
              { name: 'Pricing', link: PAGES.price}].map(({name, link}) => (
                <li 
                key={name} 
                className={`${link === currPage && classes.current}`}>
                    <Link to={link}>{name}</Link>
                </li>
            ))}
            <li className={`${6 === currStage && classes.current}`}>
                <Link to={PAGES.review}>
                    Review & Save Changes
                </Link>
            </li>
        </ul>
    );
}

export default React.memo(Navbar);