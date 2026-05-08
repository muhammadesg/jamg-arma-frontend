import { createContext, useContext, useState } from 'react';
import uz from '../locales/uz.json';
import ru from '../locales/ru.json';
import en from '../locales/en.json';

const translations = { uz, ru, en };

const LanguageContext = createContext(null);

export function LanguageProvider({ children }) {
  const [lang, setLang] = useState('uz');

  const t = translations[lang];

  return (
    <LanguageContext.Provider value={{ lang, setLang, t }}>
      {children}
    </LanguageContext.Provider>
  );
}

export function useLanguage() {
  return useContext(LanguageContext);
}
