import i18n from "i18next";
import { initReactI18next } from "react-i18next";

import { WebI18nKeyType, webI18nResources } from "@libs/i18n";

export const initI18n = () => {
  void i18n.use(initReactI18next).init({
    lng: "en",
    fallbackLng: "en",
    debug: false,
    ns: ["web", "common"], // 'sandbox' will only be loaded when needed
    resources: webI18nResources,
    compatibilityJSON: "v4",
    interpolation: {
      escapeValue: false,
    },
  });
};

export type I18nKeyType = WebI18nKeyType;

export { i18n };
