import dayjs, { Dayjs } from "dayjs";
import customParseFormat from "dayjs/plugin/customParseFormat";
import inBetween from "dayjs/plugin/isBetween";
import utc from "dayjs/plugin/utc";

import { ISO_TIME_FORMAT } from "@/domain/constants";

dayjs.extend(utc);
dayjs.extend(inBetween);
dayjs.extend(customParseFormat);

type DateType = string | number | Dayjs | Date;

export const dateAsDayjs = (
  date?: DateType | null,
  format?: string,
  strict?: boolean,
  // eslint-disable-next-line max-params
): Dayjs => {
  return format ? dayjs(date, format, strict === true) : dayjs(date);
};

export const formatDateToIso = (date?: DateType | null) => {
  return dateAsDayjs(date).toISOString();
};

export const formatTime = ({
  date,
  format = "h:mm A",
}: {
  date: DateType;
  format?: string;
}) => {
  return dateAsDayjs(date).format(format);
};

/**
 * Formats a time string in a concise human-friendly format.
 *
 * Uses `'h:mm A'` (e.g. "11:30 AM") when minutes are non-zero,
 * or `'h A'` (e.g. "12 PM") when minutes are exactly 00.
 *
 * @param time - The time string to format.
 * @param format - Optional parse format for the input string. Defaults to `ISO_TIME_FORMAT`.
 */
export const formatToHumanFriendlyTime = (time: string, format?: string) => {
  const parsedTime = dateAsDayjs(time, format ?? ISO_TIME_FORMAT);

  return parsedTime.minute() === 0
    ? parsedTime.format("h A")
    : parsedTime.format("h:mm A");
};
