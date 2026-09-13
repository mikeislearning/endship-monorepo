import { t } from "i18next";
import { z } from "zod";

export const searchFormSchema = z.object({
  search: z.string().trim().optional(),
});
export type SearchFormType = z.infer<typeof searchFormSchema>;

export type OptionType = {
  label: string;
  value: string;
};

export const requiredStringSchema = z
  .string({
    error: t("common:validation.requiredField"),
  })
  .trim()
  .min(1, t("common:validation.requiredField"));
