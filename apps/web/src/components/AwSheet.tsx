import { ComponentProps } from "react";
import { Dialog as SheetPrimitive } from "@base-ui/react/dialog";
import { XIcon } from "lucide-react";

import { useTranslate } from "@/hooks/useTranslate";
import { ChildrenOrI18nType } from "@/utils/react";
import { cn } from "@/utils/tailwind";

import { AwButton } from "./AwButton/AwButton";
import { AwText } from "./AwText/AwText";
import { textVariants } from "./AwText/variants";

export const AwSheet = ({ ...props }: SheetPrimitive.Root.Props) => {
  return <SheetPrimitive.Root data-slot="sheet" {...props} />;
};

export const AwSheetTrigger = ({ ...props }: SheetPrimitive.Trigger.Props) => {
  return <SheetPrimitive.Trigger data-slot="sheet-trigger" {...props} />;
};

export const AwSheetClose = ({ ...props }: SheetPrimitive.Close.Props) => {
  return <SheetPrimitive.Close data-slot="sheet-close" {...props} />;
};

export const AwSheetPortal = ({ ...props }: SheetPrimitive.Portal.Props) => {
  return <SheetPrimitive.Portal data-slot="sheet-portal" {...props} />;
};

export const AwSheetOverlay = ({
  className,
  ...props
}: SheetPrimitive.Backdrop.Props) => {
  return (
    <SheetPrimitive.Backdrop
      data-slot="sheet-overlay"
      className={cn(
        "fixed inset-0 z-50 bg-black/10 transition-opacity duration-150 data-ending-style:opacity-0 data-starting-style:opacity-0 supports-backdrop-filter:backdrop-blur-xs",
        className,
      )}
      {...props}
    />
  );
};

export const AwSheetContent = ({
  className,
  children,
  side = "right",
  showCloseButton = true,
  ...props
}: SheetPrimitive.Popup.Props & {
  side?: "top" | "right" | "bottom" | "left";
  showCloseButton?: boolean;
}) => {
  return (
    <AwSheetPortal>
      <AwSheetOverlay />
      <SheetPrimitive.Popup
        data-slot="sheet-content"
        data-side={side}
        className={cn(
          "fixed z-50 flex flex-col gap-4 overflow-y-auto bg-popover bg-clip-padding px-6 pb-6 shadow-lg transition duration-300 ease-in-out",
          side === "right" &&
            "inset-y-0 right-0 h-full w-full border-l data-ending-style:translate-x-full data-starting-style:translate-x-full lg:max-w-7/12",
          side === "left" &&
            "inset-y-0 left-0 h-full w-full border-r data-ending-style:-translate-x-full data-starting-style:-translate-x-full lg:max-w-7/12",
          side === "top" &&
            "inset-x-0 top-0 max-h-[80vh] border-b data-ending-style:-translate-y-full data-starting-style:-translate-y-full",
          side === "bottom" &&
            "inset-x-0 bottom-0 max-h-[80vh] border-t data-ending-style:translate-y-full data-starting-style:translate-y-full",
          className,
        )}
        {...props}>
        {children}
        {showCloseButton && (
          <SheetPrimitive.Close
            data-slot="sheet-close"
            render={
              <AwButton
                variant="ghost"
                className="absolute top-3.5 right-4"
                size="icon-sm"
              />
            }>
            <XIcon />
            <span className="sr-only">Close</span>
          </SheetPrimitive.Close>
        )}
      </SheetPrimitive.Popup>
    </AwSheetPortal>
  );
};

export const AwSheetHeader = ({
  className,
  ...props
}: ComponentProps<"div">) => {
  return (
    <div
      data-slot="sheet-header"
      className={cn(
        "sticky top-0 z-10 flex flex-col gap-1.5 bg-popover py-4",
        className,
      )}
      {...props}
    />
  );
};

export const AwSheetFooter = ({
  className,
  ...props
}: ComponentProps<"div">) => {
  return (
    <div
      data-slot="sheet-footer"
      className={cn(
        "sticky bottom-0 mt-auto flex flex-col gap-2 bg-popover py-4",
        className,
      )}
      {...props}
    />
  );
};

type AwSheetTitlePropsType = SheetPrimitive.Title.Props & ChildrenOrI18nType;

export const AwSheetTitle = ({
  className,
  children,
  i18nKey,
  i18nOptions,
  ...props
}: AwSheetTitlePropsType) => {
  const i18nText = useTranslate(i18nKey, i18nOptions);

  return (
    <SheetPrimitive.Title
      data-slot="sheet-title"
      className={cn("font-heading font-medium text-foreground", className)}
      {...props}
      render={
        <AwText variant="headerTwo">{children ?? i18nText}</AwText>
      }></SheetPrimitive.Title>
  );
};

type AwSheetDescriptionPropsType = SheetPrimitive.Description.Props &
  ChildrenOrI18nType;

export const AwSheetDescription = ({
  className,
  children,
  i18nKey,
  i18nOptions,
  ...props
}: AwSheetDescriptionPropsType) => {
  const i18nText = useTranslate(i18nKey, i18nOptions);
  return (
    <SheetPrimitive.Description
      data-slot="sheet-description"
      className={cn("text-muted-foreground", textVariants(), className)}
      {...props}>
      {children ?? i18nText}
    </SheetPrimitive.Description>
  );
};
