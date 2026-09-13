import { useForm } from "react-hook-form";

import { AwCheckboxInput } from "@/components/AwCheckboxInput/AwCheckboxInput";
import { AwForm } from "@/components/AwForm";
import { useTranslator } from "@/hooks/useTranslate";
import { appLogger } from "@/utils/logger";

export const CheckboxDemo = () => {
  const form = useForm();
  const { t } = useTranslator();

  return (
    <AwForm
      form={form}
      onSubmit={values => {
        appLogger.debug("values", values);
      }}>
      <AwCheckboxInput
        name="terms"
        control={form.control}
        option={{
          label: t("sandbox:checkbox.terms"),
        }}
      />
      <AwCheckboxInput
        isDisabled
        name="notifications"
        control={form.control}
        option={{
          label: t("sandbox:checkbox.privacy"),
        }}
      />
      <AwCheckboxInput
        name="colors"
        control={form.control}
        hasMultipleOptions
        labelI18nKey="sandbox:checkbox.multi.label"
        descriptionI18nKey="sandbox:checkbox.multi.description"
        options={[
          {
            value: "red",
            label: t("sandbox:checkbox.multi.email"),
          },
          {
            value: "green",
            label: t("sandbox:checkbox.multi.sms"),
          },
          {
            value: "blue",
            label: t("sandbox:checkbox.multi.push"),
          },
        ]}
      />
    </AwForm>
  );
};
