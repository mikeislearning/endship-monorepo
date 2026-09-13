import { KeyboardEvent, useState } from "react";

import { cn } from "@/utils/tailwind";
import {
  getArrowByType,
  getDateByType,
  getValid12Hour,
  getValidHour,
  getValidMinuteOrSecond,
  setDateByType,
} from "@/utils/time";

import {
  BaseTextInput,
  BaseTextInputPropsType,
} from "../AwTextInput/BaseTextInput";

// Define Period type used by the time picker
export type PeriodType = "AM" | "PM";

type BaseTimePickerInputPropsType = BaseTextInputPropsType & {
  picker: "hours" | "minutes" | "seconds" | "12hours";
  date: Date;
  setDate: (date: Date | undefined) => void;
  period?: PeriodType;
  onRightFocus?: () => void;
  onLeftFocus?: () => void;
};

export const BaseTimePickerInput = ({
  picker,
  date,
  setDate,
  period,
  onRightFocus,
  onLeftFocus,
  ...props
}: BaseTimePickerInputPropsType) => {
  const [value, setValue] = useState<string>(() =>
    date ? getDateByType(date, picker) : "",
  );

  // Sync local value when date/picker change from outside (without useEffect to avoid cascading renders)
  const [prevDate, setPrevDate] = useState(date);
  const [prevPicker, setPrevPicker] = useState(picker);
  if (prevDate !== date || prevPicker !== picker) {
    setPrevDate(date);
    setPrevPicker(picker);
    if (date) setValue(getDateByType(date, picker));
  }

  // Handle keyboard input and arrows
  const handleKeyDown = (e: KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Tab") return;
    e.preventDefault();

    // Handle arrow navigation
    if (e.key === "ArrowRight") onRightFocus?.();
    if (e.key === "ArrowLeft") onLeftFocus?.();

    // Handle up/down to increment/decrement
    if (e.key === "ArrowUp" || e.key === "ArrowDown") {
      const step = e.key === "ArrowUp" ? 1 : -1;
      const newDate = new Date(date);

      // Get the new value using our utility function
      const newValue = getArrowByType({
        value: value,
        step: step,
        type: picker,
      });

      // Set the new value both in UI and in the date object
      setValue(newValue);

      // Update the date object using the utility function
      setDateByType({
        date: newDate,
        value: newValue,
        type: picker,
        period,
      });

      setDate(newDate);
    }

    // Handle number input
    if (e.key >= "0" && e.key <= "9") {
      const digit = e.key;

      // Shift current value left and add new digit
      const newValue = (value.slice(1) + digit).slice(-2);
      setValue(newValue);

      // Update the date based on the new value
      const newDate = new Date(date);

      switch (picker) {
        case "hours": {
          // Use utility function to validate and set hours
          const validHour = getValidHour(newValue);
          setValue(validHour);
          setDateByType({
            date: newDate,
            value: validHour,
            type: "hours",
          });
          setDate(newDate);
          break;
        }
        case "minutes": {
          // Special handling for first digit > 5
          let valueToValidate = newValue;
          const numberDigit = Number(digit);
          if (numberDigit >= 60 && (value === "00" || value === "")) {
            // If first digit is 6 or higher, treat as single digit
            valueToValidate = "0" + digit;
          }

          // Use utility function to validate and set minutes
          const validMinutes = getValidMinuteOrSecond(valueToValidate);
          setValue(validMinutes);

          setDateByType({
            date: newDate,
            value: validMinutes,
            type: "minutes",
          });
          setDate(newDate);
          break;
        }
        case "seconds": {
          // Special handling for first digit > 5
          let valueToValidate = newValue;
          if (digit >= "6" && (value === "00" || value === "")) {
            // If first digit is 6 or higher, treat as single digit
            valueToValidate = "0" + digit;
          }

          // Use utility function to validate and set seconds
          const validSeconds = getValidMinuteOrSecond(valueToValidate);
          setValue(validSeconds);

          setDateByType({
            date: newDate,
            value: validSeconds,
            type: "seconds",
          });
          setDate(newDate);
          break;
        }
        case "12hours": {
          let valueToUse;

          // Handle special cases for 12-hour format
          if (value === "" || value === "0" || value === "00") {
            // Ignore 0 in 12-hour format (valid values are 1-12)
            if (digit === "0") break;
            valueToUse = digit; // Use the digit as-is
          } else if (
            value.length === 1 &&
            parseInt(value, 10) >= 1 &&
            parseInt(value, 10) <= 9
          ) {
            // Handle adding a second digit to a single digit
            const firstDigit = parseInt(value, 10);
            const secondDigit = parseInt(digit, 10);
            const combinedValue = firstDigit * 10 + secondDigit;

            // Only accept values 10-12, otherwise start over with the new digit
            valueToUse =
              combinedValue >= 10 && combinedValue <= 12
                ? combinedValue.toString()
                : digit;
          } else {
            // For all other cases, check if the resulting value would be valid (1-12)
            const numValue = parseInt((value.slice(1) + digit).slice(-2), 10);
            valueToUse =
              numValue >= 1 && numValue <= 12
                ? numValue.toString()
                : parseInt(digit, 10) >= 1
                  ? digit
                  : value; // Fallback to the digit if valid, or keep current value
          }

          // Validate with utility function to ensure value is valid for 12-hour format
          const valid12Hour = getValid12Hour(valueToUse);
          setValue(valid12Hour);

          // Update the date using the validated value and current period
          setDateByType({
            date: newDate,
            value: valid12Hour,
            type: "12hours",
            period,
          });

          setDate(newDate);
          break;
        }
      }
    }
  };

  return (
    <BaseTextInput
      type="number"
      inputMode="numeric"
      pattern="\d*"
      className={cn(
        "text-center tabular-nums caret-transparent [&::-webkit-inner-spin-button]:appearance-none",
        "w-12", // Use same width for both hour formats
      )}
      value={value}
      onChange={e => {
        // This will mostly be unused due to our keyDown handler
        setValue(e.target.value);
      }}
      onKeyDown={handleKeyDown}
      {...props}
    />
  );
};
