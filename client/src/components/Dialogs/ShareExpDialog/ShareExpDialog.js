import React from 'react';
import {CopyToClipboard} from 'react-copy-to-clipboard';

import Dialog from '@material-ui/core/Dialog';
import DialogContent from '@material-ui/core/DialogContent';
import CloseIcon from '@material-ui/icons/Close';
import {FacebookMessengerShareButton, 
        EmailShareButton, 
        FacebookShareButton,
        LinkedinShareButton} from 'react-share';
import messengerIcon from '../../../shared/images/messenger-icon.svg';
import mailIcon from '../../../shared/images/mail-icon.svg';
import facebookIcon from '../../../shared/images/facebook-icon.svg';
import linkedinIcon from '../../../shared/images/linkedin-icon.svg';

import {makeStyles} from '@material-ui/core/styles';
import styles from './ShareExpDialogStyles';
const useStyles = makeStyles(styles);

const ShareExpDialog = (props) => {
    const classes = useStyles();

    return (
        <Dialog
        open={props.open}
        onClose={props.onClose}
        classes={{ paper: classes.paper }}
        maxWidth="xs">
            <div className={classes.header}>
                <h4 className="header-title">Share this experience</h4>
                <CloseIcon className="close-icon" onClick={props.onClose}/>
            </div>
            <DialogContent className={classes.content}>
                <FacebookMessengerShareButton
                resetButtonStyle={false} 
                className={classes.button}
                url={window.location.href}
                appId={process.env.REACT_APP_FACEBOOK_ID}>
                    <img src={messengerIcon} alt="Share with messenger"/>
                    Messenger
                </FacebookMessengerShareButton>
                <EmailShareButton 
                resetButtonStyle={false} 
                className={classes.button}
                url={window.location.href}
                subject={`Ramble - ${props.expTitle}`}
                body="Check out this experience: ">
                    <img src={mailIcon} alt="Share with email"/>
                    Email
                </EmailShareButton>
                <FacebookShareButton 
                resetButtonStyle={false} 
                className={classes.button}
                url={window.location.href}>
                    <img src={facebookIcon} alt="Share with Facebook"/>
                    Facebook
                </FacebookShareButton>
                <LinkedinShareButton 
                resetButtonStyle={false} 
                className={classes.button}
                url={window.location.href}>
                    <img src={linkedinIcon} alt="Share with LinkedIn"/>
                    LinkedIn
                </LinkedinShareButton>
                <CopyToClipboard text={window.location.href}>
                    <div className={`${classes.button} ${classes.shareLink}`}>
                        <span>{window.location.href}</span>...
                        <button>Copy link</button>
                    </div>
                </CopyToClipboard>
            </DialogContent>
        </Dialog>
    );
}

export default ShareExpDialog;