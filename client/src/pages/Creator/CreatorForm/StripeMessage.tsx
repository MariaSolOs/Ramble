import { useState } from 'react';

import { useLanguageContext } from 'context/languageContext';
import { useUiContext } from 'context/uiContext';

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faStripe } from '@fortawesome/free-brands-svg-icons/faStripe';
import Spinner from 'components/Spinner/Spinner';

import { makeStyles } from '@material-ui/core/styles';
import styles from './StripeMessage.styles';
const useStyles = makeStyles(styles);

type Props = {
    creatorId: string;
}

const StripeMessage = (props: Props) => {
    const { CreatorForm_StripeMessage: text } = useLanguageContext().appText;
    const { uiDispatch } = useUiContext();
    const classes = useStyles();

    const [loading, setLoading] = useState(false);

    const handleStripeRedirect = () => {
        setLoading(true);

        // Get Stripe link from the server
        fetch(`${process.env.REACT_APP_SERVER_URI}/stripe/onboarding`, {
            method: 'POST',
            mode: 'cors',
            headers: {
                'Content-Type': 'application/json',
                'Accept': 'application/json'
            },
            body: JSON.stringify({ creatorId: props.creatorId })
        })
        .then(res => res.json())
        .then(res => {
            // Redirect them to Stripe
            window.location.href = res.redirectUrl;
        })
        .catch(() => {
            uiDispatch({
                type: 'OPEN_ERROR_DIALOG',
                message: "We couldn't submit your form..."
            })
        });
    }

    return (
        <div className={classes.root}>
            {loading && <Spinner />}
            <p className={classes.submittedMessage}>{text.formSubmittedMessage}</p>
            <p className={classes.stripeMessage}>{text.stripeMessage}&trade;</p>
            <div className={classes.stripeLinkContainer} onClick={handleStripeRedirect}>
                <p className={classes.stripeContinue}>{text.continueWithStripe}</p>
                <FontAwesomeIcon icon={faStripe} className={classes.stripeButton} />
            </div>
        </div>
    );
}

export default StripeMessage;