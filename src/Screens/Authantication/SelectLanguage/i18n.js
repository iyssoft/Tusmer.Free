
import i18n from 'i18next';
import { initReactI18next } from 'react-i18next';
import {en,ara,Spa,Fr,tr} from '../../../Language';


i18n.use(initReactI18next).init({
  compatibilityJSON: 'v3',
  lng: 'tr',
  fallbackLng: 'tr',
  resources: {
    en: en,
    ara:ara,
    Fr:Fr,
    Spa:Spa,
    tr:tr
  },
  interpolation: {
    escapeValue: false // react already safes from xss
  }
});

export default i18n;