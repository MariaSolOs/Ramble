import React from 'react';
import {NavLink} from 'react-router-dom';

//Navbar icons
import {FontAwesomeIcon} from '@fortawesome/react-fontawesome';
import {faIcons} from '@fortawesome/free-solid-svg-icons/faIcons';
import {faUser} from '@fortawesome/free-solid-svg-icons/faUser';
import {faFolderOpen} from '@fortawesome/free-solid-svg-icons/faFolderOpen';
import {faReceipt} from '@fortawesome/free-solid-svg-icons/faReceipt';
import {faCreditCard} from '@fortawesome/free-solid-svg-icons/faCreditCard';

//Styles
import {makeStyles} from '@material-ui/core/styles'
const useStyles = makeStyles((theme) => ({
    root: {
        listStyle: 'none',
        padding: 0,
        margin: 0,
        fontFamily: 'Helvetica, sans-serif',
        fontWeight: 'bold',
        fontSize: '1rem',
        letterSpacing: '-0.05rem',
        whiteSpace: 'nowrap',

        '& li': { 
            margin: '1.7rem 0',
            height: 18,
            '& svg': { marginRight: 10 } 
        },
    },

    navLink: {
        textDecoration: 'none',
        color: '#ACACAC',
        '&.active, &:active, &:hover': {
            color: '#FFF',
            fontSize: '1.05rem',
            transition: 'all 200ms ease-in-out',
            textDecoration: 'none'
        }
    }
}));

const profilePages = [
    { name: 'Experiences',
      icon: faIcons,
      route: '/profile/exp/past' },
    { name: 'Personal information', 
      icon: faUser,
      route: '/profile/info' },
    { name: 'Provided documents', 
      icon: faFolderOpen,
      route: '/profile/docs' },
    { name: 'Receipts', 
      icon: faReceipt,
      route: '/profile/receipts' },
    { name: 'Payment information', 
      icon: faCreditCard,
      route: '/profile/payInfo' },
];

const Navbar = () => {
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