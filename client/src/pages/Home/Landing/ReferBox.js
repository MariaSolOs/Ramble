import React, {useContext} from 'react';
import {CloudinaryContext} from '../../../context/cloudinaryContext';

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
const useStyles = makeStyles(() => ({
    //Containers
    wrapper: {
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        width: '100%',
        margin: '0.6rem 0',
        backgroundColor: '#FFFFF9',
        borderRadius: '1rem'
    },
    root: {
        fontFamily: 'Helvetica, sans-serif',
        fontWeight: 'bold',
        letterSpacing: '-0.05rem',
        padding: '15px 15px 18px',
        display: 'flex',
        flexDirection: 'column',
    },
    body: {
        display: 'flex',
        alignItems: 'flex-end', 
        justifyContent: 'space-between',
        marginTop: '0.5rem'
    },

    //Text
    title1: {
        color: '#2B2B2B',
        margin: 0,
        fontSize: '1.55rem',
        '& span': { fontSize: '1.9rem' }
    },
    title2: {
        margin: '0 auto 8px 0',
        color: '#878788',
        fontSize: '1.4rem'
    },

    referAvatars: {
        backgroundColor: '#E1E2E2',
        display: 'flex',
        borderRadius: '0.8rem',
        padding: '18px',
        '& .MuiAvatar-root': {
            boxShadow: '10px 10px 20px -7px rgba(0, 0, 0, 0.5)',
            '&.middle-avatar': { 
                margin: '-3px -13px 0',
                zIndex: 1
            }
        },
    },
    referMedia: {
        marginRight: 20,
        '& img': { 
            width: 35,
            height: 35,
            marginRight: 8
        },
        '& button': {'&:focus': { outline: 'none' }}
    }
}));

const referAvat = ['Ramble/Homepage/ref_1.jpeg',
                   'Ramble/Homepage/ref_2.jpeg',
                   'Ramble/Homepage/ref_3.jpeg'];

const ReferBox = (props) => {
    const classes = useStyles();
    const cloudinary = useContext(CloudinaryContext);
    
    //TODO: Add refer codes here (discount for friend?)
    return (
        <div className={classes.wrapper}>
            <div className={classes.root}>
                <h3 className={classes.title1}>Invite friends & get <span>50</span>% off</h3> 
                <h4 className={classes.title2}>your next experience.</h4>
                <div className={classes.body}>
                    <div className={classes.referAvatars}>
                        <Avatar src={cloudinary.url(referAvat[1], 
                        {height: 80, width: 80, crop: 'thumb', gravity: 'face'})}
                        alt="Refer a friend"/>
                        <Avatar src={cloudinary.url(referAvat[0], 
                        {height: 80, width: 80, crop: 'thumb', gravity: 'face'})}
                        alt="Refer a friend" className="middle-avatar"/>
                        <Avatar src={cloudinary.url(referAvat[2], 
                        {height: 80, width: 80, crop: 'thumb', gravity: 'face'})}
                        alt="Refer a friend"/>
                    </div>
                    <div className={classes.referMedia}>
                        <FacebookMessengerShareButton 
                        appId={process.env.REACT_APP_FACEBOOK_ID} 
                        url={process.env.REACT_APP_SHARE_LINK}>
                            <img src={messengerIcon} alt="Refer with Messenger"/>
                        </FacebookMessengerShareButton>
                        <EmailShareButton 
                        url={process.env.REACT_APP_SHARE_LINK}>
                            {/* TODO: Add subject and body */}
                            <img src={mailIcon} alt="Refer with email"/>
                        </EmailShareButton>
                        <WhatsappShareButton url={process.env.REACT_APP_SHARE_LINK}>
                            <img src={whatsAppIcon} alt="Facebook Messenger"/>
                        </WhatsappShareButton>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default ReferBox;