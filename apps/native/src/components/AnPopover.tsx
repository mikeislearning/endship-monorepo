import { Fragment } from "react";
import * as PopoverPrimitive from "@rn-primitives/popover";
import { Platform, StyleSheet } from "react-native";
import { FadeIn, FadeOut } from "react-native-reanimated";
import { FullWindowOverlay as RNFullWindowOverlay } from "react-native-screens";

import { TextClassContext } from "@/context/TextClassContext";
import { cn } from "@/utils/tailwind";

import { AnThemedBox } from "./AnBox";
import { AnNativeOnlyAnimatedView } from "./AnNativeOnlyAnimatedView";

// eslint-disable-next-line react-refresh/only-export-components
export const AnPopover = PopoverPrimitive.Root;
// eslint-disable-next-line react-refresh/only-export-components
export const AnPopoverTrigger = PopoverPrimitive.Trigger;

const FullWindowOverlay =
  Platform.OS === "ios" ? RNFullWindowOverlay : Fragment;

type AnPopoverContentPropsType = PopoverPrimitive.ContentProps & {
  portalHost?: string;
};

export const AnPopoverContent = ({
  className,
  align = "center",
  sideOffset = 4,
  portalHost,
  ...props
}: AnPopoverContentPropsType) => {
  return (
    <PopoverPrimitive.Portal hostName={portalHost}>
      <FullWindowOverlay>
        <PopoverPrimitive.Overlay
          style={Platform.select({ native: StyleSheet.absoluteFill })}>
          <AnThemedBox>
            <AnNativeOnlyAnimatedView
              entering={FadeIn.duration(200)}
              exiting={FadeOut}>
              <TextClassContext.Provider value="text-popover-foreground">
                <PopoverPrimitive.Content
                  align={align}
                  sideOffset={sideOffset}
                  className={cn(
                    "outline-hidden border-border bg-popover z-50 w-72 rounded-md border p-4 shadow-md shadow-black/5",
                    Platform.select({
                      web: cn(
                        "origin-(--radix-popover-content-transform-origin) animate-in fade-in-0 zoom-in-95 cursor-auto",
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
        </PopoverPrimitive.Overlay>
      </FullWindowOverlay>
    </PopoverPrimitive.Portal>
  );
};
