import { useRef, useState } from "react";
import { FieldValues } from "react-hook-form";
import { TextInput } from "react-native";

import {
  AnFormDescription,
  AnFormErrorMessage,
  AnFormField,
  AnFormItem,
  AnFormLabel,
  BaseFormInputPropsType,
} from "@/components/AnForm";
import { I18nKeyType } from "@/i18n";
import { cn } from "@/utils/tailwind";
import { convert12HourTo24Hour } from "@/utils/time";

import { AnSegmentedControl } from "../AnSegmentedControl";
import { BaseTimePickerInput } from "./BaseTimePickerInput";

export type PeriodType = "AM" | "PM";

type AnTimeInputPropsType<T extends FieldValues> = BaseFormInputPropsType<T> & {
  onValueChange?: (value: string) => void;
  timeFormat?: "12" | "24";
  allowPastTimes?: boolean;
  minimumDate?: Date;
  placeholderI18nKey?: I18nKeyType;
};

export const AnTimePickerInput = <T extends FieldValues>({
  name,
  control,
  labelI18nKey,
  labelI18nOptions,
  descriptionI18nKey,
  descriptionI18nOptions,
  timeFormat = "12",
  showError = true,
  errorI18nKey,
  errorI18nOptions,
  className,
  onValueChange,
  isRequired = true,
}: AnTimeInputPropsType<T>) => {
  // We need to declare refs at the component level, not inside the render function
  const hourRef = useRef<TextInput>(null);
  const minuteRef = useRef<TextInput>(null);

  // State for period selection (AM/PM) when in 12-hour format
  const [period, setPeriod] = useState<PeriodType>(
    // Initialize based on current time
    new Date().getHours() >= 12 ? "PM" : "AM",
  );

  return (
    <AnFormField
      name={name}
      control={control}
      render={({ field }) => {
        // Parse value to date - handle as function, not useMemo in callback
        const getDateFromValue = () => {
          if (!field.value) return new Date();

          if (typeof field.value === "string") {
            // Try to parse from HH:MM format
            const stringValue = field.value as string;
            const timeParts = stringValue.split(":");
            const hoursStr = timeParts[0] ?? "0";
            const minutesStr = timeParts[1] ?? "0";

            const hours = parseInt(hoursStr, 10);
            const minutes = parseInt(minutesStr, 10);

            const date = new Date();
            date.setHours(hours);
            date.setMinutes(minutes);

            return date;
          }

          return new Date(field.value);
        };

        // Get initial date value
        const dateValue = getDateFromValue();

        // Derive period from the parsed date value to avoid setState during render
        const activePeriod: PeriodType =
          timeFormat === "12"
            ? dateValue.getHours() >= 12
              ? "PM"
              : "AM"
            : period;

        // Update the date and then get the formatted time back
        const handleDateChange = (date: Date | undefined) => {
          if (date) {
            // Always ensure hours and minutes are within valid ranges
            const hours = date.getHours();
            const minutes = date.getMinutes();

            // Update period based on hours if in 12-hour format
            const newPeriod = hours >= 12 ? "PM" : "AM";
            if (timeFormat === "12" && activePeriod !== newPeriod) {
              setPeriod(newPeriod);
            }

            // Format as HH:MM with leading zeros
            const formattedHours = hours.toString().padStart(2, "0");
            const formattedMinutes = minutes.toString().padStart(2, "0");
            const formattedTime = `${formattedHours}:${formattedMinutes}`;

            field.onChange(formattedTime);
            if (onValueChange) {
              onValueChange(formattedTime);
            }
          }
        };

        return (
          <AnFormItem>
            <div className={cn("flex flex-col gap-2", className)}>
              {labelI18nKey && (
                <AnFormLabel
                  i18nKey={labelI18nKey}
                  i18nOptions={labelI18nOptions}
                  isRequired={isRequired}
                />
              )}

              <div className="flex items-center gap-2">
                {/* Hour input */}
                <div className="grid gap-1 text-center">
                  <BaseTimePickerInput
                    picker={timeFormat === "12" ? "12hours" : "hours"}
                    date={dateValue}
                    setDate={handleDateChange}
                    period={activePeriod}
                    ref={hourRef}
                    onRightFocus={() => minuteRef.current?.focus()}
                  />
                </div>

                {/* Colon separator */}
                <span className="text-muted-foreground text-center font-bold">
                  :
                </span>

                {/* Minute input */}
                <div className="grid gap-1 text-center">
                  <BaseTimePickerInput
                    picker="minutes"
                    date={dateValue}
                    setDate={handleDateChange}
                    ref={minuteRef}
                    onLeftFocus={() => hourRef.current?.focus()}
                  />
                </div>

                {/* AM/PM selector dropdown (only shown in 12-hour mode) */}
                {timeFormat === "12" && (
                  <div className="ml-2 flex h-9 items-center">
                    <AnSegmentedControl<PeriodType>
                      value={activePeriod}
                      options={[
                        { i18nKey: "common:time.am", value: "AM" },
                        { i18nKey: "common:time.pm", value: "PM" },
                      ]}
                      className="w-20"
                      onChange={newPeriod => {
                        const newDate = new Date(dateValue);
                        const currentHours24 = newDate.getHours();
                        const currentHours12 = currentHours24 % 12 || 12;
                        const newHours24 = convert12HourTo24Hour(
                          currentHours12,
                          newPeriod,
                        );
                        if (newHours24 !== currentHours24) {
                          newDate.setHours(newHours24);
                          handleDateChange(newDate);
                        } else {
                          // No hour change, just update period state
                          setPeriod(newPeriod);
                        }
                      }}
                    />
                  </div>
                )}
              </div>

              {descriptionI18nKey && (
                <AnFormDescription
                  i18nKey={descriptionI18nKey}
                  i18nOptions={descriptionI18nOptions}
                />
              )}
            </div>
            {showError && (
              <AnFormErrorMessage
                i18nKey={errorI18nKey}
                i18nOptions={errorI18nOptions}
              />
            )}
          </AnFormItem>
        );
      }}
    />
  );
};
