import { ComponentProps } from "react";
import { mergeProps } from "@base-ui/react/merge-props";
import { useRender } from "@base-ui/react/use-render";
import { type VariantProps } from "class-variance-authority";

import { useTranslate } from "@/hooks/useTranslate";
import { ChildrenOrI18nType } from "@/utils/react";
import { cn } from "@/utils/tailwind";

import { AwSeparator } from "../AwSeparator";
import { itemMediaVariants, itemVariants } from "./variants";

export const AwItemGroup = ({ className, ...props }: ComponentProps<"div">) => {
  return (
    <div
      role="list"
      data-slot="item-group"
      className={cn(
        "group/item-group flex w-full flex-col gap-4 has-data-[size=sm]:gap-2.5 has-data-[size=xs]:gap-2",
        className,
      )}
      {...props}
    />
  );
};

export const AwItemSeparator = ({
  className,
  ...props
}: ComponentProps<typeof AwSeparator>) => {
  return (
    <AwSeparator
      data-slot="item-separator"
      orientation="horizontal"
      className={cn("my-2", className)}
      {...props}
    />
  );
};

type AwItemPropsType = useRender.ComponentProps<"div"> &
  VariantProps<typeof itemVariants>;

export const AwItem = ({
  className,
  variant = "default",
  size = "default",
  render,
  ...props
}: AwItemPropsType) => {
  return useRender({
    defaultTagName: "div",
    props: mergeProps<"div">(
      {
        className: cn(itemVariants({ variant, size, className })),
      },
      props,
    ),
    render,
    state: {
      slot: "item",
      variant,
      size,
    },
  });
};

export const AwItemMedia = ({
  className,
  variant = "default",
  ...props
}: ComponentProps<"div"> & VariantProps<typeof itemMediaVariants>) => {
  return (
    <div
      data-slot="item-media"
      data-variant={variant}
      className={cn(itemMediaVariants({ variant, className }))}
      {...props}
    />
  );
};

export const AwItemContent = ({
  className,
  ...props
}: ComponentProps<"div">) => {
  return (
    <div
      data-slot="item-content"
      className={cn(
        "flex flex-1 flex-col gap-1 group-data-[size=xs]/item:gap-0 [&+[data-slot=item-content]]:flex-none",
        className,
      )}
      {...props}
    />
  );
};

type AwItemTitlePropsType = ComponentProps<"div"> & ChildrenOrI18nType;

export const AwItemTitle = ({
  className,
  children,
  i18nKey,
  i18nOptions,
  ...props
}: AwItemTitlePropsType) => {
  const i18nText = useTranslate(i18nKey, i18nOptions);

  return (
    <div
      data-slot="item-title"
      className={cn(
        "line-clamp-1 flex w-fit items-center gap-2 font-heading text-sm leading-snug font-medium underline-offset-4",
        className,
      )}
      {...props}>
      {children ?? i18nText}
    </div>
  );
};

type AwItemDescriptionPropsType = ComponentProps<"p"> & ChildrenOrI18nType;

export const AwItemDescription = ({
  className,
  children,
  i18nKey,
  i18nOptions,
  ...props
}: AwItemDescriptionPropsType) => {
  const i18nText = useTranslate(i18nKey, i18nOptions);

  return (
    <p
      data-slot="item-description"
      className={cn(
        "line-clamp-2 text-left text-sm leading-normal font-normal text-muted-foreground group-data-[size=xs]/item:text-xs [&>a]:underline [&>a]:underline-offset-4 [&>a:hover]:text-primary",
        className,
      )}
      {...props}>
      {children ?? i18nText}
    </p>
  );
};

export const AwItemActions = ({
  className,
  ...props
}: ComponentProps<"div">) => {
  return (
    <div
      data-slot="item-actions"
      className={cn("flex items-center gap-2", className)}
      {...props}
    />
  );
};

export const AwItemHeader = ({
  className,
  ...props
}: ComponentProps<"div">) => {
  return (
    <div
      data-slot="item-header"
      className={cn(
        "flex basis-full items-center justify-between gap-2",
        className,
      )}
      {...props}
    />
  );
};

export const AwItemFooter = ({
  className,
  ...props
}: ComponentProps<"div">) => {
  return (
    <div
      data-slot="item-footer"
      className={cn(
        "flex basis-full items-center justify-between gap-2",
        className,
      )}
      {...props}
    />
  );
};
