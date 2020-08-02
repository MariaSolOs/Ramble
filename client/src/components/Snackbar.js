import React from 'react';

import MUISnackbar from '@material-ui/core/Snackbar';

//Styles
import {makeStyles} from '@material-ui/core/styles';
const useStyles = makeStyles((theme) => ({
    root: {
        fontFamily: 'Helvetica, sans-serif',
        fontSize: '1rem',
        letterSpacing: '-0.03rem',
        fontWeight: 600,
        backgroundColor: 'rgba(49, 49, 49, 0.9)'
    },
    position: { top: 80 }
}));

const Snackbar = (props) => {
    const classes = useStyles();

    return (
        <MUISnackbar
        anchorOrigin={{vertical: 'top', horizontal: 'right'}}
        ContentProps={{classes: { root: classes.root }}}
        classes={{anchorOriginTopRight: classes.position}}
        open={props.open}
        onClose={props.onClose}
        autoHideDuration={2700}
        message={props.message}/>
    );
}

export default Snackbar;