import React, {useState} from 'react';
import {connect} from 'react-redux';
import {showError} from '../../../store/actions/ui';
import useSavedCards from '../../../hooks/useSavedCards';

import CardInput from '../../../components/StripeCardInput';
import AddCircleIcon from '@material-ui/icons/AddCircle';
import HighlightOffIcon from '@material-ui/icons/HighlightOff';

import {makeStyles} from '@material-ui/core/styles';
import styles from './PaymentInfoStyles';
const useStyles = makeStyles(styles);

const months = ['January', 'February', 'March', 'April', 'May', 'June',
                'July', 'August', 'September', 'October', 'November', 'December'];

const PaymentInfo = (props) => {
    const classes = useStyles();

    const [canSubmit, setCanSubmit] = useState(false);
    const [showMessage, setShowMessage] = useState(false);

    const {cards, saveCard, unsaveCard} = useSavedCards();

    const handleCardInputChange = (e) => {
        if(e.complete) { setCanSubmit(true); }
    }
    const handleAddCard = () => {
        if(canSubmit) { 
            saveCard(props.userName);
        } else { setShowMessage(true); }
    }
    const handleDeleteCard = (cardId) => () => {
        unsaveCard(cardId);
    }

    return (
        <div className={classes.root}>
            <h1 className={classes.title}>Payment Information</h1>
            <ul className={classes.savedCards}>
            {cards.map(card => (
                <li key={card.id}>
                    {card.icon}
                    <span className="bullets">
                        &bull;&bull;&bull;&bull; 
                        &bull;&bull;&bull;&bull; 
                        &bull;&bull;&bull;&bull;
                    </span>
                    {card.last4}
                    <p className={classes.greyText}> 
                        {`Expiration date: ${months[card.expireDate[0]]} ${
                        card.expireDate[1]}`}
                    </p>
                    <HighlightOffIcon 
                    className={classes.removeIcon}
                    onClick={handleDeleteCard(card.id)}/>
                </li>
            ))}
            </ul>
            <div className={classes.addPaymentMethod}>
                <h4 className={classes.title}>
                    Add a new payment method
                </h4>
                <div>
                    <div>
                        <CardInput onChange={handleCardInputChange}/>
                    </div>
                    <AddCircleIcon 
                    className={classes.addIcon} 
                    onClick={handleAddCard}/>
                </div>
                {showMessage && 
                    <span className={classes.errorMessage}>
                        The input is invalid
                    </span>}
            </div>
        </div>
    ); 
}

const mapStateToProps = (state) => ({
    userName: `${state.user.profile.fstName} ${state.user.profile.lstName}`
});
const mapDispatchToProps = (dispatch) => ({
    showError: (msg) => dispatch(showError(msg))
});

export default connect(mapStateToProps, mapDispatchToProps)(PaymentInfo);

