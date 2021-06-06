import { useLanguageContext } from '../../../context/languageContext';

import Button from '../../../components/GradientButton/GradientButton';

import { makeStyles } from '@material-ui/core/styles';
import styles from './BecomeACreator.styles';
const useStyles = makeStyles(styles);

const BecomeACreator = () => {
    const { BecomeACreator: text } = useLanguageContext().appText;
    const classes = useStyles();

    return (
        <div className={classes.landingSlide}>
            <div>
                <h1 className={classes.title}>{text.becomeTitle}</h1>
                <h1 className={classes.title}>{text.shareTitle}</h1>
                <h1 className={classes.title}>{text.getPaidTitle}</h1>
                <Button className={classes.getStartedButton} variant="creator">
                    {text.getStarted}
                </Button>
            </div>
            <img 
            className={classes.landingImg}
            alt="Cooking with Sidney"
            src={`${process.env.REACT_APP_CLOUDINARY_BASE_URI}c_fill,h_600,w_500/v1622837493/Ramble/Homepage/landing.jpg`} />
        </div>
    );
}

export default BecomeACreator;