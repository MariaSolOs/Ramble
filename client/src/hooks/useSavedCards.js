import React, {useState, useEffect, useCallback} from 'react';
import {useStripe, useElements, CardElement} from '@stripe/react-stripe-js';
import {useDispatch} from 'react-redux';
import {showError} from '../store/actions/ui';
import axios from '../tokenizedAxios';

import {FontAwesomeIcon} from '@fortawesome/react-fontawesome';
import {faCcVisa} from '@fortawesome/free-brands-svg-icons/faCcVisa';
import {faCcMastercard} from '@fortawesome/free-brands-svg-icons/faCcMastercard';
import {faCcAmex} from '@fortawesome/free-brands-svg-icons/faCcAmex';
import {faCcDinersClub} from '@fortawesome/free-brands-svg-icons/faCcDinersClub';
import {faCcDiscover} from '@fortawesome/free-brands-svg-icons/faCcDiscover';
import {faCreditCard} from '@fortawesome/free-solid-svg-icons/faCreditCard';
const getCardBrandIcon = (brand) => {
    let icon;
    switch(brand) {
        case 'visa': icon = faCcVisa;
                     break;
        case 'mastercard': icon = faCcMastercard;
                           break;
        case 'amex': icon = faCcAmex;
                     break;
        case 'diners_club': icon = faCcDinersClub;
                            break;
        case 'discover': icon = faCcDiscover;
                         break;
        default: icon = faCreditCard;
    }
    return <FontAwesomeIcon icon={icon} className="credit-card-icon"/>
}

export default function useSavedCards(props) {
    const [cards, setCards] = useState([]);

    const dispatch = useDispatch();
    const stripe = useStripe();
    const elements = useElements();
    const saveCard = useCallback((userName) => {
        const card =  elements.getElement(CardElement);
        stripe.createPaymentMethod({
            type: 'card',
            card,
            billing_details: {
                name: userName,
            },
        }).then(async (res) => {
            if(res.error) {
                dispatch(showError("We couldn't save your card..."));
                return;
            } else {
                await axios.post('/api/stripe/payment-method', {
                    paymentMethodId: res.paymentMethod.id
                });
                const newCard = {
                    id: res.paymentMethod.id,
                    brand: res.paymentMethod.card.brand,
                    last4: res.paymentMethod.card.last4,
                    expireDate: [res.paymentMethod.card.exp_month, 
                                 res.paymentMethod.card.exp_year],
                    icon: getCardBrandIcon(res.paymentMethod.card.brand)
                }
                setCards(cards => [...cards, newCard]);
                card.clear();
            }
        });
    }, [dispatch, stripe, elements]);

    const unsaveCard = useCallback((cardId) => {
        axios.delete('/api/stripe/payment-method', {
            data: {paymentMethodId: cardId}
        }).then(res => {
            setCards(cards => cards.filter(card => card.id !== cardId));
        }).catch(err => {
            dispatch(showError("We couldn't delete your card..."));
        });
    }, [dispatch]);

    useEffect(() => {
        axios.get('/api/profile/payMethods')
        .then(res => {
            const data = [];
            for(const card of res.data.paymentMethods) {
                data.push({
                    ...card,
                    icon: getCardBrandIcon(card.brand)
                });
            }
            setCards(data);
        })
        .catch(err => { setCards([]); });
    }, []);

    return { cards, saveCard, unsaveCard };
}