import { useAppSelector, useAppDispatch } from 'hooks/redux';
import { closeSnackbar } from 'store/uiSlice';

import MUISnackbar from '@material-ui/core/Snackbar';

import { makeStyles } from '@material-ui/core/styles';
import styles from './Snackbar.styles';
const useStyles = makeStyles(styles);

const Snackbar = () => {
    const classes = useStyles();
    const message = useAppSelector(state => state.ui.snackbarMessage);
    const dispatch = useAppDispatch();

    return (
        <MUISnackbar
        anchorOrigin={{ 
            vertical: 'top', 
            horizontal: 'right'
        }}
        ContentProps={{ 
            classes: { root: classes.root }
        }}
        classes={{ anchorOriginTopRight: classes.position }}
        open={Boolean(message)}
        onClose={() => dispatch(closeSnackbar())}
        message={message} />
    );
}

export default Snackbar;