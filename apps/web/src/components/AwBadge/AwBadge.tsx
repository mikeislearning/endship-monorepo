import { mergeProps, useRender } from "@base-ui/react";
import { type VariantProps } from "class-variance-authority";

import { useTranslate } from "@/hooks/useTranslate";
import { ChildrenOrI18nType } from "@/utils/react";
import { cn } from "@/utils/tailwind";

import { badgeVariants } from "./variants";

type AwBadgePropsType = useRender.ComponentProps<"span"> &
  VariantProps<typeof badgeVariants> &
  ChildrenOrI18nType;

export const AwBadge = ({
  className,
  variant = "default",
  render,
  children,
  i18nKey,
  i18nOptions,
  ...props
}: AwBadgePropsType) => {
  const i18nText = useTranslate(i18nKey, i18nOptions);

  return useRender({
    defaultTagName: "span",
    props: mergeProps<"span">(
      {
        className: cn(badgeVariants({ variant }), className),
        children: children ?? i18nText,
      },
      props,
    ),
    render,
    state: {
      slot: "badge",
      variant,
    },
  });
};
