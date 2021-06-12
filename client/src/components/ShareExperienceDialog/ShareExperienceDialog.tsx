import { CopyToClipboard } from 'react-copy-to-clipboard';

import { useLanguageContext } from 'context/languageContext';

import Dialog from '@material-ui/core/Dialog';
import DialogContent from '@material-ui/core/DialogContent';
import CloseIcon from '@material-ui/icons/Close';
import {
    FacebookMessengerShareButton, 
    FacebookShareButton,
    EmailShareButton, 
    LinkedinShareButton
} from 'react-share';
import messengerIcon from 'assets/images/messenger-icon.svg';
import facebookIcon from 'assets/images/facebook-icon.svg';
import emailIcon from 'assets/images/email-icon.svg';
import linkedinIcon from 'assets/images/linkedin-icon.svg';

import { makeStyles } from '@material-ui/core/styles';
import styles from './ShareExperienceDialog.styles';
const useStyles = makeStyles(styles);

type Props = {
    open: boolean;
    onClose: () => void;
    experienceTitle: string;
}

const SHARE_URL = window.location.href;

const ShareExperienceDialog = (props: Props) => {
    const { ShareExperienceDialog: text } = useLanguageContext().appText;
    const classes = useStyles();

    return (
        <Dialog 
        open={props.open} 
        onClose={props.onClose} 
        maxWidth="xs"
        classes={{ paper: classes.paper }}>
            <div className={classes.header}>
                <h4 className={classes.title}>{text.shareExperience}</h4>
                <CloseIcon className={classes.closeIcon} onClick={props.onClose} />
            </div>
            <DialogContent className={classes.content}>
                <FacebookMessengerShareButton
                url={SHARE_URL}
                resetButtonStyle={false}
                className={classes.button}
                appId={process.env.REACT_APP_FACEBOOK_ID!}>
                    <img className={classes.mediaIcon} src={messengerIcon} alt="Share with Messenger" />
                    Messenger
                </FacebookMessengerShareButton>
                <EmailShareButton 
                url={SHARE_URL}
                resetButtonStyle={false}
                className={classes.button}
                subject={`Ramble: ${props.experienceTitle}`}
                body="Checkout this experience: ">
                    <img className={classes.mediaIcon} src={emailIcon} alt="Share with email" />
                    Email
                </EmailShareButton>
                <FacebookShareButton
                url={SHARE_URL}
                resetButtonStyle={false}
                className={classes.button}>
                    <img className={classes.mediaIcon} src={facebookIcon} alt="Share with Facebook" />
                    Facebook
                </FacebookShareButton>
                <LinkedinShareButton
                url={SHARE_URL}
                resetButtonStyle={false}
                className={classes.button}>
                    <img className={classes.mediaIcon} src={linkedinIcon} alt="Share with LinkedIn" />
                    LinkedIn
                </LinkedinShareButton>
                <CopyToClipboard text={SHARE_URL}>
                    <div className={`${classes.button} ${classes.shareButton}`}>
                        <span className={classes.shareLink}>{SHARE_URL}</span>...
                        <button className={classes.copyButton}>{text.copyLink}</button>
                    </div>
                </CopyToClipboard>
            </DialogContent>
        </Dialog>
    );
}

export default ShareExperienceDialog;