import React, { createContext, useContext, useState } from 'react';

import type { Language } from '../models/language';
import En from '../assets/translations/en';
import Fr from '../assets/translations/fr';

type TranslationRecord = typeof En | typeof Fr;

type LanguageContextType = {
    language: Language;
    appText: TranslationRecord;
    setLanguage: (lang: Language) => void;
} 

const dictionaries = { 
    'en': En,
    'fr': Fr 
} as Record<Language, TranslationRecord>;

const LanguageContext = createContext<LanguageContextType>({
    language: 'en',
    appText: dictionaries['en'],
    setLanguage: () => {}
});

export const useLanguageContext = () => useContext(LanguageContext);

const LanguageProvider: React.FC = ({ children }) => {
    const defaultLanguage = (localStorage.getItem('ramble-userLang') || 'en') as Language;

    const [language, setLanguage] = useState<Language>(defaultLanguage);

    return (
        <LanguageContext.Provider value={{
            language,
            appText: dictionaries[language],
            setLanguage
        }}>
            { children }
        </LanguageContext.Provider>
    );    
}

export default LanguageProvider;
