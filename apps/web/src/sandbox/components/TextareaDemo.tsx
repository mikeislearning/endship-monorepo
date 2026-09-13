import { useForm } from "react-hook-form";

import { AwForm } from "@/components/AwForm";
import { AwTextInput } from "@/components/AwTextInput/AwTextInput";
import { appLogger } from "@/utils/logger";

export const TextareaDemo = () => {
  const form = useForm({});

  return (
    <AwForm
      form={form}
      className="w-sm"
      onSubmit={values => {
        appLogger.debug("values", values);
      }}>
      <AwTextInput
        isMultiLine
        name="textarea-demo-one"
        control={form.control}
        placeholderI18nKey="sandbox:textarea.default"
      />
      <AwTextInput
        isMultiLine
        name="textarea-demo-two"
        aria-invalid="true"
        control={form.control}
        placeholderI18nKey="sandbox:textarea.error"
      />
      <AwTextInput
        isMultiLine
        isDisabled
        name="textarea-demo-five"
        control={form.control}
        placeholderI18nKey="sandbox:textarea.disabled"
      />
    </AwForm>
  );
};
