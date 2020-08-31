import React from 'react';

import MUIAppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import useScrollTrigger from '@material-ui/core/useScrollTrigger';

import Logo from './navLogo.png';

import {makeStyles} from '@material-ui/core/styles';
import styles from './AppBarStyles';
const useStyles = makeStyles(styles);

const AppBar = (props) => {
    const classes = useStyles();
    const scrolledNav = useScrollTrigger({disableHysteresis: true});

    return (
        <MUIAppBar 
        position="fixed" 
        classes={{root:`${classes.root} 
                        ${scrolledNav && 'scrolled'}` }}>
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
