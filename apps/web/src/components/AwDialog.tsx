import { ComponentProps } from "react";
import { Dialog as DialogPrimitive } from "@base-ui/react/dialog";
import { XIcon } from "lucide-react";

import { AwButton } from "@/components/AwButton/AwButton";
import { useTranslate } from "@/hooks/useTranslate";
import { ChildrenOrI18nType } from "@/utils/react";
import { cn } from "@/utils/tailwind";

import { textVariants } from "./AwText/variants";

export const AwDialog = ({ ...props }: DialogPrimitive.Root.Props) => {
  return <DialogPrimitive.Root data-slot="dialog" {...props} />;
};

export const AwDialogTrigger = ({
  ...props
}: DialogPrimitive.Trigger.Props) => {
  return <DialogPrimitive.Trigger data-slot="dialog-trigger" {...props} />;
};

export const AwDialogPortal = ({ ...props }: DialogPrimitive.Portal.Props) => {
  return <DialogPrimitive.Portal data-slot="dialog-portal" {...props} />;
};

export const AwDialogClose = ({ ...props }: DialogPrimitive.Close.Props) => {
  return <DialogPrimitive.Close data-slot="dialog-close" {...props} />;
};

export const AwDialogOverlay = ({
  className,
  ...props
}: DialogPrimitive.Backdrop.Props) => {
  return (
    <DialogPrimitive.Backdrop
      data-slot="dialog-overlay"
      className={cn(
        "fixed inset-0 isolate z-50 bg-black/10 duration-100 supports-backdrop-filter:backdrop-blur-xs data-open:animate-in data-open:fade-in-0 data-closed:animate-out data-closed:fade-out-0",
        className,
      )}
      {...props}
    />
  );
};

export const AwDialogContent = ({
  className,
  children,
  showCloseAwButton = true,
  ...props
}: DialogPrimitive.Popup.Props & {
  showCloseAwButton?: boolean;
}) => {
  return (
    <AwDialogPortal>
      <AwDialogOverlay />
      <DialogPrimitive.Popup
        data-slot="dialog-content"
        className={cn(
          "fixed top-1/2 left-1/2 z-50 grid w-full max-w-[calc(100%-2rem)] -translate-x-1/2 -translate-y-1/2 gap-6 rounded-xl bg-popover p-6 text-sm text-popover-foreground ring-1 ring-foreground/10 duration-100 outline-none sm:max-w-md data-open:animate-in data-open:fade-in-0 data-open:zoom-in-95 data-closed:animate-out data-closed:fade-out-0 data-closed:zoom-out-95",
          className,
        )}
        {...props}>
        {children}
        {showCloseAwButton && (
          <DialogPrimitive.Close
            data-slot="dialog-close"
            render={
              <AwButton
                variant="ghost"
                className="absolute top-4 right-4"
                size="icon-sm"
              />
            }>
            <XIcon />
            <span className="sr-only">Close</span>
          </DialogPrimitive.Close>
        )}
      </DialogPrimitive.Popup>
    </AwDialogPortal>
  );
};

export const AwDialogHeader = ({
  className,
  ...props
}: ComponentProps<"div">) => {
  return (
    <div
      data-slot="dialog-header"
      className={cn("flex flex-col gap-2", className)}
      {...props}
    />
  );
};

export const AwDialogFooter = ({
  className,
  showCloseAwButton = false,
  children,
  ...props
}: ComponentProps<"div"> & {
  showCloseAwButton?: boolean;
}) => {
  return (
    <div
      data-slot="dialog-footer"
      className={cn(
        "flex flex-col-reverse gap-2 sm:flex-row sm:justify-end",
        className,
      )}
      {...props}>
      {children}
      {showCloseAwButton && (
        <DialogPrimitive.Close render={<AwButton variant="outline" />}>
          Close
        </DialogPrimitive.Close>
      )}
    </div>
  );
};

type AwDialogTitlePropsType = DialogPrimitive.Title.Props & ChildrenOrI18nType;

export const AwDialogTitle = ({
  className,
  i18nKey,
  i18nOptions,
  children,
  ...props
}: AwDialogTitlePropsType) => {
  const i18nText = useTranslate(i18nKey, i18nOptions);

  return (
    <DialogPrimitive.Title
      data-slot="dialog-title"
      className={cn("font-heading leading-none font-medium", className)}
      {...props}>
      {children ?? i18nText}
    </DialogPrimitive.Title>
  );
};

type AwDialogDescriptionPropsType = DialogPrimitive.Description.Props &
  ChildrenOrI18nType;

export const AwDialogDescription = ({
  className,
  i18nKey,
  i18nOptions,
  children,
  ...props
}: AwDialogDescriptionPropsType) => {
  const i18nText = useTranslate(i18nKey, i18nOptions);

  return (
    <DialogPrimitive.Description
      data-slot="dialog-description"
      className={cn(
        "text-muted-foreground *:[a]:underline *:[a]:underline-offset-3 *:[a]:hover:text-foreground",
        textVariants(),
        className,
      )}
      {...props}>
      {children ?? i18nText}
    </DialogPrimitive.Description>
  );
};
