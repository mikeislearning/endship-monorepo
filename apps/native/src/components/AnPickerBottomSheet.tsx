import { ComponentType, Fragment, ReactNode, useEffect, useRef } from "react";
import {
  BottomSheetBackdrop,
  BottomSheetBackdropProps,
  BottomSheetModal,
  BottomSheetView,
} from "@gorhom/bottom-sheet";
import { Platform } from "react-native";
import { FullWindowOverlay as RNFullWindowOverlay } from "react-native-screens";

import { useAppTheme } from "@/hooks/useAppTheme";
import { I18nKeyType } from "@/i18n";
import { cn } from "@/utils/tailwind";

import { AnBox } from "./AnBox";
import { AnButton } from "./AnButton/AnButton";
import { AnText } from "./AnText/AnText";

const FullWindowOverlay = (
  Platform.OS === "ios" ? RNFullWindowOverlay : Fragment
) as ComponentType<{ children?: ReactNode }>;

type AnPickerBottomSheetPropsType = {
  isOpen: boolean;
  onOpenChange: (isOpen: boolean) => void;
  onDone?: () => void;
  i18nKey?: I18nKeyType;
  i18nOptions?: object;
  children: ReactNode;
  className?: string;
};

export const AnPickerBottomSheet = ({
  isOpen,
  onOpenChange,
  onDone,
  i18nKey,
  i18nOptions,
  children,
  className,
}: AnPickerBottomSheetPropsType) => {
  const { resolvedColors } = useAppTheme();
  const bottomSheetRef = useRef<BottomSheetModal>(null);

  useEffect(() => {
    if (isOpen) {
      bottomSheetRef.current?.present();
    }
  }, [isOpen]);

  const renderBackdrop = (props: BottomSheetBackdropProps) => {
    return (
      <BottomSheetBackdrop
        {...props}
        opacity={0.85}
        appearsOnIndex={0}
        disappearsOnIndex={-1}
      />
    );
  };

  const handleSheetChanges = (index: number) => {
    onOpenChange(index >= 0);
  };

  const handleDone = () => {
    onDone?.();
    bottomSheetRef.current?.dismiss();
  };

  return (
    <BottomSheetModal
      ref={bottomSheetRef}
      containerComponent={FullWindowOverlay}
      onChange={handleSheetChanges}
      enableDynamicSizing
      backdropComponent={renderBackdrop}
      onDismiss={() => onOpenChange(false)}
      handleIndicatorStyle={{
        width: 40,
        backgroundColor: resolvedColors.border,
      }}
      backgroundStyle={{
        backgroundColor: resolvedColors.background,
      }}>
      <BottomSheetView>
        <AnBox className={cn("pb-safe-or-2 px-4", className)}>
          <AnBox className="flex-row items-center justify-between">
            <AnBox className="flex-1">
              {i18nKey && (
                <AnText
                  i18nKey={i18nKey}
                  i18nOptions={i18nOptions}
                  variant="headerThree"
                />
              )}
            </AnBox>
            <AnButton
              className="-mr-2.5"
              variant="ghost"
              i18nKey="common:done"
              onPress={handleDone}
            />
          </AnBox>
          {children}
        </AnBox>
      </BottomSheetView>
    </BottomSheetModal>
  );
};
