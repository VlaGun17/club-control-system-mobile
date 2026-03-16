import i18n from "i18next";
import { initReactI18next } from "react-i18next";
import en from "./locales/en.json";
import ua from "./locales/ua.json";

i18n.use(initReactI18next).init({
  compatibilityJSON: "v4",
  resources: {
    ua: { translation: ua },
    en: { translation: en },
  },
  lng: "ua",
  fallbackLng: "en",
  interpolation: { escapeValue: false },
});

export default i18n;
