import { createContext } from "react";

export type ThemeType = "dark" | "light" | "system";

type ThemeContextType = {
  theme: ThemeType;
  isDarkMode: boolean;
  setTheme: (theme: ThemeType) => void;
};

const initialState: ThemeContextType = {
  theme: "system",
  isDarkMode: window.matchMedia("(prefers-color-scheme: dark)").matches,
  setTheme: () => null,
};

export const ThemeContext = createContext<ThemeContextType>(initialState);
