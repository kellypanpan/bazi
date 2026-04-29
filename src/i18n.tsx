/* eslint-disable react-refresh/only-export-components */
import React, { createContext, useContext, useEffect, useMemo, useState } from 'react';

export type Language = 'en' | 'zh-CN' | 'zh-TW';

type Localized<T> = Record<Language, T>;

type I18nContextValue = {
  language: Language;
  setLanguage: (language: Language) => void;
  pick: <T,>(localized: Localized<T>) => T;
};

const STORAGE_KEY = 'bazi-language';

export const languageOptions: { code: Language; label: string; shortLabel: string }[] = [
  { code: 'en', label: 'English', shortLabel: 'EN' },
  { code: 'zh-CN', label: '简体中文', shortLabel: '简' },
  { code: 'zh-TW', label: '繁體中文', shortLabel: '繁' },
];

const isLanguage = (value: string | null): value is Language => {
  return value === 'en' || value === 'zh-CN' || value === 'zh-TW';
};

const getInitialLanguage = (): Language => {
  if (typeof window === 'undefined') return 'en';

  const stored = window.localStorage.getItem(STORAGE_KEY);
  if (isLanguage(stored)) return stored;

  const browserLanguage = window.navigator.language;
  if (browserLanguage.toLowerCase().startsWith('zh-tw') || browserLanguage.toLowerCase().startsWith('zh-hk')) {
    return 'zh-TW';
  }
  if (browserLanguage.toLowerCase().startsWith('zh')) {
    return 'zh-CN';
  }
  return 'en';
};

const I18nContext = createContext<I18nContextValue | null>(null);

export const I18nProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [language, setLanguageState] = useState<Language>(getInitialLanguage);

  const setLanguage = (nextLanguage: Language) => {
    setLanguageState(nextLanguage);
    window.localStorage.setItem(STORAGE_KEY, nextLanguage);
  };

  useEffect(() => {
    document.documentElement.lang = language;
  }, [language]);

  const value = useMemo<I18nContextValue>(
    () => ({
      language,
      setLanguage,
      pick: (localized) => localized[language],
    }),
    [language]
  );

  return <I18nContext.Provider value={value}>{children}</I18nContext.Provider>;
};

export const useI18n = () => {
  const context = useContext(I18nContext);
  if (!context) {
    throw new Error('useI18n must be used within I18nProvider');
  }
  return context;
};
