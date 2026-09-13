/**
 * regular expression to check for valid hour format (01-23)
 */
export const isValidHour = (value: string) => {
  return /^(0[0-9]|1[0-9]|2[0-3])$/.test(value);
};

/**
 * regular expression to check for valid 12 hour format (1-12)
 */
export const isValid12Hour = (value: string) => {
  return /^([1-9]|1[0-2])$/.test(value);
};

/**
 * regular expression to check for valid minute format (00-59)
 */
export const isValidMinuteOrSecond = (value: string) => {
  return /^[0-5][0-9]$/.test(value);
};

type GetValidNumberConfigType = { max: number; min?: number; loop?: boolean };

export const getValidNumber = (
  value: string,
  { max, min = 0, loop = false }: GetValidNumberConfigType,
) => {
  let numericValue = parseInt(value, 10);

  if (!isNaN(numericValue)) {
    if (!loop) {
      if (numericValue > max) numericValue = max;
      if (numericValue < min) numericValue = min;
    } else {
      if (numericValue > max) numericValue = min;
      if (numericValue < min) numericValue = max;
    }
    return numericValue.toString().padStart(2, "0");
  }

  return "00";
};

export const getValidHour = (value: string) => {
  if (isValidHour(value)) return value;
  return getValidNumber(value, { max: 23, loop: true });
};

export const getValid12Hour = (value: string) => {
  if (isValid12Hour(value)) return value;
  // Don't pad with leading zeros in 12-hour format
  const num = parseInt(value, 10);
  if (!isNaN(num)) {
    const constrained = Math.max(1, Math.min(12, num));
    return constrained.toString();
  }
  return "1";
};

export const getValidMinuteOrSecond = (value: string) => {
  if (isValidMinuteOrSecond(value)) return value;
  return getValidNumber(value, { max: 59, loop: true });
};

type GetValidArrowNumberConfigType = {
  min: number;
  max: number;
  step: number;
};

export const getValidArrowNumber = (
  value: string,
  { min, max, step }: GetValidArrowNumberConfigType,
) => {
  let numericValue = parseInt(value, 10);
  if (!isNaN(numericValue)) {
    numericValue += step;
    return getValidNumber(String(numericValue), { min, max, loop: true });
  }
  return "00";
};

export const getValidArrowHour = (value: string, step: number) => {
  return getValidArrowNumber(value, { min: 0, max: 23, step });
};

export const getValidArrow12Hour = (value: string, step: number) => {
  let numericValue = parseInt(value, 10);
  if (!isNaN(numericValue)) {
    numericValue += step;
    // Handle wrapping in 12-hour mode
    if (numericValue > 12) numericValue = 1;
    if (numericValue < 1) numericValue = 12;
    return numericValue.toString(); // No padding
  }
  return "1"; // Default to 1 for 12-hour mode
};

export const getValidArrowMinuteOrSecond = (value: string, step: number) => {
  return getValidArrowNumber(value, { min: 0, max: 59, step });
};

export const setMinutes = (date: Date, value: string) => {
  const minutes = getValidMinuteOrSecond(value);
  date.setMinutes(parseInt(minutes, 10));
  return date;
};

export const setSeconds = (date: Date, value: string) => {
  const seconds = getValidMinuteOrSecond(value);
  date.setSeconds(parseInt(seconds, 10));
  return date;
};

export const setHours = (date: Date, value: string) => {
  const hours = getValidHour(value);
  date.setHours(parseInt(hours, 10));
  return date;
};

export type PeriodType = "AM" | "PM";

export type Set12HoursParamsType = {
  date: Date;
  value: string;
  period: PeriodType;
};

export const set12Hours = ({ date, value, period }: Set12HoursParamsType) => {
  const hours = parseInt(getValid12Hour(value), 10);
  const convertedHours = convert12HourTo24Hour(hours, period);
  date.setHours(convertedHours);
  return date;
};

export type TimePickerType = "minutes" | "seconds" | "hours" | "12hours";

export type SetDateByTypeParamsType = {
  date: Date;
  value: string;
  type: TimePickerType;
  period?: PeriodType;
};

export const setDateByType = ({
  date,
  value,
  type,
  period,
}: SetDateByTypeParamsType) => {
  switch (type) {
    case "minutes":
      return setMinutes(date, value);
    case "seconds":
      return setSeconds(date, value);
    case "hours":
      return setHours(date, value);
    case "12hours": {
      if (!period) return date;
      return set12Hours({ date, value, period });
    }
    default:
      return date;
  }
};

export const getDateByType = (date: Date, type: TimePickerType) => {
  switch (type) {
    case "minutes":
      return getValidMinuteOrSecond(String(date.getMinutes()));
    case "seconds":
      return getValidMinuteOrSecond(String(date.getSeconds()));
    case "hours":
      return getValidHour(String(date.getHours()));
    case "12hours": {
      const hours = display12HourValue(date.getHours());
      return getValid12Hour(String(hours));
    }
    default:
      return "00";
  }
};

export type GetArrowByTypeParamsType = {
  value: string;
  step: number;
  type: TimePickerType;
};

export const getArrowByType = ({
  value,
  step,
  type,
}: GetArrowByTypeParamsType) => {
  switch (type) {
    case "minutes":
      return getValidArrowMinuteOrSecond(value, step);
    case "seconds":
      return getValidArrowMinuteOrSecond(value, step);
    case "hours":
      return getValidArrowHour(value, step);
    case "12hours":
      return getValidArrow12Hour(value, step);
    default:
      return "00";
  }
};

/**
 * handles value change of 12-hour input
 * 12:00 PM is 12:00
 * 12:00 AM is 00:00
 */
export const convert12HourTo24Hour = (hour: number, period: PeriodType) => {
  if (period === "PM") {
    if (hour <= 11) {
      return hour + 12;
    } else {
      return hour;
    }
  } else if (period === "AM") {
    if (hour === 12) return 0;
    return hour;
  }
  return hour;
};

/**
 * time is stored in the 24-hour form,
 * but needs to be displayed to the user
 * in its 12-hour representation
 */
export const display12HourValue = (hours: number) => {
  if (hours === 0 || hours === 12) return "12";
  return `${hours % 12}`;
};
