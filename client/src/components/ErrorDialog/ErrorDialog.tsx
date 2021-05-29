import { useLanguageContext } from '../../context/languageContext';
import { useAppSelector, useAppDispatch } from '../../hooks/redux';
import { closeErrorDialog } from '../../store/uiSlice';

import { Dialog } from '@material-ui/core';
import errorImg from '../../assets/images/error-dialog-image.png';

import { makeStyles } from '@material-ui/core/styles';
import styles from './ErrorDialog.styles';
const useStyles = makeStyles(styles);

const ErrorDialog = () => {
    const { ErrorDialog: text } = useLanguageContext().appText;

    const classes = useStyles();

    const message = useAppSelector(state => state.ui.errorMessage);
    const dispatch = useAppDispatch();

    return (
        <Dialog 
        maxWidth="sm" 
        classes={{ paper: classes.paper }}
        open={Boolean(message)}
        onClose={() => dispatch(closeErrorDialog())}>
            <div className={classes.header}>
                <img src={errorImg} alt="An error occurred" className={classes.image} />
                <h4 className={classes.title}>{text.title}</h4>
            </div>
            <p className={classes.message}>
                {message}
            </p>
        </Dialog>
    );
}

export default ErrorDialog;