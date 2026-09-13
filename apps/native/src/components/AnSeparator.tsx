import * as SeparatorPrimitive from "@rn-primitives/separator";

import { cn } from "@/utils/tailwind";

type AnSeperatorPropsType = SeparatorPrimitive.RootProps;

export const AnSeparator = ({
  className,
  orientation = "horizontal",
  decorative = true,
  ...props
}: AnSeperatorPropsType) => {
  return (
    <SeparatorPrimitive.Root
      decorative={decorative}
      orientation={orientation}
      className={cn(
        "bg-border shrink-0",
        orientation === "horizontal" ? "h-[1px] w-full" : "h-full w-[1px]",
        className,
      )}
      {...props}
    />
  );
};
