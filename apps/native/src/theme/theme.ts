import { vars } from "nativewind";

import { hexToRgbString } from "./colorUtils";
import { palette } from "./palette";

export const THEME_VARS = {
  light: vars({
    "--color-accent": hexToRgbString(palette.light.accent),
    "--color-accent-foreground": hexToRgbString(palette.light.accentForeground),
    "--color-background": hexToRgbString(palette.light.background),
    "--color-border": hexToRgbString(palette.light.border),
    "--color-card": hexToRgbString(palette.light.card),
    "--color-card-foreground": hexToRgbString(palette.light.cardForeground),
    "--color-chart-1": hexToRgbString(palette.light.chartOne),
    "--color-chart-2": hexToRgbString(palette.light.chartTwo),
    "--color-chart-3": hexToRgbString(palette.light.chartThree),
    "--color-chart-4": hexToRgbString(palette.light.chartFour),
    "--color-chart-5": hexToRgbString(palette.light.chartFive),
    "--color-destructive": hexToRgbString(palette.light.destructive),
    "--color-destructive-foreground": hexToRgbString(
      palette.light.destructiveForeground,
    ),
    "--color-foreground": hexToRgbString(palette.light.foreground),
    "--color-input": hexToRgbString(palette.light.input),
    "--color-muted": hexToRgbString(palette.light.muted),
    "--color-muted-foreground": hexToRgbString(palette.light.mutedForeground),
    "--color-popover": hexToRgbString(palette.light.popover),
    "--color-popover-foreground": hexToRgbString(
      palette.light.popoverForeground,
    ),
    "--color-primary": hexToRgbString(palette.light.primary),
    "--color-primary-foreground": hexToRgbString(
      palette.light.primaryForeground,
    ),
    "--color-ring": hexToRgbString(palette.light.ring),
    "--color-secondary": hexToRgbString(palette.light.secondary),
    "--color-secondary-foreground": hexToRgbString(
      palette.light.secondaryForeground,
    ),
    "--color-sidebar": hexToRgbString(palette.light.sidebar),
    "--color-sidebar-accent": hexToRgbString(palette.light.sidebarAccent),
    "--color-sidebar-accent-foreground": hexToRgbString(
      palette.light.sidebarAccentForeground,
    ),
    "--color-sidebar-border": hexToRgbString(palette.light.sidebarBorder),
    "--color-sidebar-foreground": hexToRgbString(
      palette.light.sidebarForeground,
    ),
    "--color-sidebar-primary": hexToRgbString(palette.light.sidebarPrimary),
    "--color-sidebar-primary-foreground": hexToRgbString(
      palette.light.sidebarPrimaryForeground,
    ),
    "--color-sidebar-ring": hexToRgbString(palette.light.sidebarRing),
  }),
  dark: vars({
    "--color-accent": hexToRgbString(palette.dark.accent),
    "--color-accent-foreground": hexToRgbString(palette.dark.accentForeground),
    "--color-background": hexToRgbString(palette.dark.background),
    "--color-border": hexToRgbString(palette.dark.border),
    "--color-card": hexToRgbString(palette.dark.card),
    "--color-card-foreground": hexToRgbString(palette.dark.cardForeground),
    "--color-chart-1": hexToRgbString(palette.dark.chartOne),
    "--color-chart-2": hexToRgbString(palette.dark.chartTwo),
    "--color-chart-3": hexToRgbString(palette.dark.chartThree),
    "--color-chart-4": hexToRgbString(palette.dark.chartFour),
    "--color-chart-5": hexToRgbString(palette.dark.chartFive),
    "--color-destructive": hexToRgbString(palette.dark.destructive),
    "--color-destructive-foreground": hexToRgbString(
      palette.dark.destructiveForeground,
    ),
    "--color-foreground": hexToRgbString(palette.dark.foreground),
    "--color-input": hexToRgbString(palette.dark.input),
    "--color-muted": hexToRgbString(palette.dark.muted),
    "--color-muted-foreground": hexToRgbString(palette.dark.mutedForeground),
    "--color-popover": hexToRgbString(palette.dark.popover),
    "--color-popover-foreground": hexToRgbString(
      palette.dark.popoverForeground,
    ),
    "--color-primary": hexToRgbString(palette.dark.primary),
    "--color-primary-foreground": hexToRgbString(
      palette.dark.primaryForeground,
    ),
    "--color-ring": hexToRgbString(palette.dark.ring),
    "--color-secondary": hexToRgbString(palette.dark.secondary),
    "--color-secondary-foreground": hexToRgbString(
      palette.dark.secondaryForeground,
    ),
    "--color-sidebar": hexToRgbString(palette.dark.sidebar),
    "--color-sidebar-accent": hexToRgbString(palette.dark.sidebarAccent),
    "--color-sidebar-accent-foreground": hexToRgbString(
      palette.dark.sidebarAccentForeground,
    ),
    "--color-sidebar-border": hexToRgbString(palette.dark.sidebarBorder),
    "--color-sidebar-foreground": hexToRgbString(
      palette.dark.sidebarForeground,
    ),
    "--color-sidebar-primary": hexToRgbString(palette.dark.sidebarPrimary),
    "--color-sidebar-primary-foreground": hexToRgbString(
      palette.dark.sidebarPrimaryForeground,
    ),
    "--color-sidebar-ring": hexToRgbString(palette.dark.sidebarRing),
  }),
};
