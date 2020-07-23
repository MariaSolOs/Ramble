import {useState, useEffect} from 'react';
import axios from 'axios';

const languageAPILink = 'https://gist.githubusercontent.com/piraveen/fafd0d984b2236e809d03a0e306c8a4d/raw/4258894f85de7752b78537a4aa66e027090c27ad/languages.json';

export default function useLanguages(props) {
    const [languages, setLanguages] = useState([]);
    useEffect(() => {
        if(languages.length === 0) {
            axios.get(languageAPILink)
            .then(res => {
                if (res.status === 200) {
                    const retrieved = [];
                    for(let lang in res.data) {
                        retrieved.push(res.data[lang].nativeName.split(',')[0]);
                    }
                    setLanguages(retrieved);
                }
            });
        }
    }, [languages.length]);

    return languages;
}