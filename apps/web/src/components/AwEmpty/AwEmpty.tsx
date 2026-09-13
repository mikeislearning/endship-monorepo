import { ComponentProps } from "react";
import { type VariantProps } from "class-variance-authority";

import { useTranslate } from "@/hooks/useTranslate";
import { ChildrenOrI18nType } from "@/utils/react";
import { cn } from "@/utils/tailwind";

import { emptyMediaVariants } from "./variants";

export const AwEmpty = ({ className, ...props }: ComponentProps<"div">) => {
  return (
    <div
      data-slot="empty"
      className={cn(
        "flex w-full min-w-0 flex-1 flex-col items-center justify-center gap-4 rounded-lg border-dashed p-12 text-center text-balance",
        className,
      )}
      {...props}
    />
  );
};

export const AwEmptyHeader = ({
  className,
  ...props
}: ComponentProps<"div">) => {
  return (
    <div
      data-slot="empty-header"
      className={cn("flex max-w-sm flex-col items-center gap-2", className)}
      {...props}
    />
  );
};

type AwEmptyMediaPropsType = ComponentProps<"div"> &
  VariantProps<typeof emptyMediaVariants>;

export const AwEmptyMedia = ({
  className,
  variant = "default",
  ...props
}: AwEmptyMediaPropsType) => {
  return (
    <div
      data-slot="empty-icon"
      data-variant={variant}
      className={cn(emptyMediaVariants({ variant, className }))}
      {...props}
    />
  );
};

type AwEmptyTitlePropsType = ComponentProps<"div"> & ChildrenOrI18nType;

export const AwEmptyTitle = ({
  className,
  children,
  i18nKey,
  i18nOptions,
  ...props
}: AwEmptyTitlePropsType) => {
  const i18nText = useTranslate(i18nKey, i18nOptions);

  return (
    <div
      data-slot="empty-title"
      className={cn(
        "font-heading text-lg font-medium tracking-tight",
        className,
      )}
      {...props}>
      {children ?? i18nText}
    </div>
  );
};

type AwEmptyDescriptionPropsType = ComponentProps<"p"> & ChildrenOrI18nType;

export const AwEmptyDescription = ({
  className,
  children,
  i18nKey,
  i18nOptions,
  ...props
}: AwEmptyDescriptionPropsType) => {
  const i18nText = useTranslate(i18nKey, i18nOptions);

  return (
    <div
      data-slot="empty-description"
      className={cn(
        "text-sm/relaxed text-muted-foreground [&>a]:underline [&>a]:underline-offset-4 [&>a:hover]:text-primary",
        className,
      )}
      {...props}>
      {children ?? i18nText}
    </div>
  );
};

export const AwEmptyContent = ({
  className,
  ...props
}: ComponentProps<"div">) => {
  return (
    <div
      data-slot="empty-content"
      className={cn(
        "flex w-full max-w-sm min-w-0 flex-col items-center gap-4 text-sm text-balance",
        className,
      )}
      {...props}
    />
  );
};
