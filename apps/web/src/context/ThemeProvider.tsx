import { ReactNode, useEffect, useState } from "react";

import { ThemeContext, ThemeType } from "./ThemeContext";

type ThemeProviderPropsType = {
  children: ReactNode;
  defaultTheme?: ThemeType;
  storageKey?: string;
};

export const ThemeProvider = ({
  children,
  defaultTheme = "system",
  storageKey = "vite-ui-theme",
  ...props
}: ThemeProviderPropsType) => {
  const [theme, setTheme] = useState<ThemeType>(
    () => (localStorage.getItem(storageKey) as ThemeType) || defaultTheme,
  );

  useEffect(() => {
    const root = window.document.documentElement;

    root.classList.remove("light", "dark");

    if (theme === "system") {
      const systemTheme = window.matchMedia("(prefers-color-scheme: dark)")
        .matches
        ? "dark"
        : "light";

      root.classList.add(systemTheme);
      return;
    }

    root.classList.add(theme);
  }, [theme]);

  const isDarkMode = (() => {
    switch (theme) {
      case "dark":
        return true;
      case "light":
        return false;
      case "system":
        return window.matchMedia("(prefers-color-scheme: dark)").matches;
      default:
        return false;
    }
  })();

  const value = {
    theme,
    isDarkMode,
    setTheme: (theme: ThemeType) => {
      localStorage.setItem(storageKey, theme);
      setTheme(theme);
    },
  };

  return (
    <ThemeContext.Provider {...props} value={value}>
      {children}
    </ThemeContext.Provider>
  );
};
