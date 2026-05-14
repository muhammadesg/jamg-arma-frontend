import { createContext } from 'react';

export type LanguageCode = 'uz' | 'ru' | 'en';

export interface LanguageContextValue {
  lang: LanguageCode;
  setLang: (lang: LanguageCode) => void;
  t: Record<string, unknown>;
}

export const LanguageContext = createContext<LanguageContextValue | null>(null);
