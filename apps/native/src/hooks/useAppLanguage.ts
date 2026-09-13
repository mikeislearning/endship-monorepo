import { useAtom } from "jotai/react";

import { LanguageType } from "@libs/i18n";
import { changeI18nLanguage } from "@/i18n/utils";
import { localeAtom } from "@/stores/atoms";

export const useAppLanguage = () => {
  const [storedLanguage, setStoredLanguage] = useAtom(localeAtom);

  const setLanguage = (lang: LanguageType) => {
    setStoredLanguage(lang);
    void changeI18nLanguage(lang);
  };

  return { language: storedLanguage, setLanguage };
};
