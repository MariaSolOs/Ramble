import React from 'react';

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

    return (
        <div className={classes.root}>
            <Landing/>
            <Partake/>
            <Adventure/>
        </div>
    );
}

export default Home;