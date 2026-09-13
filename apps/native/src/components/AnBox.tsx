import { View, ViewProps } from "react-native";

import { useAppTheme } from "@/hooks/useAppTheme";
import { THEME_VARS } from "@/theme/theme";

export const AnBox = (props: ViewProps) => {
  return <View {...props} />;
};

export const AnThemedBox = (props: ViewProps) => {
  const { resolvedTheme } = useAppTheme();

  return <AnBox style={THEME_VARS[resolvedTheme]} {...props} />;
};
