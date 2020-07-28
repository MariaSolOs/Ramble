import React from 'react';

//MUI
import MUIAppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import useScrollTrigger from '@material-ui/core/useScrollTrigger';

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
        cursor: 'pointer',
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

const AppBar = (props) => {
    const classes = useStyles();
    const scrolledNav = useScrollTrigger();

    return (
        <MUIAppBar 
        position="fixed" 
        classes={{ root: `${classes.root} ${scrolledNav && 'scrolled'}` }}>
            <Toolbar>
                <div onClick={props.onRambleClick}>
                    <div className={classes.brand}>
                        <img src={Logo} alt="ramble logo"/>
                        <span>ramble</span>
                    </div>
                </div>
                {props.children}
            </Toolbar>
        </MUIAppBar>
    );
}

export default AppBar;
