import { getLocales } from "expo-localization";
import { atomWithStorage, createJSONStorage } from "jotai/utils";

import { LanguageType } from "@libs/i18n";
import {
  getItem,
  removeItem,
  setItem,
  StorageKeyType,
  subscribe,
} from "@/utils/storage";

export const atomWithMMKV = <T>(key: StorageKeyType, initialValue: T) =>
  atomWithStorage<T>(
    key,
    initialValue,
    createJSONStorage<T>(() => ({
      getItem,
      setItem,
      removeItem,
      subscribe,
    })),
    { getOnInit: true },
  );

// Settings Atoms (Get default values from device locale)
const DEVICE_LOCALE = getLocales()[0];

export const localeAtom = atomWithMMKV<LanguageType>(
  "LANGUAGE_CODE",
  (DEVICE_LOCALE?.languageCode ?? "en") as LanguageType,
);
