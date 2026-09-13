import { ReactNode, RefAttributes, useState } from "react";
import { MaskGenerator, useNativeMask } from "react-hook-mask";
import {
  BlurEvent,
  FocusEvent,
  TextInput,
  type TextInputProps,
} from "react-native";

import { useAppTheme } from "@/hooks/useAppTheme";
import { usePlatformOS } from "@/hooks/usePlatformOS";
import { useTranslate } from "@/hooks/useTranslate";
import { I18nKeyType } from "@/i18n";
import { cn } from "@/utils/tailwind";

import { AnBox } from "../AnBox";

export type BaseTextInputPropsType = TextInputProps &
  RefAttributes<TextInput> & {
    onChange?: (value: string | number | undefined) => void;
    i18nKey?: I18nKeyType;
    i18nOptions?: object;
    leftElement?: ReactNode;
    rightElement?: ReactNode;
    isNumber?: boolean;
    isMultiline?: boolean;
    hasError?: boolean;
    mask?: {
      maskGenerator?: MaskGenerator;
    };
  };

export const BaseTextInput = ({
  className,
  placeholderClassName,
  leftElement,
  rightElement,
  mask,
  i18nKey,
  i18nOptions,
  placeholder,
  isNumber = false,
  isMultiline = false,
  hasError = false,
  onBlur,
  onFocus,
  onChange,
  ...props
}: BaseTextInputPropsType) => {
  const { resolvedColors } = useAppTheme();
  const { isWeb, isNative, isIOS } = usePlatformOS();

  const [isFocused, setIsFocused] = useState(false);

  const maskedProps = useNativeMask({
    ...mask,
    ...props,
    onChange: props.onChangeText,
    keepMask: false,
    waitToUpdateCursor: isIOS,
  });

  const hasLeftElement = Boolean(leftElement);
  const hasRightElement = Boolean(rightElement);

  const placeholderText = useTranslate(i18nKey, i18nOptions) ?? placeholder;
  const value = mask ? maskedProps.value : props.value;

  const handleOnFocus = (e: FocusEvent) => {
    setIsFocused(true);
    onFocus?.(e);
  };

  const handleOnBlur = (e: BlurEvent) => {
    setIsFocused(false);
    // On blur, convert partial decimal inputs to final number
    if (isNumber && typeof value === "string") {
      const numericValue = Number(value);
      if (!isNaN(numericValue)) {
        onChange?.(numericValue);
      } else if (value === "" || value === ".") {
        onChange?.(undefined);
      }
    }
    onBlur?.(e);
  };

  return (
    <AnBox className="relative flex-1 items-center">
      {hasLeftElement && (
        <AnBox className="text-muted-foreground absolute bottom-0 left-2 top-0 flex w-4 items-center justify-center">
          {leftElement}
        </AnBox>
      )}
      <TextInput
        {...props}
        {...(mask ? maskedProps : {})}
        onBlur={handleOnBlur}
        onFocus={handleOnFocus}
        placeholder={placeholderText}
        multiline={isMultiline}
        textAlignVertical={isMultiline ? "top" : "center"}
        placeholderTextColor={resolvedColors.mutedForeground}
        className={cn(
          "dark:bg-background/50 border-input bg-background text-foreground flex h-10 w-full min-w-0 flex-row items-center rounded-md border px-3 py-1 text-base leading-5 shadow-sm shadow-black/5 sm:h-9",
          isMultiline &&
            "native:h-full native:py-2.5 h-full min-h-[124px] py-2",
          props.editable === false &&
            cn("opacity-50", {
              "disabled:pointer-events-none disabled:cursor-not-allowed": isWeb,
            }),
          isWeb &&
            "aria-invalid:ring-destructive/20 dark:aria-invalid:ring-destructive/40 aria-invalid:border-destructive focus-visible:ring-ring/50 selection:bg-primary selection:text-primary-foreground focus-visible:border-ring web:placeholder:text-muted-foreground outline-none transition-[color,box-shadow] focus-visible:ring-[3px] md:text-sm",
          isNative &&
            cn("placeholder:text-muted-foreground/50", {
              "border-primary": isFocused && !hasError,
              "border-destructive": hasError,
            }),
          className,
        )}
      />
      {hasRightElement && (
        <AnBox className="text-muted-foreground absolute bottom-0 right-2 top-0 flex w-4 items-center justify-center">
          {rightElement}
        </AnBox>
      )}
    </AnBox>
  );
};
