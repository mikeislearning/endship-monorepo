import { useForm } from "react-hook-form";

import { AwForm } from "@/components/AwForm";
import { AwRadioGroupInput } from "@/components/AwRadioGroupInput/AwRadioGroupInput";
import { useTranslator } from "@/hooks/useTranslate";
import { appLogger } from "@/utils/logger";

export const RadioGroupDemo = () => {
  const { t } = useTranslator();
  const form = useForm({
    defaultValues: {
      "radio-group-demo": "default",
      "radio-group-demo-description": "starter",
      "radio-group-disabled-demo": undefined,
    },
  });

  return (
    <AwForm
      form={form}
      onSubmit={values => {
        appLogger.debug("values", values);
      }}>
      <AwRadioGroupInput
        name="radio-group-demo"
        control={form.control}
        labelI18nKey="sandbox:radioGroup.spacingLabel"
        options={[
          {
            value: "default",
            label: t("sandbox:radioGroup.default"),
          },
          {
            value: "comfortable",
            label: t("sandbox:radioGroup.comfortable"),
          },
          {
            value: "compact",
            label: t("sandbox:radioGroup.compact"),
          },
        ]}
      />
      <AwRadioGroupInput
        name="radio-group-demo-description"
        control={form.control}
        labelI18nKey="sandbox:radioGroup.planLabel"
        options={[
          {
            value: "starter",
            label: t("sandbox:radioGroup.starterLabel"),
            descriptionI18nKey: "sandbox:radioGroup.starterDescription",
          },
          {
            value: "pro",
            label: t("sandbox:radioGroup.proLabel"),
            descriptionI18nKey: "sandbox:radioGroup.proDescription",
          },
        ]}
      />
      <AwRadioGroupInput
        name="radio-group-disabled-demo"
        control={form.control}
        labelI18nKey="sandbox:radioGroup.disabledLabel"
        isDisabled
        options={[
          {
            value: "default",
            label: t("sandbox:radioGroup.default"),
          },
          {
            value: "comfortable",
            label: t("sandbox:radioGroup.comfortable"),
          },
          {
            value: "compact",
            label: t("sandbox:radioGroup.compact"),
          },
        ]}
      />
    </AwForm>
  );
};
