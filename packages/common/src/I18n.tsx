import i18n from 'i18next';
import {initReactI18next} from 'react-i18next';
import * as commonEn from './translations/en/common.json';
import * as validationEn from './translations/en/validation.json';

void i18n.use(initReactI18next).init({
  lng: 'en',
  debug: process.env.REACT_APP_DEBUG_MODE === 'true',
  resources: {
    en: {
      translation: commonEn,
      validation: validationEn,
    },
  },
  interpolation: {
    escapeValue: false, // react is already safe from xss
  },
});

export default i18n;
