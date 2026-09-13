import { useRef, useState } from "react";
import { Control, FieldValues, Path } from "react-hook-form";

import {
  AwFormDescription,
  AwFormErrorMessage,
  AwFormField,
  AwFormItem,
  AwFormLabel,
} from "@/components/AwForm";
import { I18nKeyType } from "@/i18n";
import { cn } from "@/utils/tailwind";
import { convert12HourTo24Hour } from "@/utils/time";

import { BaseTextSelect } from "../AwSelectInput/BaseTextSelect";
import { BaseTimePickerInput } from "./BaseTimePickerInput";

export type PeriodType = "AM" | "PM";

type AwTimeInputPropsType<T extends FieldValues> = {
  name: Path<T>;
  control: Control<T>;
  className?: string;
  labelI18nKey?: I18nKeyType;
  labelI18nOptions?: object;
  placeholderI18nKey?: I18nKeyType;
  placeholderI18nOptions?: object;
  descriptionI18nKey?: I18nKeyType;
  descriptionI18nOptions?: object;
  errorI18nKey?: I18nKeyType;
  errorI18nOptions?: object;
  timeFormat?: "12" | "24";
  showError?: boolean;
  onValueChange?: (value: string) => void;
  isRequired?: boolean;
  allowPastTimes?: boolean;
};

export const AwTimePickerInput = <T extends FieldValues>({
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
}: AwTimeInputPropsType<T>) => {
  // We need to declare refs at the component level, not inside the render function
  const hourRef = useRef<HTMLInputElement>(null);
  const minuteRef = useRef<HTMLInputElement>(null);

  // State for period selection (AM/PM) when in 12-hour format
  const [period, setPeriod] = useState<PeriodType>(
    // Initialize based on current time
    new Date().getHours() >= 12 ? "PM" : "AM",
  );

  return (
    <AwFormField
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
          <AwFormItem>
            <div className={cn("flex flex-col gap-2", className)}>
              {labelI18nKey && (
                <AwFormLabel
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
                <div className="text-center font-bold">:</div>

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
                  <div className="ml-2 flex h-9 w-17.5 items-center">
                    <BaseTextSelect
                      value={activePeriod}
                      options={[
                        { value: "AM", label: "AM" },
                        { value: "PM", label: "PM" },
                      ]}
                      isClearable={false}
                      onValueChange={selection => {
                        const newPeriod = selection!.value as PeriodType;
                        const newDate = new Date(dateValue);
                        const currentHours24 = newDate.getHours();

                        // Get the current hours in 12-hour format
                        const currentHours12 = currentHours24 % 12 || 12;

                        // Use utility function to convert 12-hour to 24-hour with new period
                        const newHours24 = convert12HourTo24Hour(
                          currentHours12,
                          newPeriod,
                        );

                        // Only update if there's an actual change
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
                <AwFormDescription
                  i18nKey={descriptionI18nKey}
                  i18nOptions={descriptionI18nOptions}
                />
              )}
            </div>
            {showError && (
              <AwFormErrorMessage
                i18nKey={errorI18nKey}
                i18nOptions={errorI18nOptions}
              />
            )}
          </AwFormItem>
        );
      }}
    />
  );
};
