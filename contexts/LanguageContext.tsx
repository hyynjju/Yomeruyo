import React, { createContext, useContext, useState } from 'react';

import { ko } from '../i18n/ko';
import { ja } from '../i18n/ja';

export type Language = 'ko' | 'ja';

const translations = {
  ko,
  ja,
};

type Translation = typeof ko;

interface LanguageContextType {
  language: Language;
  setLanguage: (language: Language) => void;
  t: Translation;
}

const LanguageContext = createContext<LanguageContextType | undefined>(
  undefined,
);

export const LanguageProvider: React.FC<{
  children: React.ReactNode;
}> = ({ children }) => {
  const [language, setLanguageState] = useState<Language>(() => {
    const savedLanguage = localStorage.getItem('yomeruyo-language');

    if (savedLanguage === 'ja') {
      return 'ja';
    }

    return 'ko';
  });

  const setLanguage = (nextLanguage: Language) => {
    setLanguageState(nextLanguage);
    localStorage.setItem('yomeruyo-language', nextLanguage);
  };

  return (
    <LanguageContext.Provider
      value={{
        language,
        setLanguage,
        t: translations[language] as Translation,
      }}
    >
      {children}
    </LanguageContext.Provider>
  );
};

export const useLanguage = () => {
  const context = useContext(LanguageContext);

  if (!context) {
    throw new Error('useLanguage must be used within LanguageProvider');
  }

  return context;
};
