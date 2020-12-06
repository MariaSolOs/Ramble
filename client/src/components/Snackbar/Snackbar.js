import React from 'react';

import MUISnackbar from '@material-ui/core/Snackbar';

//Styles
import {makeStyles} from '@material-ui/core/styles';
import styles from './SnackbarStyles';
const useStyles = makeStyles(styles);

const Snackbar = (props) => {
    const classes = useStyles();
    
    return (
        <MUISnackbar
        anchorOrigin={{vertical: 'top', horizontal: 'right'}}
        ContentProps={{classes: { root: classes.root }}}
        classes={{anchorOriginTopRight: classes.position}}
        open={props.open}
        onClose={props.onClose}
        autoHideDuration={4000}
        message={props.message}/>
    );
}

export default Snackbar;