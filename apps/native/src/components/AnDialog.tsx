import { Fragment, ReactNode } from "react";
import * as DialogPrimitive from "@rn-primitives/dialog";
import { XIcon } from "lucide-react-native";
import { Platform, Text, type ViewProps } from "react-native";
import { FadeIn, FadeOut } from "react-native-reanimated";
import { FullWindowOverlay as RNFullWindowOverlay } from "react-native-screens";

import { usePlatformOS } from "@/hooks/usePlatformOS";
import { ChildrenOrI18nType } from "@/i18n";
import { cn } from "@/utils/tailwind";

import { AnBox, AnThemedBox } from "./AnBox";
import { AnIcon } from "./AnIcon";
import { AnNativeOnlyAnimatedView } from "./AnNativeOnlyAnimatedView";
import { AnText } from "./AnText/AnText";

// eslint-disable-next-line react-refresh/only-export-components
export const AnDialog = DialogPrimitive.Root;
// eslint-disable-next-line react-refresh/only-export-components
export const AnDialogTrigger = DialogPrimitive.Trigger;
// eslint-disable-next-line react-refresh/only-export-components
export const AnDialogPortal = DialogPrimitive.Portal;
// eslint-disable-next-line react-refresh/only-export-components
export const AnDialogClose = DialogPrimitive.Close;

const FullWindowOverlay =
  Platform.OS === "ios" ? RNFullWindowOverlay : Fragment;

type AnDialogOverlayPropsType = Omit<
  DialogPrimitive.OverlayProps,
  "asChild"
> & {
  children?: ReactNode;
};

export const AnDialogOverlay = ({
  className,
  children,
  ...props
}: AnDialogOverlayPropsType) => {
  const { isWeb, isNative } = usePlatformOS();

  return (
    <FullWindowOverlay>
      <DialogPrimitive.Overlay
        className={cn(
          "absolute bottom-0 left-0 right-0 top-0 z-50 flex items-center justify-center bg-black/50 p-2",
          isWeb &&
            "animate-in fade-in-0 fixed cursor-default [&>*]:cursor-auto",
          isNative && "px-6",
          className,
        )}
        {...props}
        asChild={!isWeb}>
        <AnThemedBox>
          <AnNativeOnlyAnimatedView
            entering={FadeIn.duration(200)}
            exiting={FadeOut.duration(150)}>
            <AnNativeOnlyAnimatedView
              entering={FadeIn.delay(50)}
              exiting={FadeOut.duration(150)}>
              <>{children}</>
            </AnNativeOnlyAnimatedView>
          </AnNativeOnlyAnimatedView>
        </AnThemedBox>
      </DialogPrimitive.Overlay>
    </FullWindowOverlay>
  );
};

type AnDialogContentPropsType = DialogPrimitive.ContentProps & {
  portalHost?: string;
};

export const AnDialogContent = ({
  className,
  portalHost,
  children,
  ...props
}: AnDialogContentPropsType) => {
  const { isWeb } = usePlatformOS();

  return (
    <AnDialogPortal hostName={portalHost}>
      <AnDialogOverlay>
        <DialogPrimitive.Content
          className={cn(
            "border-border bg-card z-50 mx-auto flex w-full max-w-[calc(100%-2rem)] flex-col gap-4 rounded-lg border p-6 shadow-lg shadow-black/5 sm:max-w-lg",
            isWeb && "animate-in fade-in-0 zoom-in-95 duration-200",
            className,
          )}
          {...props}>
          <>{children}</>
          <DialogPrimitive.Close
            className={cn(
              "absolute right-4 top-4 rounded opacity-70 active:opacity-100",
              isWeb &&
                "ring-offset-background focus:ring-ring data-[state=open]:bg-accent transition-opacity hover:opacity-100 focus:outline-none focus:ring-2 focus:ring-offset-2",
            )}
            hitSlop={12}>
            <AnIcon
              as={XIcon}
              className={cn(
                "text-accent-foreground web:pointer-events-none size-4 shrink-0",
              )}
            />
            <Text className="sr-only">Close</Text>
          </DialogPrimitive.Close>
        </DialogPrimitive.Content>
      </AnDialogOverlay>
    </AnDialogPortal>
  );
};

export const AnDialogHeader = ({ className, ...props }: ViewProps) => {
  return (
    <AnBox
      className={cn("flex flex-col gap-2 text-center sm:text-left", className)}
      {...props}
    />
  );
};

export const AnDialogFooter = ({ className, ...props }: ViewProps) => {
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

type AnDialogTitlePropsType = DialogPrimitive.TitleProps & ChildrenOrI18nType;

export const AnDialogTitle = ({
  className,
  children,
  i18nKey,
  i18nOptions,
  ...props
}: AnDialogTitlePropsType) => {
  return (
    <DialogPrimitive.Title {...props}>
      {children ?? (
        <AnText
          variant="headerTwo"
          i18nKey={i18nKey}
          i18nOptions={i18nOptions}
          className={cn("leading-none", className)}
        />
      )}
    </DialogPrimitive.Title>
  );
};

type AnDialogDescriptionPropsType = DialogPrimitive.DescriptionProps &
  ChildrenOrI18nType;

export const AnDialogDescription = ({
  className,
  children,
  i18nKey,
  i18nOptions,
  ...props
}: AnDialogDescriptionPropsType) => {
  return (
    <DialogPrimitive.Description {...props}>
      {children ?? (
        <AnText
          i18nKey={i18nKey}
          i18nOptions={i18nOptions}
          className={cn("text-muted-foreground", className)}
        />
      )}
    </DialogPrimitive.Description>
  );
};
