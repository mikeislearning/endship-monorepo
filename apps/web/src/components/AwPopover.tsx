import { ComponentProps } from "react";
import { Popover as PopoverPrimitive } from "@base-ui/react/popover";

import { useTranslate } from "@/hooks/useTranslate";
import { ChildrenOrI18nType } from "@/utils/react";
import { cn } from "@/utils/tailwind";

export const AwPopover = (props: PopoverPrimitive.Root.Props) => {
  return <PopoverPrimitive.Root data-slot="popover" {...props} />;
};

export const AwPopoverTrigger = (props: PopoverPrimitive.Trigger.Props) => {
  return <PopoverPrimitive.Trigger data-slot="popover-trigger" {...props} />;
};

type AwPopoverContentPropsType = PopoverPrimitive.Popup.Props &
  Pick<
    PopoverPrimitive.Positioner.Props,
    "align" | "alignOffset" | "side" | "sideOffset"
  >;

export const AwPopoverContent = ({
  className,
  align = "center",
  alignOffset = 0,
  side = "bottom",
  sideOffset = 4,
  ...props
}: AwPopoverContentPropsType) => {
  return (
    <PopoverPrimitive.Portal>
      <PopoverPrimitive.Positioner
        align={align}
        alignOffset={alignOffset}
        side={side}
        sideOffset={sideOffset}
        className="isolate z-50">
        <PopoverPrimitive.Popup
          data-slot="popover-content"
          className={cn(
            "z-50 flex w-72 origin-(--transform-origin) flex-col gap-4 rounded-md bg-popover p-4 text-sm text-popover-foreground shadow-md ring-1 ring-foreground/10 outline-hidden duration-100 data-[side=bottom]:slide-in-from-top-2 data-[side=inline-end]:slide-in-from-left-2 data-[side=inline-start]:slide-in-from-right-2 data-[side=left]:slide-in-from-right-2 data-[side=right]:slide-in-from-left-2 data-[side=top]:slide-in-from-bottom-2 data-open:animate-in data-open:fade-in-0 data-open:zoom-in-95 data-closed:animate-out data-closed:fade-out-0 data-closed:zoom-out-95",
            className,
          )}
          {...props}
        />
      </PopoverPrimitive.Positioner>
    </PopoverPrimitive.Portal>
  );
};

export const AwPopoverHeader = ({
  className,
  ...props
}: ComponentProps<"div">) => {
  return (
    <div
      data-slot="popover-header"
      className={cn("flex flex-col gap-1 text-sm", className)}
      {...props}
    />
  );
};

type AwPopoverTitlePropsType = PopoverPrimitive.Title.Props &
  ChildrenOrI18nType;

export const AwPopoverTitle = ({
  className,
  children,
  i18nKey,
  i18nOptions,
  ...props
}: AwPopoverTitlePropsType) => {
  const i18nText = useTranslate(i18nKey, i18nOptions);

  return (
    <PopoverPrimitive.Title
      data-slot="popover-title"
      className={cn("font-heading font-medium", className)}
      {...props}>
      {children ?? i18nText}
    </PopoverPrimitive.Title>
  );
};

type AwPopoverDescriptionPropsType = PopoverPrimitive.Description.Props &
  ChildrenOrI18nType;

export const AwPopoverDescription = ({
  className,
  children,
  i18nKey,
  i18nOptions,
  ...props
}: AwPopoverDescriptionPropsType) => {
  const i18nText = useTranslate(i18nKey, i18nOptions);

  return (
    <PopoverPrimitive.Description
      data-slot="popover-description"
      className={cn("text-muted-foreground", className)}
      {...props}>
      {children ?? i18nText}
    </PopoverPrimitive.Description>
  );
};
