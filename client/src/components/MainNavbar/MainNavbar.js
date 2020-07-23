import React, {useState, useEffect} from 'react';
import {Link} from 'react-router-dom';

//MUI
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';

import CollapsingNav from './CollapsingNav/CollapsingNav';
import Logo from './navLogo.png';

import {makeStyles} from "@material-ui/core/styles";
const useStyles = makeStyles((theme) => ({
    root: {
        backgroundColor: 'transparent',
        boxShadow: 'none',
        opacity: 1,
        transition: 'opacity 0.6s',
        padding: '0.7rem 1.1% 0 1.1%',

        '& a': { //Get rid of blue underline
            textDecoration: 'none',
            '&:hover': { textDecoration: 'none' }
        },

        '&.scrolled': {
            opacity: 0,
            pointerEvents: 'none',
            transition: 'opacity 600ms'
        }
    },

    //Ramble logo
    brand: {
        alignContent: 'bottom',
        '& img': {
            height: 48,
            width: 85,
            paddingBottom: 2
        },
        '& span': {
            fontFamily: 'Futura',
            fontSize: '1.813rem',
            letterSpacing: '-0.05rem',
            color: '#F6F6F6',
            verticalAlign: 'bottom',
        }
    },
}));

const MainNavbar = (props) => {
    const classes = useStyles();

    //For fading navbar effect:
    const [scrollClass, setScrollClass] = useState('');
    useEffect(() => {
        window.onscroll = () => {
            if(window.scrollY >= 100) { setScrollClass('scrolled'); } 
            else { setScrollClass('') }
        }
    }, []);

    return (
        <AppBar position="fixed" classes={{ root: `${classes.root} ${scrollClass}` }}>
            <Toolbar>
                <Link to="/">
                    <div className={classes.brand}>
                        <img src={Logo} alt="ramble logo"/>
                        <span>ramble</span>
                    </div>
                </Link>
                <CollapsingNav {...props}/>
            </Toolbar>
        </AppBar>
    );
}

export default MainNavbar;
