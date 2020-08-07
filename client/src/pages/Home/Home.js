import React, {useRef} from 'react';

//Views
import Landing from './Landing/Landing';
import Partake from './Gallery/Partake';
import Adventure from './Gallery/Adventure';

//Styles
import {makeStyles} from '@material-ui/core/styles';
const useStyles = makeStyles(() => ({
    root: {
        minWidth: '100vw',
        minHeight: '100vh',
        margin: '100px 0 0',
        boxSizing: 'border-box',
    }
}));

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