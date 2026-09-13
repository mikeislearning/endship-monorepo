import { Fragment } from "react";
import * as TooltipPrimitive from "@rn-primitives/tooltip";
import { Platform, StyleSheet } from "react-native";
import { FadeInDown, FadeInUp, FadeOut } from "react-native-reanimated";
import { FullWindowOverlay as RNFullWindowOverlay } from "react-native-screens";

import { TextClassContext } from "@/context/TextClassContext";
import { usePlatformOS } from "@/hooks/usePlatformOS";
import { ChildrenOrI18nType } from "@/i18n";
import { cn } from "@/utils/tailwind";

import { AnThemedBox } from "./AnBox";
import { AnNativeOnlyAnimatedView } from "./AnNativeOnlyAnimatedView";
import { AnText } from "./AnText/AnText";

// eslint-disable-next-line react-refresh/only-export-components
export const AnTooltip = TooltipPrimitive.Root;
// eslint-disable-next-line react-refresh/only-export-components
export const AnTooltipTrigger = TooltipPrimitive.Trigger;

const FullWindowOverlay =
  Platform.OS === "ios" ? RNFullWindowOverlay : Fragment;

type AnTooltipContentPropsType = TooltipPrimitive.ContentProps &
  ChildrenOrI18nType & {
    portalHost?: string;
  };

export const AnTooltipContent = ({
  className,
  sideOffset = 4,
  portalHost,
  side = "top",
  children,
  i18nKey,
  i18nOptions,
  ...props
}: AnTooltipContentPropsType) => {
  const { isWeb, isNative } = usePlatformOS();

  return (
    <TooltipPrimitive.Portal hostName={portalHost}>
      <FullWindowOverlay>
        <TooltipPrimitive.Overlay
          style={isNative ? StyleSheet.absoluteFill : undefined}>
          <AnThemedBox>
            <AnNativeOnlyAnimatedView
              entering={
                side === "top"
                  ? FadeInDown.withInitialValues({
                      transform: [{ translateY: 3 }],
                    }).duration(150)
                  : FadeInUp.withInitialValues({
                      transform: [{ translateY: -5 }],
                    })
              }
              exiting={FadeOut}>
              <TextClassContext.Provider value="text-xs text-primary-foreground">
                <TooltipPrimitive.Content
                  sideOffset={sideOffset}
                  className={cn(
                    "bg-primary z-50 rounded-md px-3 py-2 sm:py-1.5",
                    isWeb &&
                      cn(
                        "origin-(--radix-tooltip-content-transform-origin) animate-in fade-in-0 zoom-in-95 w-fit text-balance",
                        side === "bottom" && "slide-in-from-top-2",
                        side === "left" && "slide-in-from-right-2",
                        side === "right" && "slide-in-from-left-2",
                        side === "top" && "slide-in-from-bottom-2",
                      ),
                    className,
                  )}
                  side={side}
                  {...props}>
                  {children ?? (
                    <AnText
                      variant="sm"
                      i18nKey={i18nKey}
                      i18nOptions={i18nOptions}
                    />
                  )}
                </TooltipPrimitive.Content>
              </TextClassContext.Provider>
            </AnNativeOnlyAnimatedView>
          </AnThemedBox>
        </TooltipPrimitive.Overlay>
      </FullWindowOverlay>
    </TooltipPrimitive.Portal>
  );
};
