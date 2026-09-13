import { AwText } from "@/components/AwText/AwText";
import { useTheme } from "@/hooks/useTheme";

import { THEME_COLORS } from "../helpers";

export const ThemeDemo = () => {
  // Re-reads computed styles whenever theme changes (useTheme causes re-render on change)
  useTheme();
  const style = getComputedStyle(document.body);

  return (
    <div className="@container grid grid-cols-4 gap-x-2 gap-y-8 p-4">
      {THEME_COLORS.map(name => (
        <div key={name} className="flex flex-col items-center gap-2">
          <div
            className="size-12 rounded-full border shadow-md"
            style={{
              backgroundColor: `var(--${name})`,
            }}
          />
          <div className="flex flex-col items-center justify-center text-center">
            <AwText className="opacity-70" variant="mdMedium">
              {name}
            </AwText>
            <AwText className="font-mono text-muted-foreground">
              {style.getPropertyValue(`--${name}`)}
            </AwText>
          </div>
        </div>
      ))}
    </div>
  );
};
