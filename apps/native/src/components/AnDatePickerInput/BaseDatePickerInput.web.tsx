import { useState } from "react";
import {
  CalendarIcon,
  ChevronLeftIcon,
  ChevronRightIcon,
} from "lucide-react-native";
import DatePicker, {
  DateType,
  useDefaultClassNames,
} from "react-native-ui-datepicker";

import { useTranslate } from "@/hooks/useTranslate";
import { I18nKeyType } from "@/i18n";
import { dateAsDayjs, formatDateToIso } from "@/utils/date";
import { cn } from "@/utils/tailwind";

import { AnBox } from "../AnBox";
import { AnDialog, AnDialogContent } from "../AnDialog";
import { AnIcon } from "../AnIcon";
import { AnText } from "../AnText/AnText";
import { textVariants } from "../AnText/variants";
import { AnTouchableOpacity } from "../AnTouchableOpacity";

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

  return (
    <DatePicker
      mode="single"
      date={value ? dateAsDayjs(value).toDate() : undefined}
      minDate={shouldDisablePastDates ? dateAsDayjs().toDate() : undefined}
      maxDate={maximumDate}
      navigationPosition="right"
      weekdaysFormat="min"
      showOutsideDays
      components={{
        IconPrev: (
          <AnIcon as={ChevronLeftIcon} size={20} className="text-foreground" />
        ),
        IconNext: (
          <AnIcon as={ChevronRightIcon} size={20} className="text-foreground" />
        ),
      }}
      className={cn("bg-card w-[321px] pb-0 pl-2.5 pr-1.5 pt-2.5", className)}
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
        weekday_label: cn(textVariants(), "text-muted-foreground text-center"),
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

  const placeholderText = useTranslate(i18nKey, i18nOptions);

  return (
    <>
      <AnTouchableOpacity
        shouldDebounce={false}
        disabled={isDisabled}
        className={cn(
          "border-input bg-background dark:bg-background/50 mt-0 h-10 justify-center rounded-md border px-3 sm:h-9",
          {
            "border-destructive": hasError,
          },
        )}
        onPress={() => setShouldShowPicker(true)}>
        <AnBox className="flex-row items-center gap-2">
          <AnIcon as={CalendarIcon} />
          <AnText
            variant="mdMedium"
            className={cn("text-foreground", {
              "text-muted-foreground": !value,
            })}>
            {value ? dateAsDayjs(value).format(displayFormat) : placeholderText}
          </AnText>
        </AnBox>
      </AnTouchableOpacity>
      <AnDialog open={shouldShowPicker} onOpenChange={setShouldShowPicker}>
        <AnDialogContent>
          <BaseDatePicker value={value} onChange={onChange} {...props} />
        </AnDialogContent>
      </AnDialog>
    </>
  );
};
