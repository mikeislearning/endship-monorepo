import { useCallback, useState } from "react";
import {
  CalendarIcon,
  ChevronLeftIcon,
  ChevronRightIcon,
} from "lucide-react-native";
import { LayoutChangeEvent, View } from "react-native";
import DatePicker, {
  DateType,
  useDefaultClassNames,
} from "react-native-ui-datepicker";

import { useTranslate } from "@/hooks/useTranslate";
import { I18nKeyType } from "@/i18n";
import { dateAsDayjs, formatDateToIso } from "@/utils/date";
import { cn } from "@/utils/tailwind";

import { AnBox } from "../AnBox";
import { AnIcon } from "../AnIcon";
import { AnPickerBottomSheet } from "../AnPickerBottomSheet";
import { AnText } from "../AnText/AnText";
import { textVariants } from "../AnText/variants";
import { AnTouchableOpacity } from "../AnTouchableOpacity";

// Height of the weekday labels row inside react-native-ui-datepicker
const DATEPICKER_WEEKDAYS_HEIGHT = 25;

type BaseDatePickerPropsType = {
  value?: string;
  shouldDisablePastDates?: boolean;
  maximumDate?: Date;
  onChange: (value: string) => void;
  className?: string;
};

export const BaseDatePicker = ({
  value,
  onChange,
  shouldDisablePastDates = false,
  maximumDate,
  className,
}: BaseDatePickerPropsType) => {
  const defaultClassNames = useDefaultClassNames();
  const [calendarWidth, setCalendarWidth] = useState(0);

  const handleLayout = useCallback(
    (e: LayoutChangeEvent) => setCalendarWidth(e.nativeEvent.layout.width),
    [],
  );

  // day_cell has aspectRatio:1, so each cell is calendarWidth/7 tall.
  // Always size for 6 rows (the max any month needs) so months with more
  // rows never overflow and the bottom sheet never needs to resize mid-navigation.
  const containerHeight =
    calendarWidth > 0
      ? DATEPICKER_WEEKDAYS_HEIGHT + 6 * (calendarWidth / 7)
      : undefined;

  return (
    <View onLayout={handleLayout}>
      <DatePicker
        mode="single"
        date={value ? dateAsDayjs(value).toDate() : undefined}
        minDate={shouldDisablePastDates ? dateAsDayjs().toDate() : undefined}
        maxDate={maximumDate}
        navigationPosition="right"
        weekdaysFormat="min"
        showOutsideDays
        containerHeight={containerHeight}
        components={{
          IconPrev: (
            <AnIcon
              as={ChevronLeftIcon}
              size={20}
              className="text-foreground"
            />
          ),
          IconNext: (
            <AnIcon
              as={ChevronRightIcon}
              size={20}
              className="text-foreground"
            />
          ),
        }}
        className={cn("bg-card pb-0", className)}
        styles={{
          years: {
            justifyContent: "flex-start",
          },
          months: {
            justifyContent: "flex-start",
          },
          day_cell: {
            aspectRatio: 1,
            padding: 4,
          },
        }}
        classNames={{
          ...defaultClassNames,
          month_selector_label: cn(
            textVariants({
              variant: "headerThree",
            }),
            "text-foreground",
          ),
          year_selector_label: cn(
            textVariants({
              variant: "headerThree",
            }),
            "text-foreground",
          ),
          weekdays: "text-muted-foreground mb-1",
          weekday_label: cn(
            textVariants(),
            "text-muted-foreground text-center",
          ),
          day_label: cn(textVariants(), "text-foreground text-center"),
          selected: cn(
            textVariants(),
            "bg-primary text-primary-foreground rounded-md",
          ),
          today: "bg-accent rounded-md",
          outside: "opacity-50",
        }}
        onChange={({ date }: { date: DateType }) => {
          onChange(formatDateToIso(date));
        }}
      />
    </View>
  );
};

export type BaseDatePickerInputPropsType = BaseDatePickerPropsType & {
  i18nKey?: I18nKeyType;
  i18nOptions?: object;
  isDisabled?: boolean;
  hasError?: boolean;
  displayFormat?: string;
};

export const BaseDatePickerInput = ({
  i18nKey,
  i18nOptions,
  isDisabled,
  hasError,
  displayFormat = "dddd, MMM D",
  value,
  onChange,
  ...props
}: BaseDatePickerInputPropsType) => {
  const [shouldShowPicker, setShouldShowPicker] = useState(false);
  const [tempValue, setTempValue] = useState<string | undefined>(value);

  const placeholderText = useTranslate(i18nKey, i18nOptions);

  const handleOpenChange = (isOpen: boolean) => {
    if (isOpen) {
      setTempValue(value);
    }
    setShouldShowPicker(isOpen);
  };

  const handleDone = () => {
    if (tempValue) {
      onChange(tempValue);
    }
  };

  return (
    <>
      <AnTouchableOpacity
        shouldDebounce={false}
        disabled={isDisabled}
        className={cn(
          "border-input bg-background dark:bg-background/50 mt-0 h-12 justify-center rounded-md border px-3 sm:h-9",
          {
            "border-destructive": hasError,
          },
        )}
        onPress={() => handleOpenChange(true)}>
        <AnBox className="flex-row items-center gap-2">
          <AnIcon as={CalendarIcon} />
          <AnText
            variant="mdMedium"
            numberOfLines={1}
            className={cn("text-foreground", {
              "text-muted-foreground": !value,
            })}>
            {value ? dateAsDayjs(value).format(displayFormat) : placeholderText}
          </AnText>
        </AnBox>
      </AnTouchableOpacity>
      <AnPickerBottomSheet
        isOpen={shouldShowPicker}
        onOpenChange={handleOpenChange}
        onDone={handleDone}>
        <BaseDatePicker value={tempValue} onChange={setTempValue} {...props} />
      </AnPickerBottomSheet>
    </>
  );
};
