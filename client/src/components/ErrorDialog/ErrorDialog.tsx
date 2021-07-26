import { useLanguageContext } from 'context/languageContext';
import { useUiContext } from 'context/uiContext';

import { Dialog } from '@material-ui/core';
import errorImg from 'assets/images/error-dialog-image.png';

import { makeStyles } from '@material-ui/core/styles';
import styles from './ErrorDialog.styles';
const useStyles = makeStyles(styles);

const ErrorDialog = () => {
    const { ErrorDialog: text } = useLanguageContext().appText;
    const classes = useStyles();

    const { uiState, uiDispatch } = useUiContext();
    const { errorMessage } = uiState;

    return (
        <Dialog 
        maxWidth="sm" 
        classes={{ paper: classes.paper }}
        open={Boolean(errorMessage)}
        onClose={() => uiDispatch({ type: 'CLOSE_ERROR_DIALOG' })}>
            <div className={classes.header}>
                <img src={errorImg} alt="An error occurred" className={classes.image} />
                <h4 className={classes.title}>{text.title}</h4>
            </div>
            <p className={classes.message}>
                {errorMessage}
            </p>
        </Dialog>
    );
}

export default ErrorDialog;