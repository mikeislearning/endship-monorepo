import { ReactNode, useEffect } from "react";
import {
  DarkTheme,
  ThemeProvider as NavigationThemeProvider,
} from "expo-router/react-navigation";
import { StatusBar } from "expo-status-bar";
import { colorScheme, useColorScheme } from "nativewind";
import { Appearance } from "react-native";
import { useMMKVString } from "react-native-mmkv";

import { AnBox } from "@/components/AnBox";
import { usePlatformOS } from "@/hooks/usePlatformOS";
import { palette } from "@/theme/palette";
import { THEME_VARS } from "@/theme/theme";
import { storage, type StorageKeyType } from "@/utils/storage";

import { ThemeContext } from "./ThemeContext";

const SELECTED_THEME: StorageKeyType = "SELECTED_THEME";

export type ColorSchemeType = "light" | "dark" | "system";

type ThemeProviderType = {
  children: ReactNode;
};

type ThemeType = Exclude<ColorSchemeType, "system">;

export const ThemeProvider = ({ children }: ThemeProviderType) => {
  const { colorScheme: systemColorScheme } = useColorScheme(); // from device
  const [storedTheme, setStoredTheme] = useMMKVString(SELECTED_THEME, storage);
  const { isNative, isWeb } = usePlatformOS();

  const theme = (storedTheme ?? "system") as ColorSchemeType;

  const resolvedTheme =
    theme === "system" ? (systemColorScheme ?? "light") : theme;

  const resolvedColors = palette[resolvedTheme];

  useEffect(() => {
    const initTheme = storedTheme ?? "light";

    if (!storedTheme) {
      setStoredTheme(initTheme);
    }

    colorScheme.set(initTheme as ThemeType);
  }, [storedTheme, setStoredTheme]);

  const setTheme = (t: ThemeType) => {
    if (isNative) {
      Appearance.setColorScheme(t);
    }

    setStoredTheme(t);
  };

  const isDarkMode = resolvedTheme === "dark";

  useEffect(() => {
    // Update web body classes when dark mode changes
    if (isWeb && typeof document !== "undefined") {
      if (isDarkMode) {
        document.body.classList.add("dark");
      } else {
        document.body.classList.remove("dark");
      }
    }
  }, [isDarkMode, isWeb]);

  return (
    <ThemeContext.Provider
      value={{
        theme,
        resolvedTheme,
        setTheme,
        resolvedColors,
        isDarkMode,
      }}>
      <NavigationThemeProvider
        value={{
          ...DarkTheme,
          dark: isDarkMode,
          colors: {
            primary: resolvedColors.primary,
            background: resolvedColors.background,
            card: resolvedColors.card,
            text: resolvedColors.foreground,
            border: resolvedColors.border,
            notification: resolvedColors.destructive,
          },
        }}>
        <StatusBar style={isDarkMode ? "light" : "dark"} />
        <AnBox style={THEME_VARS[resolvedTheme]} className="flex-1">
          {children}
        </AnBox>
      </NavigationThemeProvider>
    </ThemeContext.Provider>
  );
};
