import dayjs, { Dayjs } from "dayjs";
import advancedFormat from "dayjs/plugin/advancedFormat";
import utc from "dayjs/plugin/utc";
import { t } from "i18next";

type DateType = string | Dayjs | Date | undefined | null;

dayjs.extend(utc);
dayjs.extend(advancedFormat);

export const dateAsDayjs = (date?: DateType): Dayjs => {
  return dayjs(date);
};

export const getDateWithoutTimezone = (date?: DateType) => {
  return dayjs.utc(date);
};

export const formatDateToIso = (date?: DateType) => {
  return dateAsDayjs(date).toISOString();
};

export const getAge = (dateOfBirth?: DateType) => {
  const now = dateAsDayjs();
  const birthDay = dateAsDayjs(dateOfBirth);
  const years = now.diff(birthDay, "years");
  if (years === 0) {
    const months = now.diff(birthDay, "months");

    if (months === 0) {
      const days = now.diff(birthDay, "days");
      return t("common:datetime.daysWithCount", { count: days });
    }
    return t("common:datetime.monthsWithCount", { count: months });
  }

  return t("common:datetime.yearsWithCount", { count: years });
};
