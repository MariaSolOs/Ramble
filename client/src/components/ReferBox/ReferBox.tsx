import Avatar from '@material-ui/core/Avatar';
import messengerIcon from '../../assets/images/messenger-icon.svg';
import emailIcon from '../../assets/images/email-icon.svg';
import whatsappIcon from '../../assets/images/whatsapp-icon.svg';

import { makeStyles } from '@material-ui/core/styles';
import styles from './ReferBox.styles';
const useStyles = makeStyles(styles);

const REFER_AVATARS = [
    `${process.env.REACT_APP_CLOUDINARY_BASE_URI}c_thumb,g_face,h_80,w_80/v1/Ramble/Homepage/ref_2.jpeg`,
    `${process.env.REACT_APP_CLOUDINARY_BASE_URI}c_thumb,g_face,h_80,w_80/v1/Ramble/Homepage/ref_1.jpeg`,
    `${process.env.REACT_APP_CLOUDINARY_BASE_URI}c_thumb,g_face,h_80,w_80/v1/Ramble/Homepage/ref_3.jpeg`
] as const;

// TODO: Add this box back when we add promo codes back again
// TODO: Translate this component
const ReferBox = () => {
    const classes = useStyles();

    return (
        <div className={classes.root}>
            <h3 className={classes.blackInstruction}>
                Share your code with a friend. By using it for their first booking, you'll both get{' '}
                <span className={classes.referDiscount}>20</span>%
                {' '}off
            </h3> 
            <h4 className={classes.greyInstruction}>your next experience.</h4>
            <div className={classes.mediaContainer}>
                <div className={classes.mediaAvatars}>
                    <Avatar src={REFER_AVATARS[0]} alt="Refer a friend" />
                    <Avatar src={REFER_AVATARS[1]} alt="Refer a friend" className={classes.middleAvatar} />
                    <Avatar src={REFER_AVATARS[2]} alt="Refer a friend" />
                </div>
                <div className={classes.referButtonsContainer}>
                    <img src={messengerIcon} alt="Refer with Messenger" className={classes.referButton} />
                    <img src={emailIcon} alt="Refer with email" className={classes.referButton} />
                    <img src={whatsappIcon} alt="Refer with Whatsapp" className={classes.referButton} />
                </div>
            </div>
        </div>
    );
}

export default ReferBox;