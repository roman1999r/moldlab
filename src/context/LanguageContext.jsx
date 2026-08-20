import { createContext, useContext, useMemo, useState } from 'react';
import { translations } from '../i18n/translations.jsx';

const LanguageContext = createContext(null);

function detectLanguage() {
  const saved = localStorage.getItem('cacaoform-language');
  if (saved && translations[saved]) return saved;
  const browser = (navigator.language || 'uk').toLowerCase();
  if (browser.startsWith('pl')) return 'pl';
  if (browser.startsWith('en')) return 'en';
  return 'uk';
}

export function LanguageProvider({ children }) {
  const [language, setLanguageState] = useState(detectLanguage);
  const setLanguage = (value) => {
    setLanguageState(value);
    localStorage.setItem('cacaoform-language', value);
  };
  const value = useMemo(() => ({ language, setLanguage, t: translations[language] }), [language]);
  return <LanguageContext.Provider value={value}>{children}</LanguageContext.Provider>;
}

export function useLanguage() {
  const value = useContext(LanguageContext);
  if (!value) throw new Error('useLanguage must be used inside LanguageProvider');
  return value;
}
