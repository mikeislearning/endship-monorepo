import { ComponentProps } from "react";
import { View } from "react-native";

import { cn } from "@/utils/tailwind";

import { AnBox } from "./AnBox";

type AnSkeletonPropsType = ComponentProps<typeof View>;

export const AnSkeleton = ({ className, ...props }: AnSkeletonPropsType) => {
  return (
    <AnBox
      className={cn("bg-accent animate-pulse rounded-md", className)}
      {...props}
    />
  );
};
