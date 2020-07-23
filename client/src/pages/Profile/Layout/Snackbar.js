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
    position: { top: 100 }
}));

const Snackbar = ({open, onClose, message}) => {
    const classes = useStyles();

    return (
        <MUISnackbar
        anchorOrigin={{vertical: 'top', horizontal: 'right'}}
        ContentProps={{classes: { root: classes.root }}}
        classes={{anchorOriginTopRight: classes.position}}
        open={open}
        autoHideDuration={2700}
        onClose={onClose}
        message={message}/>
    );
}

export default React.memo(Snackbar);