import { createContext } from "react";

import { palette } from "@/theme/palette";

export type ColorSchemeType = "light" | "dark" | "system";

type ColorsType = typeof palette.light;
type ThemeType = Exclude<ColorSchemeType, "system">;

type ThemeContextType = {
  theme: ColorSchemeType;
  resolvedColors: ColorsType;
  resolvedTheme: ThemeType;
  setTheme: (value: ThemeType) => void;
  isDarkMode: boolean;
};

export const ThemeContext = createContext<ThemeContextType>({
  theme: "system",
  resolvedColors: palette.light,
  resolvedTheme: "light",
  isDarkMode: false,
  // eslint-disable-next-line @typescript-eslint/no-empty-function
  setTheme: () => {},
});
