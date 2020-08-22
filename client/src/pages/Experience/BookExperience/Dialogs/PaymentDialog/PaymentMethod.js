import React, {useState, useEffect} from 'react';

//Components and icons
import StripeCardInput from '../../../../../components/StripeCardInput';
import MenuItem from '@material-ui/core/MenuItem';
import Select from '@material-ui/core/Select';
import InputBase from '@material-ui/core/InputBase';
import Checkbox from '../../../../../components/Input/Checkbox';

import {makeStyles} from '@material-ui/core/styles';
import styles from './PaymentDialogStyles';
const useStyles = makeStyles(styles);

const PaymentMethod = (props) => {
    const classes = useStyles();

    const {cards, onCardToUse} = props;
    const [showStripeInput, setShowStripeInput] = useState(cards.length === 0);
    //If the user wants to use a new card
    const handleStripeInputChange = (e) => {
        if(e.complete) { props.onCanSubmit(true); }
    }  
    const handleUseSavedCard = (e) => {
        onCardToUse(e.target.value);
    } 
    const handleUseUnsavedCard = (e) => {
        if(e.target.checked) {
            onCardToUse(null);
            setShowStripeInput(true);
            props.onCanSubmit(false);
        }
    }

    //By default use the first saved card
    useEffect(() => {
        if(cards.length > 0) {
            onCardToUse(cards[0].id);
        }
    }, [cards, onCardToUse]);

    return (
        <div className={classes.payMethod}>
            <p className={classes.label}>Payment method</p>
            {cards.length > 0 && !showStripeInput?
            <div className={classes.savedCards}>
                <Select
                value={props.cardToUse || cards[0].id}
                onChange={handleUseSavedCard}
                input={<InputBase className={classes.input}/>}
                MenuProps={{
                    getContentAnchorEl: null,
                    anchorOrigin: {
                        vertical: 'bottom',
                        horizontal: 'right'
                    },
                    classes: {paper: classes.savedCardsMenu}
                }}>
                {cards.map(card => (
                    <MenuItem 
                    key={card.id}
                    value={card.id}>
                        {card.icon}
                        <span className="bullets">
                            &bull;&bull;&bull;&bull; 
                            &bull;&bull;&bull;&bull; 
                            &bull;&bull;&bull;&bull;
                        </span>
                        {card.last4}
                    </MenuItem> 
                ))}
                </Select>
                <div className={classes.checkboxField}>
                    <p>Use a different card</p>
                    <Checkbox 
                    checked={showStripeInput}
                    onChange={handleUseUnsavedCard}/>
                </div>
            </div>
            : 
            <>
                <StripeCardInput
                onChange={handleStripeInputChange}/>
                <div className={classes.checkboxField}>
                    <p>Remember my payment information</p>
                    <Checkbox 
                    checked={props.rememberCard}
                    onChange={props.onRememberCard}/>
                </div>
            </>}
        </div>
    );
}

export default PaymentMethod;