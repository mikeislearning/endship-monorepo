import { MoonIcon, SunIcon } from "lucide-react-native";

import { AnBox } from "@/components/AnBox";
import { AnButton } from "@/components/AnButton/AnButton";
import { AnIcon } from "@/components/AnIcon";
import { useAppTheme } from "@/hooks/useAppTheme";

export const ThemeToggle = () => {
  const { theme, setTheme, isDarkMode } = useAppTheme();

  const toggleTheme = () => {
    setTheme(theme === "dark" ? "light" : "dark");
  };

  return (
    <AnButton
      size="icon"
      variant="ghost"
      onPressIn={toggleTheme}
      className="web:focus-visible:ring-3 native:-mt-1 web:ring-offset-background web:transition-colors web:focus-visible:outline-none web:focus-visible:ring-ring active:opacity-70">
      <AnBox className="flex-1 items-center justify-center">
        <AnIcon as={isDarkMode ? MoonIcon : SunIcon} className="size-5" />
      </AnBox>
    </AnButton>
  );
};
