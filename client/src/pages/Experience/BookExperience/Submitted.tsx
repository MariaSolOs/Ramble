import { useHistory } from 'react-router-dom';
import useMediaQuery from '@material-ui/core/useMediaQuery';
import type { DateTime } from 'luxon';
import { v4 as uuid } from 'uuid';

import { useLanguageContext } from 'context/languageContext';
import { getTimePieces } from 'utils/dates';
import { getCardIcon } from 'utils/booking';
import type { Currency } from 'models/experience';

import Avatar from '@material-ui/core/Avatar';
import Scroll from 'components/Scroll/Scroll';
import Button from 'components/GradientButton/GradientButton';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faUsers } from '@fortawesome/free-solid-svg-icons/faUsers';
import { faPhoneAlt } from '@fortawesome/free-solid-svg-icons/faPhoneAlt';
import { faMapMarkerAlt } from '@fortawesome/free-solid-svg-icons/faMapMarkerAlt';
import { faLaptop } from '@fortawesome/free-solid-svg-icons/faLaptop';

import { makeStyles, useTheme } from '@material-ui/core/styles';
import styles from './Submitted.styles';
const useStyles = makeStyles(styles);

type Props = {
    startDate: DateTime;
    endDate: DateTime;
    numGuests: number;
    cardBrand: string;
    cardLast4: string;
    totalPrice: number;
    currency: Currency;
    experience: {
        title: string;
        image: string;
        toBring: string[];
        meetingPoint?: string;
    }
    host: {
        name: string;
        photo: string;
        phoneNumber: string;
    }
}

const Submitted = (props: Props) => {
    const { BookExperience_Submitted: text } = useLanguageContext().appText;
    const classes = useStyles();

    const history = useHistory();
    const theme = useTheme()
    const isMobile = useMediaQuery(theme.breakpoints.down('sm'));
    
    const isOnlineExperience = !Boolean(props.experience.meetingPoint);
    const [startTime, startMeridiem] = getTimePieces(props.startDate);
    const [endTime, endMeridiem] = getTimePieces(props.endDate);
    const occurrenceDate = props.startDate.toFormat('EEEE, MMMM d');

    const bookingSummary = (
        <>
            <h2 className={classes.whiteText}>{props.experience.title}</h2>
            <time className={`${classes.greyText} ${classes.capitalized}`}>
                {occurrenceDate}
            </time>
            <time className={classes.greyText}>
                {`${startTime} ${startMeridiem} - ${endTime} ${endMeridiem}`}
            </time>
            <p className={classes.greyText}>
                <FontAwesomeIcon icon={faUsers} className={classes.icon} />
                {props.numGuests} {props.numGuests > 1 ? text.guests : text.guest}
            </p>
            <h4 className={classes.sectionTitle}>{text.host}</h4>
            <div className={classes.hostInfo}>
                <Avatar src={props.host.photo} />
                <p className={classes.greyText}>{props.host.name}</p>
                <p className={classes.greyText}>
                    <FontAwesomeIcon icon={faPhoneAlt} className={classes.icon} />
                    {props.host.phoneNumber}
                </p>
            </div>
            {props.experience.toBring.length > 0 &&
                <>
                    <h4 className={classes.sectionTitle}>
                        {text.toBringTitle}
                    </h4>
                    <ul className={classes.itemList}>
                        {props.experience.toBring.map(item => 
                            <li key={uuid()} className={classes.greyText}>
                                {item}
                            </li>
                        )}
                    </ul>
                </>}
            <h4 className={classes.sectionTitle}>{text.meetingSpotTitle}</h4>
            <p className={classes.greyText}>
                {isOnlineExperience ? 
                <>
                    <FontAwesomeIcon icon={faLaptop} className={classes.icon} />
                    {text.online}
                </> : 
                <address>
                    <FontAwesomeIcon icon={faMapMarkerAlt} className={classes.icon} />
                    {props.experience.meetingPoint}
                </address>}
            </p>
            <h4 className={classes.sectionTitle}>{text.paymentDetails}</h4>
            <p className={`${classes.greyText} ${classes.allCaps}`}>
                {text.paymentMethod}
            </p>
            <p className={classes.greyText}>
                <FontAwesomeIcon 
                icon={getCardIcon(props.cardBrand)} 
                className={classes.icon} />
                <span className={classes.cardBullets}>
                    &bull;&bull;&bull;&bull; 
                    &bull;&bull;&bull;&bull; 
                    &bull;&bull;&bull;&bull;
                </span>
                {props.cardLast4}
            </p>
            <div className={classes.priceRow}>
                <p className={classes.whiteText}>
                    {text.total} ({props.currency})
                </p>
                <p className={classes.whiteText}>
                    ${props.totalPrice.toFixed(2)}
                </p>
            </div>
        </>
    );

    return (
        <div className={classes.root}>
            <div className={classes.pageContainer}>
                <div className={classes.header}>
                    <div className={classes.headerGradient} />
                    <div>
                        <h1 className={classes.whiteText}>{text.title}</h1>
                        <h3 className={classes.greyText}>
                            {text.subtitle1} {props.host.name} {text.subtitle2}
                        </h3>
                    </div>
                </div>
                <div className={classes.summaryContainer}>
                    <img 
                    alt={props.experience.title} 
                    src={props.experience.image}
                    className={classes.experienceImage} />
                    {isMobile ?
                        <div className={classes.bookingContainer}>
                            {bookingSummary}
                        </div> : 
                        <Scroll 
                        className={classes.bookingContainer} 
                        heightRelativeToParent="100%">
                            {bookingSummary}
                        </Scroll>}
                    <Button 
                    variant="experience"
                    className={classes.button}
                    onClick={() => history.push('/')}>
                        {text.buttonText}
                    </Button>
                </div>
            </div>
        </div>
    );
}

export default Submitted;