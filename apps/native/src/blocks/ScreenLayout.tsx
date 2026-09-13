import { ReactNode } from "react";
import { ScrollView } from "react-native";
import {
  KeyboardAwareScrollView,
  KeyboardAwareScrollViewProps,
} from "react-native-keyboard-controller";
import { useSafeAreaInsets } from "react-native-safe-area-context";

import { AnBox } from "@/components/AnBox";
import { usePlatformOS } from "@/hooks/usePlatformOS";
import { cn } from "@/utils/tailwind";

type ScreenLayoutPropsType = {
  children: ReactNode;
  variant?: "FORM" | "SCROLL" | "LIST";
  className?: string;
  backgroundClassName?: string;
  showScrollBar?: boolean;
  hasHeader?: boolean;
  hasTabBar?: boolean;
  keyboardAwareScrollViewProps?: KeyboardAwareScrollViewProps;
  hasTopPadding?: boolean;
  hasHorizontalPadding?: boolean;
};

export const ScreenLayout = ({
  children,
  variant = "SCROLL",
  className,
  backgroundClassName = "bg-background",
  showScrollBar = false,
  hasHeader = true,
  keyboardAwareScrollViewProps,
  hasHorizontalPadding = true,
  hasTopPadding = true,
}: ScreenLayoutPropsType) => {
  const insets = useSafeAreaInsets();
  const { isWeb } = usePlatformOS();

  if (isWeb) {
    return <AnBox className="container mx-auto flex-1 px-4">{children}</AnBox>;
  }

  switch (variant) {
    case "FORM":
      return (
        <AnBox
          className={cn(
            "flex-1",
            {
              "pt-safe": hasTopPadding,
            },
            backgroundClassName,
          )}>
          <KeyboardAwareScrollView
            className={cn(
              {
                "px-4": hasHorizontalPadding,
              },
              backgroundClassName,
            )}
            keyboardDismissMode="on-drag"
            contentContainerClassName="flex-grow"
            bottomOffset={insets.bottom}
            showsVerticalScrollIndicator={showScrollBar}
            {...keyboardAwareScrollViewProps}>
            <>
              {children}
              {/* Spacer to avoid content being too close to the bottom */}
              <AnBox className="h-8 w-full" />
            </>
          </KeyboardAwareScrollView>
        </AnBox>
      );

    case "LIST":
      return (
        <AnBox
          className={cn(
            "flex-1",
            {
              "pt-safe": !hasHeader,
            },
            backgroundClassName,
            className,
          )}>
          {children}
        </AnBox>
      );

    default:
    case "SCROLL":
      return (
        <AnBox
          className={cn(
            "bg-background flex-1",
            {
              "pt-safe": !hasHeader,
            },
            backgroundClassName,
            className,
          )}>
          <ScrollView showsVerticalScrollIndicator={showScrollBar}>
            <AnBox
              className={cn(
                "flex-1",
                {
                  "px-4": hasHorizontalPadding,
                },
                backgroundClassName,
              )}>
              {children}
            </AnBox>
          </ScrollView>
        </AnBox>
      );
  }
};
