import { useLanguageContext } from '../../context/languageContext';

import Dialog from '../Dialog/Dialog';
import DialogContent from '@material-ui/core/DialogContent';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faPhoneAlt } from '@fortawesome/free-solid-svg-icons/faPhoneAlt';
import { faEnvelope } from '@fortawesome/free-solid-svg-icons/faEnvelope';

import { makeStyles } from '@material-ui/core/styles';
import styles from './CustomerServiceDialog.styles';
const useStyles = makeStyles(styles);

type Props = {
    open: boolean;
    onClose: () => void;
}

const CustomerServiceDialog = (props: Props) => {
    const { CustomerServiceDialog: text } = useLanguageContext().appText;

    const classes = useStyles();

    return (
        <Dialog classes={{ paper: classes.paper }} open={props.open} onClose={props.onClose}>
            <h4 className={classes.title}>{text.title}</h4>
            <p className={classes.greyText}>{text.message}</p>
            <DialogContent className={classes.content}>
                <div className={classes.contactInfo}>
                    <FontAwesomeIcon className={classes.icon} icon={faPhoneAlt}/>
                    <p className={classes.greyText}>+ 1 (514) 654-7156</p>
                </div>
                <div className={classes.contactInfo}>
                    <FontAwesomeIcon className={classes.icon} icon={faEnvelope}/>
                    <p className={classes.greyText}>maria@ramble.email</p>
                </div>
            </DialogContent>
        </Dialog>
    );
}

export default CustomerServiceDialog;