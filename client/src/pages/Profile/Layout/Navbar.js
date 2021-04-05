import React from 'react';
import {NavLink} from 'react-router-dom';

import {FontAwesomeIcon} from '@fortawesome/react-fontawesome';
import {faIcons} from '@fortawesome/free-solid-svg-icons/faIcons';
import {faUser} from '@fortawesome/free-solid-svg-icons/faUser';
import {faCreditCard} from '@fortawesome/free-solid-svg-icons/faCreditCard';

import {makeStyles} from '@material-ui/core/styles';
import {navbarStyles} from './LayoutStyles';
const useStyles = makeStyles(navbarStyles);

const profilePages = [
    { name: { en: 'Experiences', fr: 'Expériences' },
      icon: faIcons,
      route: '/profile/exp/booked' },
    { name: { en:  'Personal information', fr: 'Informations personnelles' } , 
      icon: faUser,
      route: '/profile/info' },
    { name: { en: 'Payment information', fr: 'Informations de paiement' }, 
      icon: faCreditCard,
      route: '/profile/payInfo' },
];

const Navbar = ({ lang }) => {
    const classes = useStyles();
    return (
        <ul className={classes.root}>
            {profilePages.map(({name, icon, route}) => (
                <li key={name}>
                    <NavLink 
                    to={route} 
                    className={classes.navLink}
                    isActive={(match, location) => {
                        if(location.pathname.includes('/exp/') && 
                           name === 'Experiences') {
                            return true;
                        } else { return match; }
                    }}>
                        <FontAwesomeIcon icon={icon}/>
                        {name}
                    </NavLink>
                </li>
            ))}
        </ul>
    );
}

export default React.memo(Navbar);