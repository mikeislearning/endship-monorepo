import { Toggle as TogglePrimitive } from "@base-ui/react/toggle";

import { cn } from "@/utils/tailwind";

import { toggleVariants, ToggleVariantType } from "./variants";

type AwTogglePropsType = TogglePrimitive.Props & ToggleVariantType;

export const AwToggle = ({
  className,
  variant,
  size,
  ...props
}: AwTogglePropsType) => {
  return (
    <TogglePrimitive
      data-slot="toggle"
      className={cn(toggleVariants({ variant, size, className }))}
      {...props}
    />
  );
};
