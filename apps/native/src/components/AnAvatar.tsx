import * as AvatarPrimitive from "@rn-primitives/avatar";

import { cn } from "@/utils/tailwind";

import { AnText } from "./AnText/AnText";

type AnAvatarPropsType = AvatarPrimitive.RootProps;

export const AnAvatar = ({ className, ...props }: AnAvatarPropsType) => {
  return (
    <AvatarPrimitive.Root
      className={cn(
        "relative flex size-8 shrink-0 overflow-hidden rounded-full",
        className,
      )}
      {...props}
    />
  );
};

type AnAvatarImagePropsType = AvatarPrimitive.ImageProps & {
  children?: never;
};

export const AnAvatarImage = ({
  className,
  ...props
}: AnAvatarImagePropsType) => {
  return (
    <AvatarPrimitive.Image
      className={cn("aspect-square size-full", className)}
      {...props}
    />
  );
};

type AnAvatarFallbackPropsType = AvatarPrimitive.FallbackProps;

export const AnAvatarFallback = ({
  className,
  children,
  ...props
}: AnAvatarFallbackPropsType) => {
  return (
    <AvatarPrimitive.Fallback
      className={cn(
        "bg-muted flex size-full flex-row items-center justify-center rounded-full",
        className,
      )}
      {...props}>
      <AnText variant="headerTwo">{children}</AnText>
    </AvatarPrimitive.Fallback>
  );
};
