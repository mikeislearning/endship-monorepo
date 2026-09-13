import { MoonIcon, SunIcon } from "lucide-react";

import { AwButton } from "@/components/AwButton/AwButton";
import { useTheme } from "@/hooks/useTheme";

export const ModeSwitcher = () => {
  const { setTheme, theme } = useTheme();

  const toggleTheme = () => {
    setTheme(theme === "dark" ? "light" : "dark");
  };

  return (
    <AwButton
      variant="outline"
      size="icon"
      className="group/toggle size-8"
      onClick={toggleTheme}>
      <SunIcon className="hidden [html.dark_&]:block" />
      <MoonIcon className="hidden [html.light_&]:block" />
    </AwButton>
  );
};
