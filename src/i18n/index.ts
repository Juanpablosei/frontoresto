import i18n from 'i18next';
import { initReactI18next } from 'react-i18next';
import LanguageDetector from 'i18next-browser-languagedetector';

// Importar los archivos de traducción
import es from './locales/es.json';
import en from './locales/en.json';

const resources = {
  es: {
    translation: es
  },
  en: {
    translation: en
  }
};

i18n
  .use(LanguageDetector)
  .use(initReactI18next)
  .init({
    resources,
    fallbackLng: 'es',
    debug: process.env.NODE_ENV === 'development',

    interpolation: {
      escapeValue: false, // React ya escapa por defecto
    },

    detection: {
      order: ['localStorage', 'navigator', 'htmlTag'],
      caches: ['localStorage'],
    },
  });

export default i18n;
