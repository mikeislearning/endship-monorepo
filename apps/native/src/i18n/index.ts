import "intl-pluralrules";

import { ReactNode } from "react";
import * as i18n from "i18next";
import { initReactI18next } from "react-i18next";

import { NativeI18nKeyType, nativeI18nResources } from "@libs/i18n";

import { getLanguage } from "./utils";

export const defaultNS = "native";

void i18n.use(initReactI18next).init({
  lng: getLanguage(),
  fallbackLng: "en",
  debug: false,
  ns: ["native", "common"], // 'sandbox' will only be loaded when needed
  defaultNS,
  resources: nativeI18nResources,
  compatibilityJSON: "v4",
  interpolation: { escapeValue: false },
});

// Manually add the namespaces prefix to fix types
export type I18nKeyType = NativeI18nKeyType;

export type ChildrenOrI18nType =
  | { children?: never; i18nKey: I18nKeyType; i18nOptions?: object }
  | { children: ReactNode; i18nKey?: never; i18nOptions?: never };

export { i18n };
