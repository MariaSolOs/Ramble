import { useState, useEffect } from 'react';

const API_URL = 'https://gist.githubusercontent.com/piraveen/fafd0d984b2236e809d03a0e306c8a4d/raw/4258894f85de7752b78537a4aa66e027090c27ad/languages.json';

type Data = Record<string, { name: string; nativeName: string; }>;

export default function useLanguages() {
    const [languages, setLanguages] = useState<string[]>([]);

    useEffect(() => {
        let mounted = true;

        fetch(API_URL)
        .then(res => {
            if (mounted && res.status === 200) {
                return res.json();
            }
        })
        .then((res: Data) => {
            const retrieved = Object.values(res).map(({ nativeName }) => {
                const firstName = nativeName.split(',')[0];
                const capitalizedName = firstName.charAt(0).toLocaleUpperCase() + firstName.slice(1);
                return capitalizedName;
            });
            setLanguages(retrieved);
        });

        return () => { mounted = false; }
    }, []);

    return languages;
}