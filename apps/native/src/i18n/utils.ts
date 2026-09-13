import { changeLanguage } from "i18next";
import { NativeModules, Platform } from "react-native";

import { LanguageType } from "@libs/i18n";
import { getItem } from "@/utils/storage";

// Get the current language from storage or default to 'en'
// String replacement is to fix issue with escaped quotes
export const getLanguage = () =>
  getItem<string>("LANGUAGE_CODE")?.replace(/\\"|"/g, "") ?? "en";

export const changeI18nLanguage = async (lang: LanguageType) => {
  void changeLanguage(lang);

  if (Platform.OS === "ios" || Platform.OS === "android") {
    const RNRestart = await import("react-native-restart-newarch");
    if (__DEV__) {
      // Type assertion to ensure DevSettings is properly typed with the reload method
      const devSettings = NativeModules.DevSettings as
        { reload: () => void } | undefined;
      devSettings?.reload();
    } else RNRestart.restart();
  } else if (Platform.OS === "web") {
    window.location.reload();
  }
};
