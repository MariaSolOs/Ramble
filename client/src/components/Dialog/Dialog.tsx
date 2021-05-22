import MUIDialog, { DialogProps } from '@material-ui/core/Dialog';

import { makeStyles } from '@material-ui/core/styles';
import styles from './Dialog.styles';
const useStyles = makeStyles(styles);

const Dialog = (props: DialogProps) => {
    const classes = useStyles();

    return (
        <MUIDialog
        { ...props }
        classes={{
            ...props.classes,
            paper: `${classes.paper} ${props.classes?.paper}`
        }}>
            {props.children}
        </MUIDialog>
    );
}

export default Dialog;