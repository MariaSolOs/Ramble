import React from 'react';
import { Link } from 'react-router-dom';
import MUIAppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import useScrollTrigger from '@material-ui/core/useScrollTrigger';

import logo from 'assets/images/ramble-brand.png';

import { makeStyles } from '@material-ui/core/styles';
import styles from './AppBar.styles';
const useStyles = makeStyles(styles);

const AppBar: React.FC = ({ children }) => {
    const classes = useStyles();

    // Fade out navbar when scrolling
    const isScrolled = useScrollTrigger({ 
        disableHysteresis: true,
        threshold: 50
    });
    
    return (
        <MUIAppBar 
        position="fixed" 
        classes={{ 
            root: `${classes.root} ${isScrolled && classes.scrolled}`
        }}>
            <Toolbar>
                <Link to="/" className={classes.link}>
                    <img src={logo} alt="Ramble logo" className={classes.brand} />
                </Link>
                { children }
            </Toolbar>
        </MUIAppBar>
    );
}

export default AppBar;