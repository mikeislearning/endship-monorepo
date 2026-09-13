import { createMMKV, type MMKV } from "react-native-mmkv";

/**
 * Storage utilities for MMKV-based persistent storage.
 *
 * IMPORTANT USAGE GUIDELINES:
 * 1. DO NOT change function parameters from `string` to `StorageKeyType`
 *    Keep getItem, setItem, removeItem, and subscribe using `key: string`
 *    Changing to StorageKeyType will break atoms.ts type inference
 *
 * 2. DO NOT use getItem, setItem, removeItem directly in your code
 *    Instead, use atomWithMMKV() helper from stores/atoms.ts for reactive state management
 */

export type StorageKeyType = "LANGUAGE_CODE" | "SELECTED_THEME" | "AUTH_TOKEN";

export const storage: MMKV = createMMKV({
  id: "monorepo-template", // Mostly, prevents data collision with other projects during local environment
});

export const getItem = <T>(key: string): T | null => {
  if (typeof window === "undefined") {
    return null;
  }

  const value = storage.getString(key);
  return value ? (JSON.parse(value) as T) : null;
};

export const setItem = <T>(key: string, value: T) => {
  if (typeof window === "undefined") {
    return null;
  }
  storage.set(key, JSON.stringify(value));
};

export const removeItem = (key: string) => {
  if (typeof window === "undefined") {
    return null;
  }
  storage.remove(key);
};

export const subscribe = (
  key: string,
  callback: (value: string | null) => void,
): (() => void) => {
  if (typeof window === "undefined") {
    // eslint-disable-next-line @typescript-eslint/no-empty-function
    return () => {};
  }

  const listener = (changedKey: string) => {
    if (changedKey === key) {
      callback(getItem(key));
    }
  };

  const { remove } = storage.addOnValueChangedListener(listener);

  return () => {
    remove();
  };
};
