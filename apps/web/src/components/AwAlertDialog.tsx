import { ComponentProps } from "react";
import { AlertDialog as AlertDialogPrimitive } from "@base-ui/react/alert-dialog";

import { useTranslate } from "@/hooks/useTranslate";
import { ChildrenOrI18nType } from "@/utils/react";
import { cn } from "@/utils/tailwind";

import { AwButton } from "./AwButton/AwButton";
import { ButtonVariantType } from "./AwButton/variants";
import { textVariants } from "./AwText/variants";

export const AwAlertDialog = (props: AlertDialogPrimitive.Root.Props) => {
  return <AlertDialogPrimitive.Root data-slot="alert-dialog" {...props} />;
};

export const AwAlertDialogTrigger = (
  props: AlertDialogPrimitive.Trigger.Props,
) => {
  return (
    <AlertDialogPrimitive.Trigger data-slot="alert-dialog-trigger" {...props} />
  );
};

const AwAlertDialogPortal = (props: AlertDialogPrimitive.Portal.Props) => {
  return (
    <AlertDialogPrimitive.Portal data-slot="alert-dialog-portal" {...props} />
  );
};

export const AwAlertDialogOverlay = ({
  className,
  ...props
}: AlertDialogPrimitive.Backdrop.Props) => {
  return (
    <AlertDialogPrimitive.Backdrop
      data-slot="alert-dialog-overlay"
      className={cn(
        "fixed inset-0 isolate z-50 bg-black/10 duration-100 supports-backdrop-filter:backdrop-blur-xs data-open:animate-in data-open:fade-in-0 data-closed:animate-out data-closed:fade-out-0",
        className,
      )}
      {...props}
    />
  );
};

export const AwAlertDialogContent = ({
  className,
  ...props
}: AlertDialogPrimitive.Popup.Props) => {
  return (
    <AwAlertDialogPortal>
      <AwAlertDialogOverlay />
      <AlertDialogPrimitive.Popup
        data-slot="alert-dialog-content"
        className={cn(
          "fixed top-1/2 left-1/2 z-50 grid w-full max-w-[calc(100%-2rem)] -translate-x-1/2 -translate-y-1/2 gap-6 rounded-xl bg-popover p-6 text-popover-foreground ring-1 ring-foreground/10 duration-100 outline-none sm:max-w-lg data-open:animate-in data-open:fade-in-0 data-open:zoom-in-95 data-closed:animate-out data-closed:fade-out-0 data-closed:zoom-out-95",
          className,
        )}
        {...props}
      />
    </AwAlertDialogPortal>
  );
};

export const AwAlertDialogHeader = ({
  className,
  ...props
}: ComponentProps<"div">) => {
  return (
    <div
      data-slot="alert-dialog-header"
      className={cn(
        "grid grid-rows-[auto_1fr] place-items-center gap-1.5 text-center has-data-[slot=alert-dialog-media]:grid-rows-[auto_auto_1fr] sm:place-items-start sm:text-left",
        className,
      )}
      {...props}
    />
  );
};

export const AwAlertDialogFooter = ({
  className,
  ...props
}: ComponentProps<"div">) => {
  return (
    <div
      data-slot="alert-dialog-footer"
      className={cn(
        "flex flex-col-reverse gap-2 sm:flex-row sm:justify-end",
        className,
      )}
      {...props}
    />
  );
};

type AwAlertDialogTitlePropsType = AlertDialogPrimitive.Title.Props &
  ChildrenOrI18nType;

export const AwAlertDialogTitle = ({
  className,
  children,
  i18nKey,
  i18nOptions,
  ...props
}: AwAlertDialogTitlePropsType) => {
  const i18nText = useTranslate(i18nKey, i18nOptions);

  return (
    <AlertDialogPrimitive.Title
      data-slot="alert-dialog-title"
      className={cn(textVariants({ variant: "headerTwo" }), className)}
      {...props}>
      {children ?? i18nText}
    </AlertDialogPrimitive.Title>
  );
};

type AwAlertDialogDescriptionPropsType =
  AlertDialogPrimitive.Description.Props & ChildrenOrI18nType;

export const AwAlertDialogDescription = ({
  className,
  children,
  i18nKey,
  i18nOptions,
  ...props
}: AwAlertDialogDescriptionPropsType) => {
  const i18nText = useTranslate(i18nKey, i18nOptions);

  return (
    <AlertDialogPrimitive.Description
      data-slot="alert-dialog-description"
      className={cn(
        "text-muted-foreground *:[a]:underline *:[a]:underline-offset-3 *:[a]:hover:text-foreground",
        textVariants(),
        className,
      )}
      {...props}>
      {children ?? i18nText}
    </AlertDialogPrimitive.Description>
  );
};

type AwAlertDialogActionPropsType = ComponentProps<typeof AwButton> &
  ChildrenOrI18nType & {
    variant?: ButtonVariantType;
  };

export const AwAlertDialogAction = ({
  className,
  variant = "default",
  children,
  i18nKey,
  i18nOptions,
  ...props
}: AwAlertDialogActionPropsType) => {
  const i18nText = useTranslate(i18nKey, i18nOptions);
  return (
    <AwButton
      data-slot="alert-dialog-action"
      type="button"
      variant={variant}
      className={className}
      {...props}>
      {children ?? i18nText}
    </AwButton>
  );
};

type AwAlertDialogCancelPropsType = AlertDialogPrimitive.Close.Props &
  ChildrenOrI18nType & {
    className?: string;
    variant?: ButtonVariantType;
  };

export const AwAlertDialogCancel = ({
  className,
  i18nKey,
  i18nOptions,
  children,
  variant = "outline",
  ...props
}: AwAlertDialogCancelPropsType) => {
  const i18nText = useTranslate(i18nKey, i18nOptions);

  return (
    <AlertDialogPrimitive.Close
      data-slot="alert-dialog-cancel"
      render={
        <AwButton type="button" variant={variant} className={className} />
      }
      {...props}>
      {children ?? i18nText}
    </AlertDialogPrimitive.Close>
  );
};
