import * as SwitchPrimitives from "@rn-primitives/switch";
import { Platform } from "react-native";

import { cn } from "@/utils/tailwind";

export type BaseSwitchInputPropsType = SwitchPrimitives.RootProps;

export const BaseSwitchInput = ({
  className,
  ...props
}: BaseSwitchInputPropsType) => {
  return (
    <SwitchPrimitives.Root
      className={cn(
        "flex h-[1.15rem] w-8 shrink-0 flex-row items-center rounded-full border border-transparent shadow-sm shadow-black/5",
        Platform.select({
          web: "focus-visible:ring-ring/50 focus-visible:border-ring peer inline-flex outline-none transition-all focus-visible:ring-[3px] disabled:cursor-not-allowed",
        }),
        props.checked ? "bg-primary" : "dark:bg-input/30 bg-input",
        props.disabled && "opacity-50",
        className,
      )}
      {...props}>
      <SwitchPrimitives.Thumb
        className={cn(
          "bg-background size-4 rounded-full transition-transform",
          Platform.select({
            web: "pointer-events-none block ring-0",
          }),
          props.checked
            ? "dark:bg-primary-foreground translate-x-3.5"
            : "dark:bg-foreground translate-x-0",
        )}
      />
    </SwitchPrimitives.Root>
  );
};
