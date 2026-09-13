import { CSSProperties } from "react";
import { Toaster as Sonner, ToasterProps } from "sonner";

import { useTheme } from "@/hooks/useTheme";

export const AwToaster = ({ ...props }: ToasterProps) => {
  const { theme = "system" } = useTheme();

  return (
    <Sonner
      position="top-right"
      theme={theme}
      className="toaster group pointer-events-auto"
      style={
        {
          "--normal-bg": "var(--popover)",
          "--normal-text": "var(--popover-foreground)",
          "--normal-border": "var(--border)",
        } as CSSProperties
      }
      {...props}
    />
  );
};
