import React from 'react';
import {useSelector} from 'react-redux';

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

    const promoCode = useSelector(state => state.user.profile.promoCode.code);
    
    return (
        <div className={classes.wrapper}>
            <div className={classes.root}>
                {promoCode &&
                <>
                    <h5 className={classes.greyText}>Your code</h5>
                    <h3 className={classes.code}>{promoCode}</h3>
                </>}
                <h3 className={classes.instruction}>
                    Share this code with a friend. When they use it for their first booking,
                    you'll both get 20% off your next experience.
                </h3> 
                <div className={classes.shareOptions}>
                    <div className={classes.referAvatars}>
                        <Avatar src={referAvat[1]}
                        alt="Refer a friend"/>
                        <Avatar src={referAvat[0]}
                        alt="Refer a friend" className="middle-avatar"/>
                        <Avatar src={referAvat[2]}
                        alt="Refer a friend"/>
                    </div>
                    <div className={classes.referMedia}>
                        <p className={classes.greyText}>Share with</p>
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
                            <img src={whatsAppIcon} alt="Refer with Whatsapp"/>
                        </WhatsappShareButton>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default ReferBox;