import React from 'react';

//Styles
import {makeStyles} from '@material-ui/core/styles';
const useStyles = makeStyles(() => ({
    root: {
        
    }
}));

const Maintenance = (props) => {
    const classes = useStyles();

    return (
        <div>
            <h1>What do you want to do?</h1>
        </div>
    );
}

export default Maintenance;