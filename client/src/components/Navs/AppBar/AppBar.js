import React from 'react';

import MUIAppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import useScrollTrigger from '@material-ui/core/useScrollTrigger';

import Brand from './ramble_name.png';
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
                        <img className="brand-logo" src={Logo} alt="ramble logo"/>
                        <img className="brand-name" src={Brand} alt="ramble brand"/>
                    </div>
                </div>
                {props.children}
            </Toolbar>
        </MUIAppBar>
    );
}

export default AppBar;
