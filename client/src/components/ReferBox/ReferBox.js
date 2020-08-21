import React from 'react';

//Components and icons
import Avatar from '@material-ui/core/Avatar';
import {FacebookMessengerShareButton, 
        EmailShareButton, 
        WhatsappShareButton} from 'react-share';
import messengerIcon from './images/refer_messenger.svg';
import whatsAppIcon from './images/refer_whatsapp.svg';
import mailIcon from './images/refer_mail.svg';

//Styles
import {makeStyles} from '@material-ui/core/styles';
import styles from './ReferBoxStyles';
const useStyles = makeStyles(styles);

const referAvat = [`https://res.cloudinary.com/${process.env.REACT_APP_CLOUDINARY_CLOUDNAME}/image/upload/c_thumb,g_face,h_80,w_80/v1/Ramble/Homepage/ref_1.jpeg`,
                   `https://res.cloudinary.com/${process.env.REACT_APP_CLOUDINARY_CLOUDNAME}/image/upload/c_thumb,g_face,h_80,w_80/v1/Ramble/Homepage/ref_2.jpeg`,
                   `https://res.cloudinary.com/${process.env.REACT_APP_CLOUDINARY_CLOUDNAME}/image/upload/c_thumb,g_face,h_80,w_80/v1/Ramble/Homepage/ref_3.jpeg`];

const ReferBox = ({shareUrl}) => {
    const classes = useStyles();
    
    //TODO: Add refer codes here (discount for friend?)
    return (
        <div className={classes.wrapper}>
            <div className={classes.root}>
                <h3 className={classes.title1}>
                    Invite friends & get <span>20</span>% off
                </h3> 
                <h4 className={classes.title2}>your next experience.</h4>
                <div className={classes.body}>
                    <div className={classes.referAvatars}>
                        <Avatar src={referAvat[1]}
                        alt="Refer a friend"/>
                        <Avatar src={referAvat[0]}
                        alt="Refer a friend" className="middle-avatar"/>
                        <Avatar src={referAvat[2]}
                        alt="Refer a friend"/>
                    </div>
                    <div className={classes.referMedia}>
                        <FacebookMessengerShareButton 
                        appId={process.env.REACT_APP_FACEBOOK_ID} 
                        url={shareUrl}>
                            <img src={messengerIcon} alt="Refer with Messenger"/>
                        </FacebookMessengerShareButton>
                        <EmailShareButton 
                        url={shareUrl}>
                            {/* TODO: Add subject and body */}
                            <img src={mailIcon} alt="Refer with email"/>
                        </EmailShareButton>
                        <WhatsappShareButton url={shareUrl}>
                            <img src={whatsAppIcon} alt="Facebook Messenger"/>
                        </WhatsappShareButton>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default ReferBox;