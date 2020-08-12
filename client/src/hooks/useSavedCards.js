import {useState, useEffect} from 'react';
import axios from '../tokenizedAxios';

export default function useSavedCards(props) {
    const [cards, setCards] = useState([]);

    useEffect(() => {
        axios.get('/api/profile/payMethods')
        .then(res => {
            setCards(res.data.paymentMethods);
        });
    }, []);

    return cards;
}