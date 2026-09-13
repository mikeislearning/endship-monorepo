import * as CheckboxPrimitive from "@rn-primitives/checkbox";
import { CheckIcon } from "lucide-react-native";
import { Platform } from "react-native";

import { cn } from "@/utils/tailwind";

import { AnIcon } from "../AnIcon";

const DEFAULT_HIT_SLOP = 24;

type BaseCheckboxInputPropsType = CheckboxPrimitive.RootProps & {
  checkedClassName?: string;
  indicatorClassName?: string;
  iconClassName?: string;
};

export const BaseCheckboxInput = ({
  className,
  checkedClassName,
  indicatorClassName,
  iconClassName,
  ...props
}: BaseCheckboxInputPropsType) => {
  return (
    <CheckboxPrimitive.Root
      className={cn(
        "dark:bg-background/50 border-input size-4 shrink-0 rounded-[4px] border shadow-sm shadow-black/5",
        Platform.select({
          web: "focus-visible:ring-ring/50 aria-invalid:ring-destructive/20 dark:aria-invalid:ring-destructive/40 aria-invalid:border-destructive focus-visible:border-ring peer cursor-default outline-none transition-shadow focus-visible:ring-[3px] disabled:cursor-not-allowed",
          native: "overflow-hidden",
        }),
        props.checked && cn("border-primary", checkedClassName),
        props.disabled && "opacity-50",
        className,
      )}
      hitSlop={DEFAULT_HIT_SLOP}
      {...props}>
      <CheckboxPrimitive.Indicator
        className={cn(
          "bg-primary h-full w-full items-center justify-center",
          indicatorClassName,
        )}>
        <AnIcon
          as={CheckIcon}
          size={12}
          strokeWidth={Platform.OS === "web" ? 2.5 : 3.5}
          className={cn("text-primary-foreground", iconClassName)}
        />
      </CheckboxPrimitive.Indicator>
    </CheckboxPrimitive.Root>
  );
};
