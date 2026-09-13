import { ComponentProps } from "react";

import { cn } from "@/utils/tailwind";

export const AwSkeleton = ({ className, ...props }: ComponentProps<"div">) => {
  return (
    <div
      data-slot="skeleton"
      className={cn("animate-pulse rounded-md bg-muted", className)}
      {...props}
    />
  );
};
