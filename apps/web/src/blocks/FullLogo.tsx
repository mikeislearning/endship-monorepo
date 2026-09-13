import FullLogoDarkMode from "@/assets/images/full_logo_dark_mode.svg?react";
import FullLogoLightMode from "@/assets/images/full_logo_light_mode.svg?react";
import { useTheme } from "@/hooks/useTheme";

type FullLogoPropsType = {
  className?: string;
};

export const FullLogo = ({ className }: FullLogoPropsType) => {
  const { isDarkMode } = useTheme();

  const Logo = isDarkMode ? FullLogoDarkMode : FullLogoLightMode;

  return <Logo className={className} />;
};
