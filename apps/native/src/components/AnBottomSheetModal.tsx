import {
  ComponentProps,
  ReactNode,
  RefObject,
  useCallback,
  useRef,
} from "react";
import {
  BottomSheetBackdrop,
  BottomSheetBackdropProps,
  BottomSheetModal,
} from "@gorhom/bottom-sheet";
import { XIcon } from "lucide-react-native";
import { Keyboard } from "react-native";

import { useAppTheme } from "@/hooks/useAppTheme";
import { I18nKeyType } from "@/i18n";
import { cn } from "@/utils/tailwind";

import { AnBox } from "./AnBox";
import { AnIcon } from "./AnIcon";
import { AnText } from "./AnText/AnText";
import { AnTouchableOpacity } from "./AnTouchableOpacity";

type AnBottomSheetPropType = ComponentProps<typeof BottomSheetModal> & {
  ref: RefObject<BottomSheetModal | null>;
  i18nKey?: I18nKeyType;
  i18nOptions?: object;
  subtitleI18nKey?: I18nKeyType;
  subTitleI18nOptions?: object;
  children: ReactNode;
  onDismiss?: () => void;
  renderFooter?: () => ReactNode;
  onStateChange?: (isOpen: boolean) => void;
  shouldInterceptDismiss?: () => boolean;
};

export const AnBottomSheetModal = ({
  ref,
  i18nKey,
  i18nOptions,
  subtitleI18nKey,
  subTitleI18nOptions,
  children,
  onDismiss,
  renderFooter,
  onStateChange,
  shouldInterceptDismiss,
}: AnBottomSheetPropType) => {
  const { resolvedColors } = useAppTheme();
  const isInterceptingRef = useRef(false);

  const renderBackdrop = useCallback((props: BottomSheetBackdropProps) => {
    return (
      <BottomSheetBackdrop
        {...props}
        opacity={0.85}
        appearsOnIndex={0}
        disappearsOnIndex={-1}
      />
    );
  }, []);

  const handleSheetChanges = useCallback(
    (index: number) => {
      if (index < 1) {
        Keyboard.dismiss();
      }

      // Spring the modal back up when the user swipes to dismiss and interception is active
      if (index === -1 && shouldInterceptDismiss?.()) {
        isInterceptingRef.current = true;
        ref.current?.present();
        return;
      }

      onStateChange?.(index >= 0);
    },
    [onStateChange, shouldInterceptDismiss, ref],
  );

  const handleDismiss = useCallback(() => {
    // Suppress the onDismiss call triggered by the spring-back re-present
    if (isInterceptingRef.current) {
      isInterceptingRef.current = false;
      return;
    }
    onDismiss?.();
  }, [onDismiss]);

  return (
    <BottomSheetModal
      ref={ref}
      onChange={handleSheetChanges}
      enableDynamicSizing={false}
      snapPoints={["91%"]}
      backdropComponent={renderBackdrop}
      footerComponent={renderFooter}
      onDismiss={handleDismiss}
      handleIndicatorStyle={{
        width: 40,
        backgroundColor: resolvedColors.border,
      }}
      backgroundStyle={{
        backgroundColor: resolvedColors.background,
      }}>
      <AnBox
        className={cn(
          "border-border w-full flex-row items-center gap-5 border-b p-4",
          subtitleI18nKey && "py-[8.5px]",
        )}>
        <AnTouchableOpacity
          onPress={() => {
            ref.current?.dismiss();
          }}
          className="h-6 items-center justify-center">
          <AnIcon as={XIcon} size={22} />
        </AnTouchableOpacity>
        <AnBox>
          {i18nKey && (
            <AnText
              i18nKey={i18nKey}
              i18nOptions={i18nOptions}
              variant="headerThree"
              className="leading-[24px]"
            />
          )}
          {subtitleI18nKey && (
            <AnText
              i18nKey={subtitleI18nKey}
              i18nOptions={subTitleI18nOptions}
              variant="smMedium"
              className="text-muted-foreground pt-0.5"
            />
          )}
        </AnBox>
      </AnBox>
      {children}
    </BottomSheetModal>
  );
};
