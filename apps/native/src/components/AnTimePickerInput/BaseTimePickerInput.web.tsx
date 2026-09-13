import { useState } from "react";
import { BlurEvent, TextInputKeyPressEvent } from "react-native";

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
} from "../AnTextInput/BaseTextInput";

export type PeriodType = "AM" | "PM";

export type BaseTimePickerInputPropsType = Omit<
  BaseTextInputPropsType,
  "onChange"
> & {
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

  const applyValueToDate = (rawValue: string) => {
    const newDate = new Date(date);
    setDateByType({
      date: newDate,
      value: rawValue,
      type: picker,
      period,
    });
    setDate(newDate);
  };

  const handleArrowStep = (step: 1 | -1) => {
    const newValue = getArrowByType({ value, step, type: picker });
    setValue(newValue);
    applyValueToDate(newValue);
  };

  const handleKeyPress = (e: TextInputKeyPressEvent) => {
    const key = e.nativeEvent.key;

    // Navigation
    if (key === "ArrowRight") {
      onRightFocus?.();
      return;
    }
    if (key === "ArrowLeft") {
      onLeftFocus?.();
      return;
    }

    // Increment / Decrement
    if (key === "ArrowUp") {
      handleArrowStep(1);
      return;
    }
    if (key === "ArrowDown") {
      handleArrowStep(-1);
      return;
    }

    // Backspace / Delete -> clear last digit (simplify to clear all)
    if (key === "Backspace" || key === "Delete") {
      if (value.length === 0) return;
      const trimmed = value.slice(0, -1);
      setValue(trimmed);
      if (trimmed.length === 0) return; // do not update date yet
      applyValueToDate(trimmed);
      return;
    }

    // Numeric digit handling
    if (key >= "0" && key <= "9") {
      const digit = key;
      const newDate = new Date(date);

      switch (picker) {
        case "hours": {
          const shifted = (value.slice(1) + digit).slice(-2); // keep last 2
          const validHour = getValidHour(shifted);
          setValue(validHour);
          setDateByType({ date: newDate, value: validHour, type: "hours" });
          setDate(newDate);
          break;
        }
        case "minutes": {
          let shifted = (value.slice(1) + digit).slice(-2);
          // Special case: if first digit typed >= 6 treat as leading 0 + digit
          if ((value === "" || value === "00") && digit >= "6") {
            shifted = "0" + digit;
          }
          const validMinutes = getValidMinuteOrSecond(shifted);
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
          let shifted = (value.slice(1) + digit).slice(-2);
          if ((value === "" || value === "00") && digit >= "6") {
            shifted = "0" + digit;
          }
          const validSeconds = getValidMinuteOrSecond(shifted);
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
          let valueToUse: string | undefined;
          if (value === "" || value === "0" || value === "00") {
            if (digit === "0") return; // ignore 0
            valueToUse = digit;
          } else if (value.length === 1) {
            const firstDigit = parseInt(value, 10);
            const secondDigit = parseInt(digit, 10);
            const combined = firstDigit * 10 + secondDigit;
            valueToUse =
              combined >= 10 && combined <= 12 ? combined.toString() : digit;
          } else {
            const candidateNum = parseInt(
              (value.slice(1) + digit).slice(-2),
              10,
            );
            if (candidateNum >= 1 && candidateNum <= 12) {
              valueToUse = candidateNum.toString();
            } else if (parseInt(digit, 10) >= 1) {
              valueToUse = digit;
            } else {
              valueToUse = value; // keep previous
            }
          }
          const valid12 = getValid12Hour(valueToUse);
          setValue(valid12);
          setDateByType({
            date: newDate,
            value: valid12,
            type: "12hours",
            period,
          });
          setDate(newDate);
          break;
        }
      }
    }
  };

  const handleBlur = (e: BlurEvent) => {
    if ((picker === "minutes" || picker === "seconds") && value.length === 1) {
      const padded = value.padStart(2, "0");
      if (padded !== value) {
        setValue(padded);
        applyValueToDate(padded);
      }
    }
    props.onBlur?.(e);
  };

  return (
    <BaseTextInput
      value={value}
      className={cn(
        "text-center tabular-nums",
        "w-[48px]",
        "caret-transparent",
      )}
      onKeyPress={handleKeyPress}
      onBlur={handleBlur}
      {...props}
    />
  );
};
