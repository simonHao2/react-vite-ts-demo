import i18n from 'i18next';
import detector from 'i18next-browser-languagedetector';
import { initReactI18next } from 'react-i18next';
import en from "./locals/en";
import sc from './locals/sc';
import zh from './locals/zh';

const resources = {
    eng: {
        translation: en
    },
    cns: {
        translation: sc
    },
    zh: {
        translation: zh
    }
}

const language = localStorage.getItem("I18N_LANGUAGE");
let initLanguage;
if (language) {
    initLanguage = language;
} else {
    initLanguage = "eng";
}

i18n.use(detector)
    .use(initReactI18next) // passes i18n down to react-i18next
    .init({
        resources, //Resources to initialize with (if not using loading or not appending using addResourceBundle)
        fallbackLng: 'eng',//Language to use if translations in user language are not available.
        lng: initLanguage,// Language to use (overrides language detection),
        interpolation: {
            escapeValue: false,
        },
    });
export default i18n;