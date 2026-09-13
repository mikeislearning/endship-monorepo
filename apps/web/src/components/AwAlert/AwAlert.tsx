import { ComponentProps } from "react";

import { useTranslate } from "@/hooks/useTranslate";
import { ChildrenOrI18nType } from "@/utils/react";
import { cn } from "@/utils/tailwind";

import { alertVariants, AlertVariantType } from "./variants";

type AwAlertPropsType = ComponentProps<"div"> & AlertVariantType;

export const AwAlert = ({ className, variant, ...props }: AwAlertPropsType) => {
  return (
    <div
      data-slot="alert"
      role="alert"
      className={cn(alertVariants({ variant }), className)}
      {...props}
    />
  );
};

type AwAlertTitlePropsType = ComponentProps<"div"> & ChildrenOrI18nType;

export const AwAlertTitle = ({
  className,
  children,
  i18nKey,
  i18nOptions,
  ...props
}: AwAlertTitlePropsType) => {
  const i18nText = useTranslate(i18nKey, i18nOptions);

  return (
    <div
      data-slot="alert-title"
      className={cn(
        "font-heading font-medium group-has-[>svg]/alert:col-start-2 [&_a]:underline [&_a]:underline-offset-3 [&_a]:hover:text-foreground",
        className,
      )}
      {...props}>
      {children ?? i18nText}
    </div>
  );
};

type AwAlertDescriptionPropsType = ComponentProps<"div"> & ChildrenOrI18nType;

export const AwAlertDescription = ({
  className,
  children,
  i18nKey,
  i18nOptions,
  ...props
}: AwAlertDescriptionPropsType) => {
  const i18nText = useTranslate(i18nKey, i18nOptions);

  return (
    <div
      data-slot="alert-description"
      className={cn(
        "text-sm text-balance text-muted-foreground md:text-pretty [&_a]:underline [&_a]:underline-offset-3 [&_a]:hover:text-foreground [&_p:not(:last-child)]:mb-4",
        className,
      )}
      {...props}>
      {children ?? i18nText}
    </div>
  );
};

export const AwAlertAction = ({
  className,
  ...props
}: ComponentProps<"div">) => {
  return (
    <div
      data-slot="alert-action"
      className={cn("absolute top-2.5 right-3", className)}
      {...props}
    />
  );
};
