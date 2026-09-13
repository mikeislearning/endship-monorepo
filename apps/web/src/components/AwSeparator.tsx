import { Separator as SeparatorPrimitive } from "@base-ui/react/separator";

import { cn } from "@/utils/tailwind";

export const AwSeparator = ({
  className,
  orientation = "horizontal",
  ...props
}: SeparatorPrimitive.Props) => {
  return (
    <SeparatorPrimitive
      data-slot="separator-root"
      orientation={orientation}
      className={cn(
        "shrink-0 bg-border data-horizontal:h-px data-horizontal:w-full data-vertical:w-px data-vertical:self-stretch",
        className,
      )}
      {...props}
    />
  );
};
