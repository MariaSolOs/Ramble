import React from 'react';
import { Link } from 'react-router-dom';
import MUIAppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import useScrollTrigger from '@material-ui/core/useScrollTrigger';

import Logo from '../../assets/images/appBar_logo.png';
import RambleTitle from '../../assets/images/appBar_ramble.png';

import { makeStyles } from '@material-ui/core/styles';
import styles from './AppBar.styles';
const useStyles = makeStyles(styles);

const AppBar: React.FC = ({ children }) => {
    const classes = useStyles();

    const isScrolled = useScrollTrigger({ disableHysteresis: true });
    
    return (
        <MUIAppBar 
        position="fixed" 
        classes={{ 
            root: `${classes.root} ${isScrolled && 'scrolled'}`
        }}>
            <Toolbar>
                <Link to="/" className={classes.link}>
                    <div className={classes.brand}>
                        <img src={Logo} alt="Ramble logo" className={classes.brandLogo} />
                        <img src={RambleTitle} alt="Ramble" className={classes.brandName} />
                    </div>
                </Link>
                { children }
            </Toolbar>
        </MUIAppBar>
    );
}

export default AppBar;