import { useState } from "react";
import { Clock3Icon } from "lucide-react-native";
import { useWindowDimensions } from "react-native";
import TimePicker from "react-native-date-picker";

import { ISO_TIME_FORMAT } from "@/domain/constants";
import { useTranslate } from "@/hooks/useTranslate";
import { I18nKeyType } from "@/i18n";
import { dateAsDayjs, formatToHumanFriendlyTime } from "@/utils/date";
import { cn } from "@/utils/tailwind";

import { AnBox } from "../AnBox";
import { AnIcon } from "../AnIcon";
import { AnPickerBottomSheet } from "../AnPickerBottomSheet";
import { AnText } from "../AnText/AnText";
import { AnTouchableOpacity } from "../AnTouchableOpacity";

const HORIZONTAL_PADDING = 16;

export type BaseTimePickerInputPropsType = {
  i18nKey?: I18nKeyType;
  i18nOptions?: object;
  isDisabled?: boolean;
  hasError?: boolean;
  value?: string;
  minimumDate?: Date;
  onChange: (value: string) => void;
};

export const BaseTimePickerInput = ({
  i18nKey,
  i18nOptions,
  isDisabled,
  hasError,
  value,
  minimumDate,
  onChange,
}: BaseTimePickerInputPropsType) => {
  const { width: screenWidth } = useWindowDimensions();
  const [shouldShowPicker, setShouldShowPicker] = useState(false);
  const [tempDate, setTempDate] = useState<Date>(
    value
      ? dateAsDayjs(value, ISO_TIME_FORMAT).toDate()
      : dateAsDayjs().toDate(),
  );

  const placeholderText = useTranslate(i18nKey, i18nOptions);

  const handleOpenChange = (isOpen: boolean) => {
    if (isOpen) {
      setTempDate(
        value
          ? dateAsDayjs(value, ISO_TIME_FORMAT).toDate()
          : dateAsDayjs().toDate(),
      );
    }
    setShouldShowPicker(isOpen);
  };

  const handleDone = () => {
    onChange(dateAsDayjs(tempDate).format(ISO_TIME_FORMAT));
  };

  return (
    <>
      <AnTouchableOpacity
        shouldDebounce={false}
        className={cn(
          "native:h-12 border-input bg-background dark:bg-background/50 mt-0 h-12 justify-center rounded-md border px-3",
          {
            "border-destructive": hasError,
          },
        )}
        disabled={isDisabled}
        onPress={() => handleOpenChange(true)}>
        <AnBox className="flex-row items-center justify-between">
          <AnText
            variant="mdMedium"
            className={cn("text-foreground flex-1", {
              "text-muted-foreground": !value,
            })}>
            {value
              ? formatToHumanFriendlyTime(value, ISO_TIME_FORMAT)
              : placeholderText}
          </AnText>
          <AnIcon as={Clock3Icon} />
        </AnBox>
      </AnTouchableOpacity>
      <AnPickerBottomSheet
        isOpen={shouldShowPicker}
        onOpenChange={handleOpenChange}
        onDone={handleDone}>
        <TimePicker
          mode="time"
          date={tempDate}
          minimumDate={minimumDate}
          onDateChange={setTempDate}
          style={{ width: screenWidth - HORIZONTAL_PADDING * 2 }}
        />
      </AnPickerBottomSheet>
    </>
  );
};
