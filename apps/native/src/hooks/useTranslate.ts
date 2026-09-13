import { useTranslation } from "react-i18next";

import { i18n, I18nKeyType } from "../i18n/index";

export const useTranslator = () =>
  useTranslation(["native", "common", "sandbox"]);

export const useTranslate = (key?: I18nKeyType, options = {}) => {
  const { t } = useTranslator();

  return key ? t(key, { i18n, ...options }) : undefined;
};
