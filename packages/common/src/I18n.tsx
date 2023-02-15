import i18n from 'i18next';
import {initReactI18next} from 'react-i18next';
import {translationEn} from './translations/en';

void i18n.use(initReactI18next).init({
  lng: 'en',
  debug: import.meta.env.DEV,
  resources: {
    en: translationEn,
  },
  interpolation: {
    escapeValue: false,
  },
});

export default i18n;
