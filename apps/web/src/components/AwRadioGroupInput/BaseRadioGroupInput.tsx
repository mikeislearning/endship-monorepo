import { Radio as RadioPrimitive } from "@base-ui/react/radio";
import { RadioGroup as RadioGroupPrimitive } from "@base-ui/react/radio-group";

import { cn } from "@/utils/tailwind";

export const BaseRadioGroup = ({
  className,
  ...props
}: RadioGroupPrimitive.Props) => {
  return (
    <RadioGroupPrimitive
      data-slot="radio-group"
      className={cn("grid gap-3", className)}
      {...props}
    />
  );
};

export const BaseRadioGroupItem = ({
  className,
  ...props
}: RadioPrimitive.Root.Props) => {
  return (
    <RadioPrimitive.Root
      data-slot="radio-group-item"
      className={cn(
        "group/radio-group-item peer relative flex aspect-square size-4 shrink-0 rounded-full border border-input outline-none after:absolute after:-inset-x-3 after:-inset-y-2 focus-visible:border-ring focus-visible:ring-3 focus-visible:ring-ring/50 disabled:cursor-not-allowed disabled:opacity-50 aria-invalid:border-destructive aria-invalid:ring-3 aria-invalid:ring-destructive/20 dark:bg-input/30 dark:aria-invalid:ring-destructive/40 data-checked:border-primary data-checked:bg-primary data-checked:text-primary-foreground aria-invalid:data-checked:border-primary dark:data-checked:bg-primary",
        className,
      )}
      {...props}>
      <RadioPrimitive.Indicator
        data-slot="radio-group-indicator"
        className="flex size-4 items-center justify-center">
        <span className="absolute top-1/2 left-1/2 size-2 -translate-x-1/2 -translate-y-1/2 rounded-full bg-primary-foreground" />
      </RadioPrimitive.Indicator>
    </RadioPrimitive.Root>
  );
};

export const BaseRadioGroupCardItem = ({
  className,
  ...props
}: RadioPrimitive.Root.Props) => {
  return (
    <RadioPrimitive.Root
      data-slot="radio-group-card-item"
      className={cn(
        "flex w-full cursor-pointer items-center justify-center rounded-md border-2 border-muted bg-muted px-3 py-1 text-center text-muted-foreground transition-colors dark:aria-invalid:ring-destructive/40 data-checked:border-border data-checked:bg-background data-checked:text-foreground",
        className,
      )}
      {...props}
    />
  );
};
