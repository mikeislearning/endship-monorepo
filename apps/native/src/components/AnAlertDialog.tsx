import { Fragment, ReactNode } from "react";
import * as AlertDialogPrimitive from "@rn-primitives/alert-dialog";
import { Platform, type ViewProps } from "react-native";
import { FadeIn, FadeOut } from "react-native-reanimated";
import { FullWindowOverlay as RNFullWindowOverlay } from "react-native-screens";

import { TextClassContext } from "@/context/TextClassContext";
import { usePlatformOS } from "@/hooks/usePlatformOS";
import { ChildrenOrI18nType } from "@/i18n";
import { cn } from "@/utils/tailwind";

import { AnBox, AnThemedBox } from "./AnBox";
import { AnButton, AnButtonPropsType } from "./AnButton/AnButton";
import { AnNativeOnlyAnimatedView } from "./AnNativeOnlyAnimatedView";
import { AnText } from "./AnText/AnText";

// eslint-disable-next-line react-refresh/only-export-components
export const AnAlertDialog = AlertDialogPrimitive.Root;
// eslint-disable-next-line react-refresh/only-export-components
export const AnAlertDialogTrigger = AlertDialogPrimitive.Trigger;
// eslint-disable-next-line react-refresh/only-export-components
export const AnAlertDialogPortal = AlertDialogPrimitive.Portal;

const FullWindowOverlay =
  Platform.OS === "ios" ? RNFullWindowOverlay : Fragment;

type AnAlertDialogOverlayPropsType = Omit<
  AlertDialogPrimitive.OverlayProps,
  "asChild"
> & {
  children?: ReactNode;
};

export const AnAlertDialogOverlay = ({
  className,
  children,
  ...props
}: AnAlertDialogOverlayPropsType) => {
  const { isWeb, isNative } = usePlatformOS();

  return (
    <FullWindowOverlay>
      <AlertDialogPrimitive.Overlay
        className={cn(
          "absolute bottom-0 left-0 right-0 top-0 z-50 flex items-center justify-center bg-black/50 p-2",
          isWeb && "animate-in fade-in-0 fixed",
          isNative && "px-6",
          className,
        )}
        {...props}>
        <AnNativeOnlyAnimatedView
          entering={FadeIn.duration(200).delay(50)}
          exiting={FadeOut.duration(150)}>
          <>{children}</>
        </AnNativeOnlyAnimatedView>
      </AlertDialogPrimitive.Overlay>
    </FullWindowOverlay>
  );
};

type AnAlertDialogContentPropsType = AlertDialogPrimitive.ContentProps & {
  portalHost?: string;
};

export const AnAlertDialogContent = ({
  className,
  portalHost,
  ...props
}: AnAlertDialogContentPropsType) => {
  const { isWeb } = usePlatformOS();

  return (
    <AnAlertDialogPortal hostName={portalHost}>
      <AnAlertDialogOverlay>
        <AnThemedBox>
          <AlertDialogPrimitive.Content
            className={cn(
              "border-border bg-card z-50 flex w-full max-w-[calc(100%-2rem)] flex-col gap-4 rounded-lg border p-6 shadow-lg shadow-black/5 sm:max-w-lg",
              isWeb && "animate-in fade-in-0 zoom-in-95 duration-200",
              className,
            )}
            {...props}
          />
        </AnThemedBox>
      </AnAlertDialogOverlay>
    </AnAlertDialogPortal>
  );
};

export const AnAlertDialogHeader = ({ className, ...props }: ViewProps) => {
  return (
    <TextClassContext.Provider value="text-center sm:text-left">
      <AnBox className={cn("flex flex-col gap-2", className)} {...props} />
    </TextClassContext.Provider>
  );
};

export const AnAlertDialogFooter = ({ className, ...props }: ViewProps) => {
  return (
    <AnBox
      className={cn(
        "flex flex-col-reverse gap-2 sm:flex-row sm:justify-end",
        className,
      )}
      {...props}
    />
  );
};

type AnAlertDialogTitlePropsType = AlertDialogPrimitive.TitleProps &
  ChildrenOrI18nType;

export const AnAlertDialogTitle = ({
  className,
  children,
  i18nKey,
  i18nOptions,
  ...props
}: AnAlertDialogTitlePropsType) => {
  return (
    <AlertDialogPrimitive.Title {...props}>
      {children ?? (
        <AnText
          variant="headerTwo"
          i18nKey={i18nKey}
          i18nOptions={i18nOptions}
          className={cn("leading-none", className)}
        />
      )}
    </AlertDialogPrimitive.Title>
  );
};

type AnAlertDialogDescriptionPropsType = AlertDialogPrimitive.DescriptionProps &
  ChildrenOrI18nType;

export const AnAlertDialogDescription = ({
  className,
  children,
  i18nKey,
  i18nOptions,
  ...props
}: AnAlertDialogDescriptionPropsType) => {
  return (
    <AlertDialogPrimitive.Description {...props}>
      {children ?? (
        <AnText
          i18nKey={i18nKey}
          i18nOptions={i18nOptions}
          className={cn("text-muted-foreground", className)}
        />
      )}
    </AlertDialogPrimitive.Description>
  );
};

type AnAlertDialogActionPropsType = Omit<
  AlertDialogPrimitive.ActionProps,
  "children"
> &
  AnButtonPropsType;

export const AnAlertDialogAction = (props: AnAlertDialogActionPropsType) => {
  return (
    <AlertDialogPrimitive.Action asChild>
      <AnButton {...props} />
    </AlertDialogPrimitive.Action>
  );
};

type AnAlertDialogCancelPropsType = Omit<
  AlertDialogPrimitive.CancelProps,
  "children"
> &
  AnButtonPropsType;

export const AnAlertDialogCancel = ({
  className,
  ...props
}: AnAlertDialogCancelPropsType) => {
  return (
    <AlertDialogPrimitive.Cancel asChild>
      <AnButton variant="outline" {...props} />
    </AlertDialogPrimitive.Cancel>
  );
};
