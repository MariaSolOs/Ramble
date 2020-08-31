import React, {useRef} from 'react';

import Landing from './Landing/Landing';
import Partake from './Gallery/Partake';
import Adventure from './Gallery/Adventure';

import {makeStyles} from '@material-ui/core/styles';
import styles from './HomeStyles';
const useStyles = makeStyles(styles);

const Home = (props) => {
    const classes = useStyles();

    //Focus searchbar when clicking on the gallery images
    const searchRef = useRef(null);
    const setSearchFocus = () => { 
        searchRef.current && searchRef.current.focus(); 
    }

    return (
        <div className={classes.root}>
            <Landing searchRef={searchRef}/>
            <Partake setSearchFocus={setSearchFocus}/>
            <Adventure setSearchFocus={setSearchFocus}/>
        </div>
    );
}

export default Home;