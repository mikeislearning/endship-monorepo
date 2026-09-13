import SegmentedControl from "@react-native-segmented-control/segmented-control";
import { t } from "i18next";

import { useAppTheme } from "@/hooks/useAppTheme";
import { I18nKeyType } from "@/i18n";
import { PRIMARY_FONT } from "@/theme/fonts";
import { cn } from "@/utils/tailwind";

import { AnBox } from "./AnBox";

type AnSegmentedControlPropsType<T> = {
  value: T;
  options: {
    i18nKey: I18nKeyType;
    i18nOptions?: Record<string, unknown>;
    value: T;
  }[];
  onChange: (value: T) => void;
  className?: string;
};

export const AnSegmentedControl = <T,>({
  value,
  options,
  onChange,
  className,
}: AnSegmentedControlPropsType<T>) => {
  const { resolvedColors, isDarkMode } = useAppTheme();

  return (
    <AnBox
      className={cn(
        "bg-secondary dark:bg-muted rounded-[10px] p-[3px]",
        className,
      )}>
      <SegmentedControl
        fontStyle={{
          color: resolvedColors.mutedForeground,
          fontFamily: PRIMARY_FONT.MEDIUM,
          fontSize: 14,
        }}
        activeFontStyle={{
          color: isDarkMode
            ? resolvedColors.background
            : resolvedColors.foreground,
          fontFamily: PRIMARY_FONT.MEDIUM,
          fontWeight: "500",
          fontSize: 14,
        }}
        sliderStyle={{
          borderColor: isDarkMode
            ? resolvedColors.primary
            : resolvedColors.background,
          backgroundColor: isDarkMode
            ? resolvedColors.primary
            : resolvedColors.background,
          borderRadius: 8,
        }}
        style={{
          height: 30,
        }}
        backgroundColor={
          isDarkMode ? resolvedColors.muted : resolvedColors.secondary
        }
        values={options.map(option => t(option.i18nKey, option.i18nOptions))}
        selectedIndex={options.findIndex(option => option.value === value)}
        onChange={event => {
          const selectedValue =
            options[event.nativeEvent.selectedSegmentIndex]!.value;
          onChange(selectedValue);
        }}
      />
    </AnBox>
  );
};
