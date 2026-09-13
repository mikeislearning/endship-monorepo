import { Tooltip as TooltipPrimitive } from "@base-ui/react/tooltip";

import { useTranslate } from "@/hooks/useTranslate";
import { ChildrenOrI18nType } from "@/utils/react";
import { cn } from "@/utils/tailwind";

import { textVariants } from "./AwText/variants";

export const AwTooltipProvider = ({
  delay = 0,
  ...props
}: TooltipPrimitive.Provider.Props) => {
  return (
    <TooltipPrimitive.Provider
      data-slot="tooltip-provider"
      delay={delay}
      {...props}
    />
  );
};

export const AwTooltip = (props: TooltipPrimitive.Root.Props) => {
  return (
    <AwTooltipProvider>
      <TooltipPrimitive.Root data-slot="tooltip" {...props} />
    </AwTooltipProvider>
  );
};

export const AwTooltipTrigger = (props: TooltipPrimitive.Trigger.Props) => {
  return <TooltipPrimitive.Trigger data-slot="tooltip-trigger" {...props} />;
};

type AwTooltipContentPropsType = TooltipPrimitive.Popup.Props &
  Pick<
    TooltipPrimitive.Positioner.Props,
    "align" | "alignOffset" | "side" | "sideOffset"
  > &
  ChildrenOrI18nType;

export const AwTooltipContent = ({
  className,
  side = "top",
  sideOffset = 4,
  align = "center",
  alignOffset = 0,
  i18nKey,
  i18nOptions,
  children,
  ...props
}: AwTooltipContentPropsType) => {
  const i18nText = useTranslate(i18nKey, i18nOptions);

  return (
    <TooltipPrimitive.Portal>
      <TooltipPrimitive.Positioner
        align={align}
        alignOffset={alignOffset}
        side={side}
        sideOffset={sideOffset}
        className="isolate z-50">
        <TooltipPrimitive.Popup
          data-slot="tooltip-content"
          className={cn(
            "z-50 inline-flex w-fit max-w-xs origin-(--transform-origin) items-center gap-1.5 rounded-md bg-foreground px-3 py-1.5 text-background has-data-[slot=kbd]:pr-1.5 data-[side=bottom]:slide-in-from-top-2 data-[side=inline-end]:slide-in-from-left-2 data-[side=inline-start]:slide-in-from-right-2 data-[side=left]:slide-in-from-right-2 data-[side=right]:slide-in-from-left-2 data-[side=top]:slide-in-from-bottom-2 data-open:animate-in data-open:fade-in-0 data-open:zoom-in-95 data-closed:animate-out data-closed:fade-out-0 data-closed:zoom-out-95",
            textVariants({ variant: "sm" }),
            className,
          )}
          {...props}>
          {children ?? i18nText}
          <TooltipPrimitive.Arrow className="z-50 size-2.5 translate-y-[calc(-50%-2px)] rotate-45 rounded-[2px] bg-foreground fill-foreground data-[side=bottom]:top-1 data-[side=inline-end]:top-1/2! data-[side=inline-end]:-left-1 data-[side=inline-end]:-translate-y-1/2 data-[side=inline-start]:top-1/2! data-[side=inline-start]:-right-1 data-[side=inline-start]:-translate-y-1/2 data-[side=left]:top-1/2! data-[side=left]:-right-1 data-[side=left]:-translate-y-1/2 data-[side=right]:top-1/2! data-[side=right]:-left-1 data-[side=right]:-translate-y-1/2 data-[side=top]:-bottom-2.5" />
        </TooltipPrimitive.Popup>
      </TooltipPrimitive.Positioner>
    </TooltipPrimitive.Portal>
  );
};
