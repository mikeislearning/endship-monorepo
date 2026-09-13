import { t } from "i18next";
import { z } from "zod";

export type OptionType = {
  label: string;
  value: string;
  isDisabled?: boolean;
};

export type NumberOptionType = {
  label: string;
  value: number;
  isDisabled?: boolean;
};

export const requiredStringSchema = z
  .string({
    error: t("common:validation.requiredField"),
  })
  .trim()
  .min(1, t("common:validation.requiredField"));

export const nonNegativeNumberOrNullInputSchema = z
  .union([z.string(), z.number()])
  .transform(value => (value.toString().trim() === "" ? null : value))
  .nullable()
  .refine(value => value === null || !isNaN(Number(value)), {
    error: t("common:validation.invalidNumber"),
  })
  .transform(value => (value === null ? null : Number(value)))
  .refine(value => value === null || value >= 0, {
    error: t("common:validation.numberMustBeNonNegative"),
  });

export const nonNegativeRequiredNumberSchema = z
  .union([
    z.string({
      error: t("common:validation.requiredField"),
    }),
    z.number({
      error: t("common:validation.requiredField"),
    }),
  ]) // Adding a required error here does nothing.
  .transform(value => (value ?? "").toString().trim())
  .refine(value => value !== "", {
    error: t("common:validation.requiredNonNegative"),
  })
  .transform(value => Number(value))
  .refine(value => !isNaN(value) && value >= 0, {
    error: t("common:validation.requiredNonNegative"),
  });

export const positiveRequiredNumberSchema = z
  .union([
    z.string({
      error: t("common:validation.requiredField"),
    }),
    z.number({
      error: t("common:validation.requiredField"),
    }),
  ]) // Adding a required error here does nothing.
  .transform(value => (value ?? "").toString().trim())
  .refine(value => value !== "", {
    error: t("common:validation.requiredNonNegative"),
  })
  .transform(value => Number(value))
  .refine(value => !isNaN(value) && value > 0, {
    error: t("common:validation.requiredNonNegative"),
  });
