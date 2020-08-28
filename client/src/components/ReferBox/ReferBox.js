import React from 'react';
import {connect} from 'react-redux';
import withAuthDialogs from '../../hoc/withAuthDialogs/withAuthDialogs';

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

const ReferBox = (props) => {    
    const classes = useStyles({loggedUser: props.loggedUser});

    return (
        <div className={classes.wrapper}>
            <div className={classes.root}>
                {props.promoCode &&
                <>
                    <h5 className={classes.greyText}>Your code</h5>
                    <h3 className={classes.code}>{props.promoCode}</h3>
                </>}
                {props.loggedUser? 
                    <h3 className={classes.instruction}>
                        Share this code with a friend. When they use it for their first 
                        booking, you'll both get 20% off your next experience.
                    </h3> : 
                    <>
                    <h3 className={classes.title1}>
                        Share your code with a friend. By using it for their first 
                        booking, you’ll both get <span>20</span>% off
                    </h3> 
                    <h4 className={classes.title2}>your next experience.</h4>
                    </>
                }
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
                        {props.loggedUser && <p className={classes.greyText}>Share with</p>}
                        {props.loggedUser?
                        <>
                            <FacebookMessengerShareButton 
                            appId={process.env.REACT_APP_FACEBOOK_ID} 
                            url={props.shareUrl}>
                                <img src={messengerIcon} alt="Refer with Messenger"/>
                            </FacebookMessengerShareButton>
                            <EmailShareButton 
                            url={props.shareUrl}
                            subject="Ramble - Experience different"
                            body={'Feel like trying something new? Use my Ramble promo ' +
                            `code ${props.promoCode} to get 20% off your next experience:`}>
                                <img src={mailIcon} alt="Refer with email"/>
                            </EmailShareButton>
                            <WhatsappShareButton url={props.shareUrl}>
                                <img src={whatsAppIcon} alt="Refer with Whatsapp"/>
                            </WhatsappShareButton>
                        </> : 
                        <div onClick={props.dialogActions && 
                                      props.dialogActions.openSignUpDialog}>
                            <img src={messengerIcon} alt="Refer with Messenger"/>
                            <img src={mailIcon} alt="Refer with email"/>
                            <img src={whatsAppIcon} alt="Refer with Whatsapp"/>
                        </div>}
                    </div>
                </div>
            </div>
        </div>
    );
}

const mapStateToProps = (state) => ({
    loggedUser: state.user.profile.id,
    promoCode: state.user.profile.promoCode.code
});

export default connect(mapStateToProps, null)(withAuthDialogs(ReferBox));