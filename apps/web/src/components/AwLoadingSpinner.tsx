import { ComponentProps } from "react";

import { cn } from "@/utils/tailwind";

export const AwLoadingSpinner = ({
  className,
  ...props
}: ComponentProps<"div">) => {
  return (
    <div
      className={cn(
        "h-8 w-8 animate-spin rounded-full border-2 border-t-2 border-zinc-200 border-t-zinc-600 dark:border-zinc-600 dark:border-t-zinc-200",
        className,
      )}
      {...props}
    />
  );
};
