import React, { useRef } from 'react';
import { useSelector } from 'react-redux';

import Landing from './Landing/Landing';
import Partake from './Gallery/Partake';
import Adventure from './Gallery/Adventure';

import { makeStyles } from '@material-ui/core/styles';
import styles from './HomeStyles';
const useStyles = makeStyles(styles);

const Home = () => {
    const classes = useStyles();
    const lang = useSelector(state => state.ui.language);

    // Focus searchbar when clicking on the gallery images
    const searchRef = useRef(null);
    const setSearchFocus = () => { 
        searchRef.current && searchRef.current.focus(); 
    }

    return (
        <div className={classes.root}>
            <Landing searchRef={searchRef}/>
            <Partake setSearchFocus={setSearchFocus} lang={lang}/>
            <Adventure setSearchFocus={setSearchFocus} lang={lang}/>
        </div>
    );
}

export default Home;