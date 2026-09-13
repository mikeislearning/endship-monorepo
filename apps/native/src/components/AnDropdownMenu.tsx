import { Fragment, ReactNode } from "react";
import * as DropdownMenuPrimitive from "@rn-primitives/dropdown-menu";
import {
  ChevronDownIcon,
  ChevronRightIcon,
  ChevronUpIcon,
} from "lucide-react-native";
import {
  Platform,
  StyleSheet,
  type StyleProp,
  type ViewStyle,
} from "react-native";
import { FadeIn } from "react-native-reanimated";
import { FullWindowOverlay as RNFullWindowOverlay } from "react-native-screens";

import { TextClassContext } from "@/context/TextClassContext";
import { usePlatformOS } from "@/hooks/usePlatformOS";
import { ChildrenOrI18nType } from "@/i18n";
import { cn } from "@/utils/tailwind";

import { AnThemedBox } from "./AnBox";
import { AnIcon } from "./AnIcon";
import { AnNativeOnlyAnimatedView } from "./AnNativeOnlyAnimatedView";
import { AnText } from "./AnText/AnText";

// eslint-disable-next-line react-refresh/only-export-components
export const AnDropdownMenu = DropdownMenuPrimitive.Root;
// eslint-disable-next-line react-refresh/only-export-components
export const AnDropdownMenuTrigger = DropdownMenuPrimitive.Trigger;
// eslint-disable-next-line react-refresh/only-export-components
export const AnDropdownMenuGroup = DropdownMenuPrimitive.Group;
// eslint-disable-next-line react-refresh/only-export-components
export const AnDropdownMenuPortal = DropdownMenuPrimitive.Portal;
// eslint-disable-next-line react-refresh/only-export-components
export const AnDropdownMenuSub = DropdownMenuPrimitive.Sub;
// eslint-disable-next-line react-refresh/only-export-components
export const AnDropdownMenuRadioGroup = DropdownMenuPrimitive.RadioGroup;

type AnDropdownMenuSubTriggerPropsType =
  DropdownMenuPrimitive.SubTriggerProps & {
    children?: ReactNode;
    iconClassName?: string;
    inset?: boolean;
  };

export const AnDropdownMenuSubTrigger = ({
  className,
  inset,
  children,
  iconClassName,
  ...props
}: AnDropdownMenuSubTriggerPropsType) => {
  const { open: isOpen } = DropdownMenuPrimitive.useSubContext();
  const { isWeb } = usePlatformOS();

  const icon = isWeb
    ? ChevronRightIcon
    : isOpen
      ? ChevronUpIcon
      : ChevronDownIcon;

  return (
    <TextClassContext.Provider
      value={cn(
        "group-active:text-accent-foreground select-none text-sm",
        isOpen && "text-accent-foreground",
      )}>
      <DropdownMenuPrimitive.SubTrigger
        className={cn(
          "active:bg-accent group flex flex-row items-center rounded-sm px-2 py-2 sm:py-1.5",
          Platform.select({
            web: "focus:bg-accent focus:text-accent-foreground cursor-default outline-none [&_svg]:pointer-events-none",
          }),
          isOpen && "bg-accent",
          inset && "pl-8",
        )}
        {...props}>
        <>{children}</>
        <AnIcon
          as={icon}
          className={cn(
            "text-foreground ml-auto size-4 shrink-0",
            iconClassName,
          )}
        />
      </DropdownMenuPrimitive.SubTrigger>
    </TextClassContext.Provider>
  );
};

type AnDropdownMenuSubContentPropsType =
  DropdownMenuPrimitive.SubContentProps & {
    className?: string;
  };

export const AnDropdownMenuSubContent = ({
  className,
  ...props
}: AnDropdownMenuSubContentPropsType) => {
  return (
    <AnNativeOnlyAnimatedView entering={FadeIn}>
      <DropdownMenuPrimitive.SubContent
        className={cn(
          "border-border bg-card overflow-hidden rounded-md border p-1 shadow-lg shadow-black/5",
          Platform.select({
            web: "origin-(--radix-context-menu-content-transform-origin) animate-in fade-in-0 zoom-in-95 data-[state=closed]:animate-out data-[state=closed]:fade-out-0 data-[state=closed]:zoom-out-95 data-[side=bottom]:slide-in-from-top-2 data-[side=left]:slide-in-from-right-2 data-[side=right]:slide-in-from-left-2 data-[side=top]:slide-in-from-bottom-2 z-50 min-w-[8rem]",
          }),
          className,
        )}
        {...props}
      />
    </AnNativeOnlyAnimatedView>
  );
};

const FullWindowOverlay =
  Platform.OS === "ios" ? RNFullWindowOverlay : Fragment;

type AnDropdownMenuContentPropsType = DropdownMenuPrimitive.ContentProps & {
  overlayStyle?: StyleProp<ViewStyle>;
  overlayClassName?: string;
  portalHost?: string;
};

export const AnDropdownMenuContent = ({
  className,
  overlayClassName,
  overlayStyle,
  portalHost,
  ...props
}: AnDropdownMenuContentPropsType) => {
  return (
    <DropdownMenuPrimitive.Portal hostName={portalHost}>
      <FullWindowOverlay>
        <DropdownMenuPrimitive.Overlay
          style={Platform.select({
            web: overlayStyle,
            native: overlayStyle
              ? StyleSheet.flatten([
                  StyleSheet.absoluteFill,
                  overlayStyle as typeof StyleSheet.absoluteFill,
                ])
              : StyleSheet.absoluteFill,
          })}
          className={overlayClassName}>
          <AnThemedBox>
            <AnNativeOnlyAnimatedView entering={FadeIn}>
              <TextClassContext.Provider value="text-popover-foreground">
                <DropdownMenuPrimitive.Content
                  className={cn(
                    "border-border bg-popover min-w-[8rem] overflow-hidden rounded-md border p-1 shadow-lg shadow-black/5",
                    Platform.select({
                      web: cn(
                        "max-h-(--radix-context-menu-content-available-height) origin-(--radix-context-menu-content-transform-origin) animate-in fade-in-0 zoom-in-95 z-50 cursor-default",
                        props.side === "bottom" && "slide-in-from-top-2",
                        props.side === "top" && "slide-in-from-bottom-2",
                      ),
                    }),
                    className,
                  )}
                  {...props}
                />
              </TextClassContext.Provider>
            </AnNativeOnlyAnimatedView>
          </AnThemedBox>
        </DropdownMenuPrimitive.Overlay>
      </FullWindowOverlay>
    </DropdownMenuPrimitive.Portal>
  );
};

type AnDropdownMenuItemPropsType = DropdownMenuPrimitive.ItemProps &
  ChildrenOrI18nType & {
    className?: string;
    inset?: boolean;
    variant?: "default" | "destructive";
  };

export const AnDropdownMenuItem = ({
  className,
  inset,
  variant,
  children,
  i18nKey,
  i18nOptions,
  ...props
}: AnDropdownMenuItemPropsType) => {
  return (
    <TextClassContext.Provider
      value={cn(
        "text-popover-foreground group-active:text-popover-foreground select-none text-sm",
        variant === "destructive" &&
          "text-destructive group-active:text-destructive",
      )}>
      <DropdownMenuPrimitive.Item
        className={cn(
          "active:bg-accent group relative flex flex-row items-center gap-2 rounded-sm px-2 py-2 sm:py-1.5",
          Platform.select({
            web: cn(
              "focus:bg-accent focus:text-accent-foreground cursor-default outline-none data-[disabled]:pointer-events-none",
              variant === "destructive" &&
                "focus:bg-destructive/10 dark:focus:bg-destructive/20",
            ),
          }),
          variant === "destructive" &&
            "active:bg-destructive/10 dark:active:bg-destructive/20",
          props.disabled && "opacity-50",
          inset && "pl-8",
          className,
        )}
        {...props}>
        {children ?? <AnText i18nKey={i18nKey} i18nOptions={i18nOptions} />}
      </DropdownMenuPrimitive.Item>
    </TextClassContext.Provider>
  );
};

type AnDropdownMenuLabelPropsType = DropdownMenuPrimitive.LabelProps &
  ChildrenOrI18nType & {
    className?: string;
    inset?: boolean;
  };

export const AnDropdownMenuLabel = ({
  className,
  inset,
  children,
  i18nKey,
  i18nOptions,
  ...props
}: AnDropdownMenuLabelPropsType) => {
  return (
    <DropdownMenuPrimitive.Label
      className={cn("px-2 py-2 sm:py-1.5", inset && "pl-8", className)}
      {...props}>
      {children ?? <AnText i18nKey={i18nKey} i18nOptions={i18nOptions} />}
    </DropdownMenuPrimitive.Label>
  );
};

type AnDropdownMenuSeparatorPropsType = DropdownMenuPrimitive.SeparatorProps;

export const AnDropdownMenuSeparator = ({
  className,
  ...props
}: AnDropdownMenuSeparatorPropsType) => {
  return (
    <DropdownMenuPrimitive.Separator
      className={cn("bg-border -mx-1 my-1 h-px", className)}
      {...props}
    />
  );
};
