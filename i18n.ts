import i18n from 'i18next';
import { initReactI18next } from 'react-i18next';
import language from './assets/translations/source.json';

i18n
  .use(initReactI18next)
  .init({
    resources: {
      en: {
        translation: language,
      },
    },
    lng: 'en',
    fallbackLng: 'en',
    interpolation: {
      escapeValue: false,
    },
  });

export default i18n;
