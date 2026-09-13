import { Toaster } from "sonner-native";

import { useAppTheme } from "@/hooks/useAppTheme";
import { usePlatformOS } from "@/hooks/usePlatformOS";

export const AnToaster = () => {
  const { theme, resolvedColors } = useAppTheme();
  const { isWeb } = usePlatformOS();

  return (
    <Toaster
      position="top-center"
      duration={3000}
      theme={theme}
      closeButton
      style={{
        backgroundColor: resolvedColors.background,
        borderColor: resolvedColors.border,
        borderWidth: 1,
        width: isWeb ? 356 : undefined,
        marginHorizontal: isWeb ? "auto" : 32,
      }}
    />
  );
};
